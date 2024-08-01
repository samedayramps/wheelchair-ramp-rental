import React, { useState, useEffect } from 'react';

const InstallationTimer = ({ onComplete }) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const handleStartInstallation = () => {
    setStartTime(new Date());
  };

  const handleEndInstallation = () => {
    const end = new Date();
    setEndTime(end);
    onComplete(startTime, end);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Installation Timer</h2>
      <p className="text-2xl font-mono mb-4">{formatTime(elapsedTime)}</p>
      {!startTime && (
        <button
          onClick={handleStartInstallation}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Start Installation
        </button>
      )}
      {startTime && !endTime && (
        <button
          onClick={handleEndInstallation}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          End Installation
        </button>
      )}
    </div>
  );
};

export default InstallationTimer;