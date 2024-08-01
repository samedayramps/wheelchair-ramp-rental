// src/components/CustomerSelect.tsx
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface CustomerSelectProps {
  control: Control<any>;
  customers: { id: string; name: string }[] | undefined;
}

export default function CustomerSelect({ control, customers }: CustomerSelectProps) {
  return (
    <Controller
      name="customerId"
      control={control}
      rules={{ required: 'Customer is required' }}
      render={({ field }) => (
        <select {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          <option value="">Select a customer</option>
          {Array.isArray(customers) && customers.map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
      )}
    />
  );
}