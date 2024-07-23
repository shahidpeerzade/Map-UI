import React from 'react';
import TrackingMap from './components/TrackingMap';
import { SocketProvider } from './components/SocketProvider';

const App: React.FC = () => {
  return (
    <SocketProvider>
      <TrackingMap />
    </SocketProvider>
  );
};

export default App;