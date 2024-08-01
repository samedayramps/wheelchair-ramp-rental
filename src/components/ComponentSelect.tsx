import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface ComponentSelectProps {
  control: Control<any>;
  availableComponents: string[]; // Changed to array of strings (component IDs)
  name: string;
}

export default function ComponentSelect({ control, availableComponents, name }: ComponentSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Components</label>
          <div className="grid grid-cols-3 gap-2">
            {availableComponents.map(componentId => (
              <label key={componentId} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={componentId}
                  checked={field.value.includes(componentId)}
                  onChange={(e) => {
                    const updatedValue = e.target.checked
                      ? [...field.value, componentId]
                      : field.value.filter((id: string) => id !== componentId);
                    field.onChange(updatedValue);
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-sm">{componentId}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    />
  );
}