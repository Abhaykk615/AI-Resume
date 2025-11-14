import { useState, useEffect, useCallback } from "react";
import { getAllResumeData } from "../Services/resumeAPI";

export const useResumes = (user) => {
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllResumeData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resumes = await getAllResumeData();
      setResumeList(resumes.data || []); // Ensure data is always an array
    } catch (err) {
      console.error("Error from useResumes hook", err);
      setError(err.message || "Failed to fetch resumes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []); // useCallback helps prevent unnecessary re-renders

  useEffect(() => {
    // Only fetch data if the user object is available
    if (user) {
      fetchAllResumeData();
    }
  }, [user, fetchAllResumeData]);

  return { resumeList, loading, error, fetchAllResumeData };
};
