import React, { useState, useRef } from 'react';

const PhotoCapture = ({ onComplete }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    onComplete(photos);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Photo Capture</h2>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Take Photo
      </button>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Captured ${index + 1}`} className="w-full h-auto" />
        ))}
      </div>
      {photos.length > 0 && (
        <button
          onClick={handleComplete}
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Complete Photo Capture
        </button>
      )}
    </div>
  );
};

export default PhotoCapture;