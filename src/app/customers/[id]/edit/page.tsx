'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomerForm from '@/components/CustomerForm';

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer');
        }
        const data = await response.json();
        setCustomer(data);
      } catch (err) {
        setError('Failed to load customer data. Please try again.');
        console.error(err);
      }
    };

    fetchCustomer();
  }, [params.id]);

  const handleSubmit = async (formData: { name: string; email: string; phone: string; address: string; notes: string }) => {
    try {
      const response = await fetch(`/api/customers/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      router.push('/customers');
    } catch (err) {
      setError('An error occurred while updating the customer. Please try again.');
      console.error(err);
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (!customer) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Customer</h1>
      <CustomerForm initialData={customer} onSubmit={handleSubmit} />
    </div>
  );
}