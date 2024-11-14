import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L from "leaflet";
import CarIcon from '../assets/icon/Group.png';

interface CarMarkerProps {
  data: {
    lat: number;
    lng: number;
  };
}

const icon = L.icon({
  iconSize: [35, 22],
  popupAnchor: [2, -20],
  iconUrl: CarIcon,
    // "https://mysql-backup-base.s3.amazonaws.com/New%20Project%20%281%29.png",
});

const CarMarker: React.FC<CarMarkerProps> = ({ data }) => {
  const { lat, lng } = data;
  const [prevPos, setPrevPos] = useState<[number, number]>([lat, lng]);

  useEffect(() => {
    if (prevPos[1] !== lng && prevPos[0] !== lat) {
      setPrevPos([lat, lng]);
    }
  }, [lat, lng, prevPos]);

  return (
    <LeafletTrackingMarker
      icon={icon}
      position={[lat, lng]}
      previousPosition={prevPos}
      duration={1000}
      keepAtCenter={true}
    ></LeafletTrackingMarker>
  );
};

export default CarMarker;