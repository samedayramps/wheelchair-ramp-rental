'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ComponentForm from '@/components/ComponentForm';
import { ComponentStatus } from '@/lib/constants';

interface Component {
  id: string;
  type: string;
  size: string;
  status: string;
  location: string;
}

export default function EditComponentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [component, setComponent] = useState<Component | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const response = await fetch(`/api/components/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch component');
        }
        const data = await response.json();
        setComponent(data);
      } catch (err) {
        setError('Failed to load component data. Please try again.');
        console.error(err);
      }
    };

    fetchComponent();
  }, [params.id]);

  const handleSubmit = async (formData: Component) => {
    try {
      const response = await fetch(`/api/components/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update component');
      }

      setSuccess('Component updated successfully');
      setTimeout(() => {
        router.push('/inventory');
      }, 2000);
    } catch (err) {
      setError('An error occurred while updating the component. Please try again.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      try {
        const response = await fetch(`/api/components/${params.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete component');
        }

        setSuccess('Component deleted successfully');
        setTimeout(() => {
          router.push('/inventory');
        }, 2000);
      } catch (err) {
        setError('An error occurred while deleting the component. Please try again.');
        console.error(err);
      }
    }
  };

  const handleSetMaintenance = async () => {
    try {
      const response = await fetch('/api/components', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: params.id, action: 'setMaintenance' }),
      });

      if (!response.ok) {
        throw new Error('Failed to set component to maintenance');
      }

      setSuccess('Component set to maintenance successfully');
      setTimeout(() => {
        router.push('/inventory');
      }, 2000);
    } catch (err) {
      setError('An error occurred while setting the component to maintenance. Please try again.');
      console.error(err);
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (!component) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Component</h1>
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
      <ComponentForm initialData={component} onSubmit={handleSubmit} />
      <div className="mt-6 space-y-2">
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete Component
        </button>
        {component.status !== ComponentStatus.MAINTENANCE && (
          <button
            onClick={handleSetMaintenance}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Set to Maintenance
          </button>
        )}
      </div>
    </div>
  );
}