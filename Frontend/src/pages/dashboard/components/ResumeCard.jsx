import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, FileText, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();

  const onNavigate = () => {
    // Navigate to the resume viewer page
    navigate(`/dashboard/view-resume/${resume._id}`);
  };

  const onEdit = (e) => {
    e.stopPropagation(); // Prevents the card's onNavigate from firing
    navigate(`/dashboard/edit-resume/${resume._id}`);
  };

  const onDelete = (e) => {
    e.stopPropagation(); // Prevents the card's onNavigate from firing
    setOpenAlert(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast.success(`Resume "${resume.title}" deleted successfully.`);
      refreshData(); // Refresh the list on the dashboard
    } catch (error) {
      console.error("Error deleting resume:", error.message);
      toast.error(error.message || "Failed to delete resume.");
    } finally {
      setLoading(false);
      setOpenAlert(false);
    }
  };

  return (
    <>
      <div
        onClick={onNavigate}
        className="group cursor-pointer p-6 border rounded-lg bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col justify-between min-h-[280px]"
      >
        <div>
          <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-blue-50 text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
            <FileText size={32} />
          </div>
          <h3 className="font-bold text-xl text-gray-800 break-words">
            {resume.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">Click to view</p>
        </div>

        <div className="flex justify-end items-center mt-4 space-x-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onEdit}
            className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
            aria-label="Edit"
          >
            <Edit className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600 hover:bg-red-50"
            aria-label="Delete"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your resume titled "{resume.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={loading} className="bg-red-600 hover:bg-red-700">
              {loading ? <Loader2 className="animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ResumeCard;
