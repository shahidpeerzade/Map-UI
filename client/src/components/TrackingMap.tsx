import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "tailwindcss/tailwind.css";
import callIcon from "../assets/icon/phone.png";
import locationIcon from "../assets/icon/location.png";
import calendarIcon from "../assets/icon/calendar.png";
import messageIcon from "../assets/icon/message.png";
import profileIcon from "../assets/icon/Profile.png";
import vectorIcon from "../assets/icon/Vector.png";
import CarMarker from "./CarMarker";
import { io } from "socket.io-client";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "70%",
};

// const socket = io("http://localhost:3000/", { path: "/ws" });
// const socket = io("https://amused-mullet-absolute.ngrok-free.app/", {
//   path: "/ws",
// });
const socket = io("http://34.234.158.56:3000/", { path: "/ws" });

interface LatLng {
  lat: number;
  lng: number;
}

interface TrackingMapProps {
  userId: string;
}

const RouteFinder: React.FC<{
  origin: L.LatLngTuple;
  destination: L.LatLngTuple;
  deviation?: L.LatLngTuple | undefined;
  setRoutePath: (path: L.LatLngTuple[]) => void;
}> = ({ origin, destination, deviation, setRoutePath }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    console.log("RouteFinder useEffect:", { origin, destination, deviation });

    if (!origin || !destination) {
      console.error("Origin or Destination is not set correctly.");
      return;
    }

    const waypoints = [L.latLng(origin)];
    if (deviation) {
      waypoints.push(L.latLng(deviation));
    }
    waypoints.push(L.latLng(destination));

    try {
      routingControlRef.current = L.Routing.control({
        waypoints,
        routeWhileDragging: true,
        addWaypoints: false,
      }).addTo(map);

      routingControlRef.current.on("routesfound", function (e) {
        const routes = e.routes;
        if (routes.length > 0) {
          const route = routes[0];
          const path = route.coordinates.map(
            (coord: { lat: number; lng: number }) =>
              [coord.lat, coord.lng] as L.LatLngTuple
          );
          setRoutePath(path);
          map.fitBounds(route.bounds);
        }
      });

      routingControlRef.current.on("routingerror", function (e) {
        console.error("Routing error:", e);
      });
    } catch (error) {
      console.error("Error initializing routing control:", error);
    }

    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.getPlan().setWaypoints([]);
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [map, origin, destination, deviation, setRoutePath]);

  return null;
};

const findClosestPoint = (
  target: LatLngTuple,
  points: LatLngTuple[]
): { closestPoint: LatLngTuple; index: number } => {
  let closestPoint = points[0];
  let minDistance = L.latLng(target).distanceTo(L.latLng(points[0]));
  let index = 0;

  for (let i = 1; i < points.length; i++) {
    const distance = L.latLng(target).distanceTo(L.latLng(points[i]));
    if (distance < minDistance) {
      closestPoint = points[i];
      minDistance = distance;
      index = i;
    }
  }

  return { closestPoint, index };
};

const TrackingMap: React.FC<TrackingMapProps> = ({ userId }) => {
  const [_isConnected, setIsConnected] = useState<boolean | null>(null);
  const [currentTrack, setCurrentTrack] = useState<LatLng>({
    lat: 16.82676,
    lng: 75.738087,
  });
  const [route, setRoute] = useState<L.LatLngTuple[]>([]);
  const [deviation, setDeviation] = useState<L.LatLngTuple | undefined>(undefined);
  const [origin, setOrigin] = useState<L.LatLngTuple | null>(null);
  const [destination, setDestination] = useState<L.LatLngTuple | null>(null);

  const fetchRouteData = async () => {
    console.log(userId);
    try {
      const response = await axios.get(
        `http://34.234.158.56:3000/coordinates/route/${userId}`
      );
      console.log("API Response:", response);
      if (response.data && response.data.success) {
        console.log("Route Data:", response.data.data);
        setOrigin([
          response.data.data.origin.lat,
          response.data.data.origin.lng,
        ]);
        setDestination([
          response.data.data.destination.lat,
          response.data.data.destination.lng,
        ]);
      } else {
        console.error("Error: response.data.success is false");
        alert("Error fetching route data...");
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
      alert("Error fetching route data");
    }
  };

  useEffect(() => {
    fetchRouteData();

    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const locEvent = (data: { userID: string; lat: number; lng: number }) => {
      const { userID, lat, lng } = data;
      if (userID !== userId) {
        console.error("User ID mismatch: received", userID, "expected", userId);
        return;
      }

      console.log("value from server:", { lat, lng });
      const currentPos: LatLngTuple = [lat, lng];
      const { closestPoint, index } = findClosestPoint(currentPos, route);

      const distance = L.latLng(currentPos).distanceTo(L.latLng(closestPoint));
      if (distance > 50) {
        setDeviation(currentPos);
        setRoute([]);
      } else {
        const remainingRoute = route.slice(index);
        setRoute(remainingRoute);
      }

      setCurrentTrack({ lat: closestPoint[0], lng: closestPoint[1] });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("coordinates", locEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("coordinates", locEvent);
    };
  }, [route, userId]);

  if (!origin || !destination) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tracking-map-container flex justify-center items-center h-screen bg-white">
      <div className="relative h-full w-full max-w-screen-sm mx-auto md:h-[835px] md:w-[439px] md:rounded-lg overflow-hidden bg-white shadow-lg">
        <MapContainer
          zoom={15}
          style={{ ...containerStyle, zIndex: 1 }}
          center={origin}
          minZoom={5}
          zoomControl={false}
          attributionControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RouteFinder
            origin={origin}
            destination={destination}
            deviation={deviation}
            setRoutePath={setRoute}
          />
          <Polyline positions={route} color="#393939" />
          <CarMarker data={currentTrack ?? {}} />
        </MapContainer>

        <div
          className="absolute bottom-0 w-full bg-[#FFFFFF] p-4 shadow-lg z-10 h-[40%] overflow-y-auto"
          style={{
            fontFamily: "DM Sans, sans-serif",
            borderTopLeftRadius: "40px",
            borderTopRightRadius: "40px",
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer and Edge
          }}
        >
          <style>
            {`
      .absolute.bottom-0::-webkit-scrollbar {
        display: none; // For Chrome, Safari, and Opera
      }
    `}
          </style>
          <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-4 mt-3"></div>
          <h2 className=" text-[#5C5C5C] text-xl font-bold mb-4 mt-5">
            Sarfy Soudagar is on the way
          </h2>

          <div className="flex flex-wrap gap-1 items-center justify-between mb-2 px-2 py-2">
            <div className="flex items-center mr-3 flex-shrink-0">
              <div className="w-10 h-10 bg-black -m-2 rounded-full flex-shrink-0 px-0.5 py-1">
                <img src={profileIcon} alt="Profile" className="mt-1" />
              </div>
            </div>
            <div className="flex flex-col flex-1 ml-2">
              <div className="text-[#A9A9AA] text-md flex items-center">
                <img src={vectorIcon} alt="" className="h-4 mr-1" /> Sarfy
                Soudagar
              </div>
              <div className="text-[#5C5C5C] text-md font-semibold">
                Jim's Fencing Mooroolbark
              </div>
            </div>
            <div className="flex space-x-2 mr-4">
              <button className="w-9 h-9 bg-[#0055BB] text-white rounded-lg flex items-center justify-center">
                <img src={messageIcon} alt="Message" className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 bg-[#2D761B] text-white rounded-lg flex items-center justify-center">
                <img src={callIcon} alt="Call" className="w-4 h-4" />
              </button>
            </div>
          </div>

          <hr className="w-full h-0.3 bg-gray-200  mx-auto mt-3"></hr>

          <div className=" border-gray-200 mt-4 pt-4 shadow-lg border-2 rounded-2xl px-4">
            <div className="flex items-center ">
              <img src={locationIcon} alt="Location" className="w-4 h-4" />
              <div className="ml-1  text-[#858585] text-sm">
                Switchback Rd, Chirnside Park VIC
                <br /> 3316, Australia
              </div>
            </div>

            <div className="flex justify-between items-center -mt-2">
              <div className="flex items-center">
                <img src={calendarIcon} alt="Date" className="w-4 h-4 -mt-4" />
                <div className="ml-1">
                  <div className="text-[#858585] text-sm">Scheduled Time</div>
                  <div className="text-[#858585] text-sm">
                    11:30 AM - 12:30 PM
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border border-[#858585] mb-5">
                <div className="bg-[#0055BB] w-full text-white text-sm font-medium pl-8 py-1 px2">
                  ETA
                </div>
                <div className="text-sm text-[#0055BB] px-4 py-1">11:30 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;