import React, { useState } from 'react';

const ComponentCheckList = ({ job, onComplete }) => {
  const [checked, setChecked] = useState<string[]>([]);

  const handleCheck = (componentId: string) => {
    setChecked(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const allChecked = job.components.every(component => checked.includes(component.id));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Component Check</h2>
      <ul className="space-y-2">
        {job.components.map(component => (
          <li key={component.id} className="flex items-center">
            <input
              type="checkbox"
              id={component.id}
              checked={checked.includes(component.id)}
              onChange={() => handleCheck(component.id)}
              className="mr-2"
            />
            <label htmlFor={component.id}>{component.type} - {component.size}</label>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onComplete()}
        disabled={!allChecked}
        className={`mt-4 px-4 py-2 rounded ${
          allChecked ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300'
        } text-white`}
      >
        All Components Loaded
      </button>
    </div>
  );
};

export default ComponentCheckList;