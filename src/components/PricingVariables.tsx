import React, { useState } from 'react';

interface PricingVariables {
  id?: number;
  trailerRentalCost: number;
  perMileCost: number;
  rentalRatePerFoot: number;
  installRatePerSection: number;
  installRatePerLanding: number;
}

interface PricingVariablesProps {
  initialData: PricingVariables;
  onSave: (data: PricingVariables) => void;
}

export default function PricingVariables({ initialData, onSave }: PricingVariablesProps) {
  const [formData, setFormData] = useState<PricingVariables>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="trailerRentalCost" className="block text-sm font-medium text-gray-700">
          Trailer Rental Cost
        </label>
        <input
          type="number"
          id="trailerRentalCost"
          name="trailerRentalCost"
          value={formData.trailerRentalCost}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="perMileCost" className="block text-sm font-medium text-gray-700">
          Per Mile Cost
        </label>
        <input
          type="number"
          id="perMileCost"
          name="perMileCost"
          value={formData.perMileCost}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="rentalRatePerFoot" className="block text-sm font-medium text-gray-700">
          Rental Rate Per Foot
        </label>
        <input
          type="number"
          id="rentalRatePerFoot"
          name="rentalRatePerFoot"
          value={formData.rentalRatePerFoot}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="installRatePerSection" className="block text-sm font-medium text-gray-700">
          Install Rate Per Section
        </label>
        <input
          type="number"
          id="installRatePerSection"
          name="installRatePerSection"
          value={formData.installRatePerSection}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="installRatePerLanding" className="block text-sm font-medium text-gray-700">
          Install Rate Per Landing
        </label>
        <input
          type="number"
          id="installRatePerLanding"
          name="installRatePerLanding"
          value={formData.installRatePerLanding}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Pricing Variables
        </button>
      </div>
    </form>
  );
}