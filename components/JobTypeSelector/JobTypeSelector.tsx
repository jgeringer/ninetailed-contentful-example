'use client';

import React, { useState } from 'react';
import { useNinetailed } from '@ninetailed/experience.js-react';

interface JobTypeSelectorProps {
  className?: string;
}

export const JobTypeSelector = ({ className }: JobTypeSelectorProps) => {
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const { identify } = useNinetailed();

  const handleJobTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const jobType = event.target.value;
    setSelectedJobType(jobType);

    if (jobType) {
      try {
        // Track the job type selection using Ninetailed's identify method
        // This will store the job type as a user trait
        await identify('', {
          selectedJobType: jobType,
          lastJobTypeSelection: new Date().toISOString(),
        });

        // Also send to Google Tag Manager if available
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'job_type_selected',
            job_type: jobType,
            timestamp: new Date().toISOString(),
          });
        }

        console.log(`Ninetailed: Tracked job type selection: ${jobType}`);
      } catch (error) {
        console.error('Error tracking job type selection:', error);
      }
    }
  };

  return (
    <div className={`flex flex-row items-center gap-4 ${className}`}>
      <label htmlFor="jobType" className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Select Your Job Type:
      </label>
      <select
        name="jobType"
        id="jobType"
        value={selectedJobType}
        onChange={handleJobTypeChange}
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Please select...</option>
        <option value="contractor">Contractor</option>
        <option value="architect">Architect</option>
        <option value="jobSeeker">Job Seeker</option>
        <option value="distributor">Distributor</option>
      </select>
      {selectedJobType && (
        <p className="text-sm text-green-600 whitespace-nowrap">
          Selected: {selectedJobType} (tracked with Ninetailed)
        </p>
      )}
    </div>
  );
};

export default JobTypeSelector;