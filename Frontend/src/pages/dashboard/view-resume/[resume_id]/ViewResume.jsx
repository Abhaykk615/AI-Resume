import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import { generatePdfFromElement } from "@/utils/pdfGenerator";
import { Download } from "lucide-react";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = React.useState({});
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const resumeRef = useRef(null);

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    // console.log(response.data);
    dispatch(addResumeData(response.data));
  };

  const handleDownloadPdf = async () => {
    try {
      const success = await generatePdfFromElement('print-area', 'resume');
      if (success) {
        toast.success("PDF generated successfully!");
      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div id="noPrint">
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI generates Resume is ready !{" "}
            </h2>
            <p className="text-center text-gray-400">
              Now you are ready to download your resume and you can share unique
              resume url with your friends and family{" "}
            </p>
            <div className="w-full flex justify-center items-center p-5">
              <Button onClick={handleDownloadPdf} className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
            <div className="flex justify-between px-44 my-10">
              <RWebShare
                data={{
                  text: "Hello This is My resume",
                  url: import.meta.env.VITE_BASE_URL + "/dashboard/view-resume/" + resume_id,
                  title: "Flamingos",
                }}
                onClick={() => toast("Resume Shared Successfully")}
              >
                <Button>Share</Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div
          id="print-area"
          className="bg-white rounded-lg p-8 print-area mx-auto"
          style={{ 
            width: "210mm", 
            minHeight: "297mm",
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}
        >
          <ResumePreview />
        </div>
      </div>
    </>
  );
}

export default ViewResume;
