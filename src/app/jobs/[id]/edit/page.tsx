'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

interface Job {
  id: string;
  customerId: string;
  status: string;
  scheduledAt: string;
  address: string;
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  notes: string;
  components: Component[];
}

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [availableComponents, setAvailableComponents] = useState<Component[]>([]);
  const [pricingVariables, setPricingVariables] = useState<PricingVariables | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = useCallback(async () => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job');
      }
      const data = await response.json();
      setJob(data);
    } catch (err) {
      setError('Failed to fetch job. Please try again.');
    }
  }, [params.id]);

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data.customers);
    } catch (err) {
      setError('Failed to fetch customers. Please try again.');
    }
  }, []);

  const fetchAvailableComponents = useCallback(async () => {
    try {
      const response = await fetch('/api/components');
      if (!response.ok) {
        throw new Error('Failed to fetch available components');
      }
      const data = await response.json();
      setAvailableComponents(data.components);
    } catch (err) {
      setError('Failed to fetch available components. Please try again.');
    }
  }, []);

  const fetchPricingVariables = useCallback(async () => {
    try {
      const response = await fetch('/api/pricing-variables');
      if (!response.ok) {
        throw new Error('Failed to fetch pricing variables');
      }
      const data = await response.json();
      setPricingVariables(data);
    } catch (err) {
      setError('Failed to fetch pricing variables. Please try again.');
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchJob(), fetchCustomers(), fetchAvailableComponents(), fetchPricingVariables()]);
  }, [fetchJob, fetchCustomers, fetchAvailableComponents, fetchPricingVariables]);

  const handleSubmit = async (formData: Omit<Job, 'id'>) => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: params.id,
        }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update job');
      }
    
      router.push('/jobs');
    } catch (err) {
      if (err instanceof Error) {
        setError(`An error occurred while updating the job: ${err.message}`);
      } else {
        setError('An unknown error occurred while updating the job');
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      router.push('/jobs');
    } catch (err) {
      setError('An error occurred while deleting the job. Please try again.');
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (!job || !pricingVariables) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const initialData = {
    ...job,
    components: job.components.map(comp => comp.id)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>
      <JobForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        customers={customers}
        availableComponents={availableComponents}
        pricingVariables={pricingVariables}
      />
    </div>
  );
}