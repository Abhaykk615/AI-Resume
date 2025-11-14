import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const prompt = 
  "Job Title: {jobTitle}. Generate summaries for 3 experience levels (Fresher, Mid Level, Senior) in 3-4 lines each. Return ONLY a JSON array (not an object) with format: [{\"summary\": \"text\", \"experience_level\": \"level\"}, ...]. Do not wrap in any other object or property.";
function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Declare the undeclared variable using useState
  const [summary, setSummary] = useState(resumeInfo?.summary || ""); // Declare the undeclared variable using useState
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]); // Initialize as empty array
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Started Saving Summary");
    const data = {
      data: { summary },
    };
    if (resume_id) {
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          enanbledNext(true);
          enanbledPrev(true);
          setLoading(false);
        });
    }
  }; // Declare the undeclared variable using useState

  const setSummery = (summary) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: summary,
      })
    );
    setSummary(summary);
  };

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    console.log("Generate Summary From AI for", resumeInfo?.jobTitle);
    if (!resumeInfo?.jobTitle) {
      toast("Please Add Job Title");
      setLoading(false);
      return;
    }
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    
    const MAX_RETRIES = 3;
    const INITIAL_DELAY = 1000; // 1 second
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await AIChatSession.sendMessage(PROMPT);
        const parsedResult = JSON.parse(result.response.text());
        console.log(parsedResult);
        setAiGenerateSummeryList(parsedResult);
        toast.success("Summary generated successfully!");
        return; // Success, exit the function
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        
        if (error.message.includes('503') && attempt < MAX_RETRIES) {
          // Exponential backoff: wait longer after each retry
          const delay = INITIAL_DELAY * Math.pow(2, attempt - 1);
          console.log(`Model overloaded, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue; // Try again
        }
        
        // If we've exhausted retries or it's a different error
        toast.error(attempt === MAX_RETRIES 
          ? "Failed to generate summary after multiple attempts. Please try again later." 
          : error.message);
        break;
      } finally {
        if (attempt === MAX_RETRIES) {
          setLoading(false);
        }
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              onClick={GenerateSummaryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Sparkles className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            name="summary"
            className="mt-5"
            required
            value={summary ? summary : resumeInfo?.summary}
            onChange={handleInputChange}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {Array.isArray(aiGeneratedSummeryList) && aiGeneratedSummeryList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                enanbledNext(false);
                enanbledPrev(false);
                setSummery(item?.summary);
              }}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
