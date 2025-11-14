import React from "react";
import { useSelector } from "react-redux";
import { AlertTriangle, FilePlus2 } from 'lucide-react';

// Import the custom hook and components
import { useResumes } from "../../hooks/useResumes";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import ResumeCardSkeleton from "./components/ResumeCardSkeleton";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  
  // Use the custom hook for clean state management
  const { resumeList, loading, error, fetchAllResumeData } = useResumes(user);

  // Helper function to render content based on state
  const renderContent = () => {
    // 1. Loading State: Show skeleton loaders
    if (loading) {
      return (
        <>
          {[...Array(5)].map((_, index) => <ResumeCardSkeleton key={index} />)}
        </>
      );
    }

    // 2. Error State: Show a clear error message
    if (error) {
      return (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-md flex items-center gap-4">
          <AlertTriangle className="h-8 w-8 flex-shrink-0" />
          <div>
            <p className="font-bold text-lg">Oops! Something went wrong.</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={fetchAllResumeData} 
              className="mt-2 text-sm font-semibold text-red-600 hover:underline"
            >
              Click here to retry
            </button>
          </div>
        </div>
      );
    }
    
    // 3. Success State: Show the AddResume card and the list of resumes
    return (
      <>
        <AddResume refreshData={fetchAllResumeData} />
        {resumeList.map((resume) => (
          <ResumeCard
            key={resume._id}
            resume={resume}
            refreshData={fetchAllResumeData}
          />
        ))}
      </>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <header className="pb-8 mb-8 border-b border-gray-200">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              My Resumes
            </h1>
            <p className="mt-3 text-lg text-gray-500">
                Create, manage, and tailor your resumes with AI assistance for your next career move.
            </p>
        </header>

        {/* Grid Section */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renderContent()}
        </main>

        {/* Engaging Empty State (only shows when not loading, no error, and list is empty) */}
        {!loading && !error && resumeList.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 text-center mt-16 py-16 border-2 border-dashed rounded-lg">
                <FilePlus2 className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-2xl font-semibold text-gray-800">Your resume dashboard is empty</h3>
                <p className="text-gray-500 mt-2">
                    Get started by creating your first resume using the 'Add New' card.
                </p>
            </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

