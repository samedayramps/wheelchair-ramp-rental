import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface CalculatedFieldsProps {
  control: Control<any>;
}

export default function CalculatedFields({ control }: CalculatedFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700">Delivery Fee</label>
        <Controller
          name="deliveryFee"
          control={control}
          render={({ field }) => (
            <input id="deliveryFee" type="number" {...field} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-100" />
          )}
        />
      </div>
      <div>
        <label htmlFor="installFee" className="block text-sm font-medium text-gray-700">Install Fee</label>
        <Controller
          name="installFee"
          control={control}
          render={({ field }) => (
            <input id="installFee" type="number" {...field} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-100" />
          )}
        />
      </div>
      <div>
        <label htmlFor="monthlyRentalRate" className="block text-sm font-medium text-gray-700">Monthly Rental Rate</label>
        <Controller
          name="monthlyRentalRate"
          control={control}
          render={({ field }) => (
            <input id="monthlyRentalRate" type="number" {...field} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-100" />
          )}
        />
      </div>
    </>
  );
}