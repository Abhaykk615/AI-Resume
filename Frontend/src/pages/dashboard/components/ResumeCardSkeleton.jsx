import React from 'react';

function ResumeCardSkeleton() {
  return (
    <div className="p-6 border rounded-lg bg-white animate-pulse min-h-[280px] flex flex-col justify-between">
      <div>
        <div className="h-16 w-16 rounded-lg bg-gray-200 mb-6"></div>
        <div className="h-6 w-3/4 rounded bg-gray-200 mb-3"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
      </div>
       <div className="flex justify-end mt-4 space-x-2">
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}

export default ResumeCardSkeleton;
