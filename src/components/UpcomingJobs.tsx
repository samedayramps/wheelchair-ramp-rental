import React from 'react';
import Link from 'next/link';
import { Job } from '@prisma/client';

interface UpcomingJobsProps {
  jobs: (Job & { customer: { name: string } })[];
}

const UpcomingJobs: React.FC<UpcomingJobsProps> = ({ jobs }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Jobs</h2>
      {jobs.length === 0 ? (
        <p>No upcoming jobs scheduled.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{job.customer.name}</p>
                  <p className="text-sm text-gray-600">{job.address}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(job.scheduledAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <Link
                    href={`/jobs/${job.id}/edit`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/jobs/${job.id}/execute`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Begin Job
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingJobs;