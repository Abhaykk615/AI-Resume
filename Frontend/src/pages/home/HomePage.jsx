import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";
import { motion } from "framer-motion";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This function opens the GitHub link in a new tab. It remains unchanged.
  const handleClick = () => {
    window.open("https://github.com/rachit0203/Ai-resume-biulder", "_blank");
  };

  // This effect fetches user data on component mount. The logic is unchanged.
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode === 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log("Printing from Home Page there was a error ->", error.message);
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  // This function navigates the user based on their login status. It remains unchanged.
  const hadnleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    // The main wrapper uses a dark background now.
    <div className="bg-gray-900">
      <Header user={user} />
      {/* SECTION: Main hero section with a new dark gradient background */}
      <section className="relative pt-24 pb-20 bg-gradient-to-b from-gray-900 to-slate-800 text-white">
        <div className="px-6 mx-auto max-w-7xl">
          {/* Text Section */}
          <motion.div
            className="w-full mx-auto text-center md:w-11/12 xl:w-9/12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* The heading now uses light text and a new blue/cyan gradient for the highlighted span */}
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-100 md:text-6xl">
              Craft a Standout{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                AI-Powered Resume
              </span>{" "}
              in Minutes
            </h1>
            {/* The paragraph text is now a lighter gray for better contrast on the dark background */}
            <p className="px-0 mb-10 text-lg text-gray-400 md:text-xl lg:px-24">
              Your Career, Elevated. Let AI build your perfect resume.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {/* The primary button has a new blue gradient and a subtle glow on hover */}
              <Button
                onClick={hadnleGetStartedClick}
                className="px-8 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 transition"
              >
                Get Started
              </Button>
              {/* The secondary button is styled for a dark theme */}
              <Button
                variant="secondary"
                onClick={handleClick}
                className="px-8 py-4 text-lg font-semibold text-gray-200 bg-gray-700/50 border border-gray-600 rounded-full shadow hover:bg-gray-700 hover:scale-105 transition"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="w-full mx-auto mt-20 md:w-10/12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative z-0 w-full mt-8">
              {/* The container for the image now has a "glassmorphism" effect with a blurred background */}
              <div className="relative overflow-hidden border rounded-3xl backdrop-blur-xl bg-slate-900/50 border-slate-700 shadow-2xl">
                {/* The window bar is now a darker, more modern color */}
                <div className="flex items-center justify-between px-4 bg-slate-800 h-12 rounded-t-3xl">
                  {/* The window control buttons now have macOS-style colors */}
                  <div className="flex space-x-2">
                    <FaCircle className="w-3 h-3 text-red-500" />
                    <FaCircle className="w-3 h-3 text-yellow-500" />
                    <FaCircle className="w-3 h-3 text-green-500" />
                  </div>
                  <FaInfoCircle className="text-gray-400 transition transform hover:text-white" />
                </div>
                {/* Image remains the same, but padding adjusted slightly */}
                <img
                  className="object-cover w-full p-4 rounded-b-3xl"
                  src={heroSnapshot}
                  alt="Dashboard"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER: Updated for the dark theme */}
      <footer className="bg-gray-900 border-t border-gray-800" aria-labelledby="footer-heading">
        <div className="mx-auto max-w-7xl p-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">&copy; 2024 Ai-Resume-Builder. All rights reserved.</p>
          {/* GitHub button styled to match the dark theme */}
          <Button
            variant="ghost" // Use ghost variant for a cleaner look on dark bg
            onClick={handleClick}
            className="mt-3 sm:mt-0 flex items-center gap-2 text-gray-400 hover:bg-gray-800 hover:text-white transition"
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;