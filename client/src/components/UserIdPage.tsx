import React, { useState } from 'react';
import axios from 'axios';
import TrackingMap from './TrackingMap';

const UserIdPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      try {
        const response = await axios.post('http://localhost:3000/coordinates/verify/', { userID: userId });
        // const response = await axios.post('http://3.141.137.176:3000/coordinates/verify/', { userID: userId });
        if (response.data.success) {
          setIsValid(true);
        } else {
          alert('Invalid User ID');
        }
      } catch (error) {
        alert('Error verifying User ID');
      }
    } else {
      alert('Please enter a valid six-digit User ID');
    }
  };

  if (isValid) {
    return <TrackingMap userId={userId} />;
  }

  return (
    <div className="tracking-map-container flex justify-center items-center h-screen bg-white">
      <div className="relative h-full w-full max-w-screen-sm mx-auto md:h-[835px] md:w-[439px] md:rounded-lg overflow-hidden bg-white shadow-lg flex justify-center items-center">
        <div className="p-4 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <label htmlFor="userId" className="text-lg font-medium">
              Enter User ID:
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserIdPage;