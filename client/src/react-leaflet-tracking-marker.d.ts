declare module 'react-leaflet-tracking-marker' {
  import { MarkerProps } from 'react-leaflet';
  import { LatLngExpression, Icon, DivIcon } from 'leaflet';
  import { ComponentType } from 'react';

  interface LeafletTrackingMarkerProps extends MarkerProps {
    previousPosition: LatLngExpression;
    duration: number;
    keepAtCenter?: boolean;
    icon?: Icon | DivIcon;
  }

  const LeafletTrackingMarker: ComponentType<LeafletTrackingMarkerProps>;
  export { LeafletTrackingMarker };
}
