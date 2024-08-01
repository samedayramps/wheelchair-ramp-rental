'use client';

import React, { useState, useEffect } from 'react';
import PricingVariables from '@/components/PricingVariables';

interface PricingVariablesData {
  id?: number;
  trailerRentalCost: number;
  perMileCost: number;
  rentalRatePerFoot: number;
  installRatePerSection: number;
  installRatePerLanding: number;
}

export default function PricingPage() {
  const [pricingData, setPricingData] = useState<PricingVariablesData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchPricingVariables();
  }, []);

  const fetchPricingVariables = async () => {
    try {
      const response = await fetch('/api/pricing-variables');
      if (!response.ok) {
        throw new Error('Failed to fetch pricing variables');
      }
      const data = await response.json();
      setPricingData(data);
    } catch (err) {
      setError('Failed to load pricing variables. Please try again.');
      console.error(err);
    }
  };

  const handleSave = async (formData: PricingVariablesData) => {
    try {
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/pricing-variables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update pricing variables');
      }

      const updatedData = await response.json();
      setPricingData(updatedData);
      setSuccess('Pricing variables updated successfully');
    } catch (err) {
      setError('An error occurred while updating pricing variables. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Pricing Variables</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      {pricingData ? (
        <PricingVariables initialData={pricingData} onSave={handleSave} />
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}