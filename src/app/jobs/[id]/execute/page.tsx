'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import JobExecutionWizard from '@/components/JobExecutionWizard';

export default function JobExecutionPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError('Failed to load job data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Execute Job</h1>
      <JobExecutionWizard job={job} />
    </div>
  );
}