import React, { useState, useEffect, useCallback } from 'react';
import { ComponentType, ComponentStatus, ComponentLocation } from '@/lib/constants';

interface Component {
  id: string;
  type: string;
  size: string;
  status: string;
  location: string;
}

interface ComponentFormProps {
  initialData?: Component;
  onSubmit: (data: Component) => void;
}

export default function ComponentForm({ initialData, onSubmit }: ComponentFormProps) {
  const [formData, setFormData] = useState<Component>(initialData || {
    id: '',
    type: '',
    size: '',
    status: ComponentStatus.AVAILABLE,
    location: ComponentLocation.WAREHOUSE,
  });

  const generateId = useCallback(async () => {
    const prefix = formData.type === ComponentType.RAMP ? 'RS' : 'L';
    const sizeValue = formData.type === ComponentType.RAMP ? formData.size : formData.size.replace('x', '');
    
    try {
      const response = await fetch(`/api/components/nextId?prefix=${prefix}&size=${sizeValue}`);
      if (!response.ok) throw new Error('Failed to generate ID');
      const data = await response.json();
      setFormData(prev => ({ ...prev, id: data.nextId }));
    } catch (error) {
      console.error('Error generating ID:', error);
    }
  }, [formData.type, formData.size]);

  useEffect(() => {
    if (formData.type && formData.size && !initialData) {
      generateId();
    }
  }, [formData.type, formData.size, initialData, generateId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="">Select a type</option>
          {Object.values(ComponentType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
          placeholder={formData.type === ComponentType.RAMP ? 'Length in feet' : 'Width x Length (e.g., 5x5)'}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {Object.values(ComponentStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {Object.values(ComponentLocation).map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
        />
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Component
        </button>
      </div>
    </form>
  );
}