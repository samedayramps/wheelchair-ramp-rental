import React, { useState } from 'react';

const CustomerNotification = ({ job, onComplete }) => {
  const [notificationSent, setNotificationSent] = useState(false);

  const sendNotification = async () => {
    try {
      // TODO: Implement actual notification logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      setNotificationSent(true);
      onComplete();
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customer Notification</h2>
      <p>Customer: {job.customer.name}</p>
      <p>Address: {job.address}</p>
      <button
        onClick={sendNotification}
        disabled={notificationSent}
        className={`mt-4 px-4 py-2 rounded ${
          notificationSent ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {notificationSent ? 'Notification Sent' : 'Send Notification'}
      </button>
    </div>
  );
};

export default CustomerNotification;