import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { JobStatus } from '@/lib/constants';
import CustomerSelect from './CustomerSelect';
import ComponentSelect from './ComponentSelect';
import CalculatedFields from './CalculatedFields';

interface JobFormProps {
  initialData?: {
    customerId: string;
    status: string;
    scheduledAt: string;
    address: string;
    deliveryFee: number;
    installFee: number;
    monthlyRentalRate: number;
    notes: string;
    components: string[];
  };
  onSubmit: (data: {
    customerId: string;
    status: string;
    scheduledAt: string;
    address: string;
    deliveryFee: number;
    installFee: number;
    monthlyRentalRate: number;
    notes: string;
    components: string[];
  }) => void;
  onDelete?: () => void;
  customers: { id: string; name: string; address: string }[];
  availableComponents: { id: string; type: string; size: string; status: string; location: string; }[];
  pricingVariables: {
    trailerRentalCost: number;
    perMileCost: number;
    rentalRatePerFoot: number;
    installRatePerSection: number;
    installRatePerLanding: number;
  };
}

export default function JobForm({ initialData, onSubmit, onDelete, customers, availableComponents, pricingVariables }: JobFormProps) {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: initialData || {
      customerId: '',
      status: '',
      scheduledAt: '',
      address: '',
      deliveryFee: 0,
      installFee: 0,
      monthlyRentalRate: 0,
      notes: '',
      components: [],
    },
  });

  const watchedCustomerId = watch('customerId');
  const watchedComponents = watch('components');
  const watchedAddress = watch('address');

  const [availableComponentIds, setAvailableComponentIds] = useState<string[]>([]);

  useEffect(() => {
    const filteredComponents = availableComponents.filter(
      component => component.status === 'AVAILABLE' || watchedComponents.includes(component.id)
    );
    setAvailableComponentIds(filteredComponents.map(comp => comp.id));
  }, [availableComponents, watchedComponents]);

  useEffect(() => {
    if (watchedCustomerId) {
      const selectedCustomer = customers.find(c => c.id === watchedCustomerId);
      if (selectedCustomer) {
        setValue('address', selectedCustomer.address);
      }
    }
  }, [watchedCustomerId, customers, setValue]);

  const calculateFees = useCallback(async () => {
    if (watchedComponents.length === 0 || !watchedAddress) {
      setValue('deliveryFee', 0);
      setValue('installFee', 0);
      setValue('monthlyRentalRate', 0);
      return;
    }

    const components = watchedComponents;
    const address = watchedAddress;

    const totalLength = components.reduce((total, componentId) => {
      const component = availableComponents.find(c => c.id === componentId);
      return total + (component?.type === 'RAMP' ? parseInt(component.size) : 0);
    }, 0);

    const sections = components.filter(componentId => 
      availableComponents.find(c => c.id === componentId)?.type === 'RAMP'
    ).length;
    const landings = components.filter(componentId => 
      availableComponents.find(c => c.id === componentId)?.type === 'LANDING'
    ).length;

    const monthlyRentalRate = totalLength * pricingVariables.rentalRatePerFoot;
    const installFee = (sections * pricingVariables.installRatePerSection) + 
                       (landings * pricingVariables.installRatePerLanding);

    let deliveryFee = 0;
    try {
      const response = await fetch('/api/calculate-distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin: '6008 Windridge Ln, Flower Mound, TX 75028', destination: address }),
      });
      if (!response.ok) {
        throw new Error('Failed to calculate distance');
      }
      const data = await response.json();
      deliveryFee = (data.distance * pricingVariables.perMileCost) + pricingVariables.trailerRentalCost;
    } catch (error) {
      console.error('Error calculating delivery fee:', error);
    }

    setValue('deliveryFee', deliveryFee);
    setValue('installFee', installFee);
    setValue('monthlyRentalRate', monthlyRentalRate);
  }, [watchedComponents, watchedAddress, availableComponents, pricingVariables, setValue]);

  useEffect(() => {
    if (watchedComponents.length > 0 && watchedAddress) {
      calculateFees();
    }
  }, [watchedComponents, watchedAddress, calculateFees]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      onDelete?.();
    }
  };

  const handleFormSubmit = (data: any) => {
    const formattedData = {
      ...data,
      scheduledAt: new Date(data.scheduledAt).toISOString(),
      deliveryFee: parseFloat(data.deliveryFee),
      installFee: parseFloat(data.installFee),
      monthlyRentalRate: parseFloat(data.monthlyRentalRate),
      components: data.components
    };
    console.log('Submitting job data:', formattedData);
    onSubmit(formattedData);
  };

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <CustomerSelect control={control} customers={customers} />
      
      <Controller
        name="status"
        control={control}
        rules={{ required: 'Status is required' }}
        render={({ field }) => (
          <select {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <option value="">Select a status</option>
            {Object.values(JobStatus).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        )}
      />

      <Controller
        name="scheduledAt"
        control={control}
        rules={{ required: 'Scheduled date is required' }}
        render={({ field }) => (
          <input 
            type="datetime-local" 
            {...field} 
            value={field.value ? formatDateForInput(field.value) : ''}
            onChange={(e) => field.onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        rules={{ required: 'Address is required' }}
        render={({ field }) => (
          <input type="text" {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        )}
      />

      <ComponentSelect 
        control={control} 
        availableComponents={availableComponentIds}
        name="components"
      />

      <CalculatedFields control={control} />

      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <textarea {...field} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        )}
      />

      <div className="space-y-2">
        <button 
          type="submit" 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Job
        </button>
        
        {onDelete && (
          <button 
            type="button" 
            onClick={handleDelete}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Job
          </button>
        )}
      </div>
    </form>
  );
}