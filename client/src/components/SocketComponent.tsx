// // src/components/SocketComponent.tsx
// import React, { useEffect } from 'react';
// import { io } from 'socket.io-client';

// interface SocketComponentProps {
//   onNewCoordinate: (coord: { lat: number; lng: number }) => void;
// }

// const SocketComponent: React.FC<SocketComponentProps> = ({ onNewCoordinate }) => {
//   useEffect(() => {
//     const socket = io('http://localhost:3000'); // Adjust the URL if needed

//     socket.on('newCoordinates', (coord: { lat: number; lng: number }) => {
//       onNewCoordinate(coord);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [onNewCoordinate]);

//   return null;
// };

// export default SocketComponent;





// // import React, { useEffect, useState } from 'react';
// // import io from 'socket.io-client';

// // const socket = io('http://localhost:3000');

// // const SocketComponent: React.FC = () => {
// //   const [coordinates, setCoordinates] = useState<{ lat: number, lng: number } | null>(null);

// //   useEffect(() => {
// //     socket.emit('start');
// //     socket.on('location', (data: { lat: number, lng: number }) => {
// //       setCoordinates(data);
// //     });

// //     return () => {
// //       socket.off('location');
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       {coordinates ? (
// //         <div>
// //           <p>Latitude: {coordinates.lat}</p>
// //           <p>Longitude: {coordinates.lng}</p>
// //         </div>
// //       ) : (
// //         <p>Waiting for coordinates...</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default SocketComponent;


// // import React, { useEffect, useState } from 'react';
// // import { io } from 'socket.io-client';

// // const socket = io('http://localhost:3000'); // Replace with your server URL

// // const SocketComponent: React.FC = () => {
// //   const [message, setMessage] = useState('');

// //   useEffect(() => {
// //     socket.on('connect', () => {
// //       console.log('connected to socket server');
// //     });

// //     socket.on('message', (data: string) => {
// //       setMessage(data);
// //     });

// //     return () => {
// //       socket.off('connect');
// //       socket.off('message');
// //     };
// //   }, []);

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-xl font-bold">Socket.io Message:</h1>
// //       <p>{message}</p>
// //     </div>
// //   );
// // }

// // export default SocketComponent;






// // import React, { useEffect, useState, useRef } from "react";
// // import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
// // import L, { LatLngExpression, LatLngTuple } from "leaflet";
// // import "leaflet/dist/leaflet.css";
// // import "leaflet-routing-machine";
// // import "tailwindcss/tailwind.css";
// // import { io } from "socket.io-client";
// // import backIcon from "../assets/icon/back-icon.png";
// // import deliveryIcon from "../assets/icon/delivery-icon.png";
// // import callIcon from "../assets/icon/call-icon.png";

// // interface MockData {
// //   orderNumber: string;
// //   time: string;
// //   estimateTime: string;
// //   location: {
// //     city: string;
// //     address: string;
// //   };
// //   pickupAddress: string;
// //   deliveryAddress: string;
// //   serviceMan: {
// //     name: string;
// //     role: string;
// //     phone: string;
// //   };
// // }

// // interface TrackingMapProps {
// //   mockData: MockData;
// // }

// // const containerStyle = {
// //   width: "100%",
// //   height: "60%",
// // };

// // // Define the custom SVG icon
// // const carIcon = new L.DivIcon({
// //   html: `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" id="car"><path d="M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759
// //     c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z
// //      M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713
// //     v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336
// //     h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z"></path></svg>`,
// //   className: "",
// //   iconSize: [45, 45],
// // });

// // // Component to handle the route calculation and polyline drawing
// // const RouteFinder: React.FC<{ origin: LatLngTuple; destination: LatLngTuple; setRoutePath: (path: LatLngTuple[]) => void }> = ({ origin, destination, setRoutePath }) => {
// //   const map = useMap();
// //   const routingControlRef = useRef<L.Routing.Control | null>(null);

// //   useEffect(() => {
// //     routingControlRef.current = L.Routing.control({
// //       waypoints: [L.latLng(origin), L.latLng(destination)],
// //       createMarker: () => null,
// //       routeWhileDragging: true,
// //       addWaypoints: false, // Prevents adding additional waypoints
// //     }).addTo(map);

// //     routingControlRef.current.on("routesfound", function (e) {
// //       const routes = e.routes;
// //       if (routes.length > 0) {
// //         const route = routes[0];
// //         const path = route.coordinates.map(coord => [coord.lat, coord.lng] as LatLngTuple);
// //         setRoutePath(path);
// //       }
// //     });

// //     return () => {
// //       if (routingControlRef.current) {
// //         routingControlRef.current.getPlan().setWaypoints([]);
// //         map.removeControl(routingControlRef.current);
// //         routingControlRef.current = null;
// //       }
// //     };
// //   }, [map, origin, destination, setRoutePath]);

// //   return null;
// // };

// // const MapUpdater: React.FC<{ position: LatLngTuple | null }> = ({ position }) => {
// //   const map = useMap();

// //   useEffect(() => {
// //     if (position) {
// //       map.setView(position);
// //     }
// //   }, [position, map]);

// //   return null;
// // };

// // const TrackingMap: React.FC<TrackingMapProps> = ({ mockData }) => {
// //   const [markerPos, setMarkerPos] = useState<LatLngExpression | null>(null);
// //   const [routePath, setRoutePath] = useState<LatLngTuple[]>([]);
// //   const [estimatedTime, setEstimatedTime] = useState<string>("");

// //   const origin: LatLngTuple = [-37.747550, 145.021992];
// //   const destination: LatLngTuple = [-37.793569, 144.979466];

// //   useEffect(() => {
// //     const socket = io("http://localhost:3000");

// //     socket.on("connect", () => {
// //       console.log("Connected to the backend");
// //       socket.emit("start");
// //     });

// //     socket.on("location", (data: LatLngTuple) => {
// //       setMarkerPos(data);
// //       console.log("Received coordinates:", data);
// //     });

// //     socket.on("disconnect", () => {
// //       console.log("Disconnected from the backend");
// //     });

// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, []);

// //   return (
// //     <div className="tracking-map-container flex justify-center items-center h-screen bg-gray-100">
// //       <div className="relative h-full w-full max-w-screen-sm mx-auto md:h-[700px] md:w-[375px] md:rounded-lg overflow-hidden bg-white shadow-lg">
// //         <MapContainer
// //           center={markerPos || origin}
// //           zoom={17}
// //           style={{ ...containerStyle, zIndex: 1 }}
// //         >
// //           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //           <RouteFinder origin={origin} destination={destination} setRoutePath={setRoutePath} />
// //           {markerPos && <Marker position={markerPos} icon={carIcon} />}
// //           {routePath.length > 0 && <Polyline positions={routePath} color="blue" />}
// //           <MapUpdater position={markerPos as LatLngTuple} />
// //         </MapContainer>
// //         <div className="absolute top-4 left-4 z-10">
// //           <button className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-gray-200 transition">
// //             <img src={backIcon} alt="Back" className="w-5 h-5" />
// //           </button>
// //         </div>
// //         <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-xl shadow-xl p-4 text-gray-700">
// //           <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-11/12 rounded-xl shadow-xl p-4 bg-blue-500 text-white">
// //             <div className="flex items-center space-x-4">
// //               <div className="w-1/5">
// //                 <img
// //                   src={deliveryIcon}
// //                   alt="Service Man"
// //                   className="w-14 h-14 rounded-full"
// //                 />
// //               </div>
// //               <div className="flex-grow">
// //                 <p className="font-bold">
// //                   Order Id:{" "}
// //                   <span className="font-normal">{mockData.orderNumber}</span>
// //                 </p>
// //                 <p className="text-sm text-gray-300">29-05-2024 12:30pm</p>
// //                 <p>Expected Delivery: 20th July</p>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="mt-16">
// //             <div className="flex-grow">
// //               <div className="mb-2">
// //                 <p className="text-sm text-gray-500">Pickup Point</p>
// //                 <p className="font-bold">{mockData.pickupAddress}</p>
// //               </div>
// //               <hr />
// //               <div className="mt-2">
// //                 <p className="text-sm text-gray-500">Delivery Point</p>
// //                 <p className="font-bold">{mockData.deliveryAddress}</p>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="mt-4">
// //             <div className="bg-white rounded-xl shadow-xl p-3 text-gray-700 space-y-2">
// //               <div className="flex justify-between items-center">
// //                 <div className="flex items-center space-x-2">
// //                   <img
// //                     src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
// //                     alt="Service Man"
// //                     className="w-10 h-10 rounded-full"
// //                   />
// //                   <div>
// //                     <p className="text-sm font-bold">
// //                       {mockData.serviceMan.name}
// //                     </p>
// //                     <p className="text-xs text-gray-500">
// //                       {mockData.serviceMan.role}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <a
// //                   href={`tel:${mockData.serviceMan.phone}`}
// //                   className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full shadow hover:bg-gray-200 transition"
// //                 >
// //                   <img src={callIcon} alt="Call" className="w-4 h-4 mr-1" />
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TrackingMap;