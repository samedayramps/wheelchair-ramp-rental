import React, { useState } from 'react';
import Image from 'next/image';

interface PhotoCaptureProps {
  onComplete: (photos: string[]) => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onComplete }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  const handleComplete = () => {
    onComplete(photos);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Photo Capture</h2>
      <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <Image
              src={photo}
              alt={`Captured photo ${index + 1}`}
              layout="responsive"
              width={500}
              height={500}
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleComplete}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Complete Photo Capture
      </button>
    </div>
  );
};

export default PhotoCapture;