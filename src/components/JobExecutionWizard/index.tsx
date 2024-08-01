import React, { useState } from 'react';
import ComponentCheckList from './ComponentCheckList';
import CustomerNotification from './CustomerNotification';
import AddressNavigation from './AddressNavigation';
import InstallationTimer from './InstallationTimer';
import PhotoCapture from './PhotoCapture';

interface Component {
  id: string;
  type: string;
  size: string;
}

interface Customer {
  id: string;
  name: string;
  address: string;
}

interface Job {
  id: string;
  customerId: string;
  customer: Customer;
  status: string;
  scheduledAt: string;
  address: string;
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  notes: string;
  components: Component[];
}

interface JobExecutionWizardProps {
  job: Job;
}

const steps = [
  'Component Check',
  'Customer Notification',
  'Navigation',
  'Installation',
  'Photo Capture',
];

const JobExecutionWizard: React.FC<JobExecutionWizardProps> = ({ job }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [executionData, setExecutionData] = useState({
    componentsLoaded: false,
    customerNotified: false,
    arrivalTime: null as Date | null,
    installationStartTime: null as Date | null,
    installationEndTime: null as Date | null,
    photos: [] as string[],
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleJobCompletion();
    }
  };

  const handleJobCompletion = async () => {
    // TODO: Implement API call to update job status and save execution data
    console.log('Job completed', executionData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ComponentCheckList job={job} onComplete={() => setExecutionData({ ...executionData, componentsLoaded: true })} />;
      case 1:
        return <CustomerNotification job={job} onComplete={() => setExecutionData({ ...executionData, customerNotified: true })} />;
      case 2:
        return <AddressNavigation job={job} onComplete={(arrivalTime) => setExecutionData({ ...executionData, arrivalTime })} />;
      case 3:
        return <InstallationTimer onComplete={(startTime: Date, endTime: Date) => setExecutionData({ ...executionData, installationStartTime: startTime, installationEndTime: endTime })} />;
      case 4:
        return <PhotoCapture onComplete={(photos: string[]) => setExecutionData({ ...executionData, photos })} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4">
        {steps.map((step, index) => (
          <span
            key={step}
            className={`mr-2 ${
              index === currentStep ? 'font-bold' : 'text-gray-500'
            }`}
          >
            {step}
            {index < steps.length - 1 && ' >'}
          </span>
        ))}
      </div>
      {renderStep()}
      <button
        onClick={handleNext}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {currentStep === steps.length - 1 ? 'Complete Job' : 'Next Step'}
      </button>
    </div>
  );
};

export default JobExecutionWizard;