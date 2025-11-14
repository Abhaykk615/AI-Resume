import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// This component now accepts 'refreshData' to update the dashboard after creation.
function AddResume({ refreshData }) {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onCreateResume = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    const trimmedTitle = resumeTitle.trim();

    if (!trimmedTitle) {
      setError("Please provide a title for your resume.");
      return;
    }

    setLoading(true);
    setError("");

    const data = {
      data: {
        title: trimmedTitle,
        // You can add more default fields here if needed
        themeColor: "#000000",
      },
    };

    try {
      const response = await createNewResume(data);
      console.log("Response from Create Resume", response);
      toast.success("Resume created successfully!");
      setOpenDialog(false);
      setResumeTitle("");
      refreshData(); // Refresh the resume list on the dashboard
      // Navigate to the new resume's edit page
      navigate(`/dashboard/edit-resume/${response.data.resume._id}`);
    } catch (err) {
      console.error("Failed to create resume:", err);
      toast.error("Failed to create resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="
          flex flex-col items-center justify-center 
          border-2 border-dashed rounded-lg p-6 h-full min-h-[280px]
          text-gray-500 bg-gray-50
          transition-all duration-300 ease-in-out
          cursor-pointer hover:border-blue-500 hover:text-blue-500 hover:shadow-lg hover:-translate-y-1
        "
        onClick={() => setOpenDialog(true)}
      >
        <Plus className="h-12 w-12" />
        <h2 className="mt-2 font-semibold text-lg">Add New Resume</h2>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Resume</DialogTitle>
            <DialogDescription>
              Give your new resume a title to get started. You can change it later.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onCreateResume}>
            <div className="mt-4">
              <label htmlFor="resumeTitle" className="text-sm font-medium text-gray-700">
                Resume Title
              </label>
              <Input
                id="resumeTitle"
                className="my-2"
                type="text"
                placeholder="Ex: Senior Software Engineer"
                value={resumeTitle}
                onChange={(e) => {
                  setResumeTitle(e.target.value);
                  if (error) setError(""); // Clear error when user starts typing
                }}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;

