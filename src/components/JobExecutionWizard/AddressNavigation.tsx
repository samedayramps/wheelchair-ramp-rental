import React, { useState } from 'react';

const AddressNavigation = ({ job, onComplete }) => {
  const [arrived, setArrived] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(job.address);
  };

  const handleArrived = () => {
    const arrivalTime = new Date();
    setArrived(true);
    onComplete(arrivalTime);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <p>Address: {job.address}</p>
      <button
        onClick={handleCopyAddress}
        className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Copy Address
      </button>
      <button
        onClick={handleArrived}
        disabled={arrived}
        className={`mt-4 px-4 py-2 rounded ${
          arrived ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600'
        } text-white`}
      >
        {arrived ? 'Arrived' : 'Mark as Arrived'}
      </button>
    </div>
  );
};

export default AddressNavigation;