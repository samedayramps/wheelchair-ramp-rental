'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import JobForm from '@/components/JobForm';

interface Customer {
  id: string;
  name: string;
  address: string;
}

interface Component {
  id: string;
  type: string;
  size: string;
  status: string;
  location: string;
}

interface PricingVariables {
  trailerRentalCost: number;
  perMileCost: number;
  rentalRatePerFoot: number;
  installRatePerSection: number;
  installRatePerLanding: number;
}

export default function NewJobPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [availableComponents, setAvailableComponents] = useState<Component[]>([]);
  const [pricingVariables, setPricingVariables] = useState<PricingVariables | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchCustomers(),
          fetchAvailableComponents(),
          fetchPricingVariables()
        ]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load necessary data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch('/api/customers');
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    const data = await response.json();
    setCustomers(data.customers); // Change this line
  };

  const fetchAvailableComponents = async () => {
    const response = await fetch('/api/components?status=AVAILABLE');
    if (!response.ok) {
      throw new Error('Failed to fetch available components');
    }
    const data = await response.json();
    setAvailableComponents(data.components);
  };

  const fetchPricingVariables = async () => {
    const response = await fetch('/api/pricing-variables');
    if (!response.ok) {
      throw new Error('Failed to fetch pricing variables');
    }
    const data = await response.json();
    setPricingVariables(data);
  };

  const handleSubmit = async (formData: {
    customerId: string;
    status: string;
    scheduledAt: string;
    address: string;
    deliveryFee: number;
    installFee: number;
    monthlyRentalRate: number;
    notes: string;
    components: string[];
  }) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      router.push('/jobs');
    } catch (err) {
      setError('An error occurred while creating the job. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!pricingVariables || customers.length === 0 || availableComponents.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Warning:</strong>
          <span className="block sm:inline"> Some required data is missing. Please ensure that customers, components, and pricing variables are set up in the system.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Job</h1>
      <JobForm 
        onSubmit={handleSubmit} 
        customers={customers} 
        availableComponents={availableComponents}
        pricingVariables={pricingVariables}
      />
    </div>
  );
}