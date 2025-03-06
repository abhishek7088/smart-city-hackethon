import React, { useEffect, useRef } from "react";
import { FaBrain, FaBriefcase, FaChartLine, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// Feature section data
const features = [
  {
    icon: <FaBrain className="text-4xl mx-auto text-blue-400 mb-4" />,
    title: "AI-Powered Career Guidance",
    description: "Get personalized career advice and insights powered by advanced AI technology.",
  },
  {
    icon: <FaBriefcase className="text-4xl mx-auto text-blue-400 mb-4" />,
    title: "Interview Preparation",
    description: "Practice with role-specific questions and get instant feedback to improve your performance.",
  },
  {
    icon: <FaChartLine className="text-4xl mx-auto text-blue-400 mb-4" />,
    title: "Industry Insights",
    description: "Stay ahead with real-time industry trends, salary data, and market analysis.",
  },
  {
    icon: <FaFileAlt className="text-4xl mx-auto text-blue-400 mb-4" />,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance.",
  },
];

const HeroSection = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrame;

    const animate = () => {
      if (slider) {
        const itemWidth = slider.children[0]?.offsetWidth || 300;
        const scrollAmount = itemWidth / 20; // Adjust scroll speed here

        slider.scrollLeft += scrollAmount;

        // Reset scroll position when reaching halfway for seamless loop
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative flex items-center justify-center min-h-screen bg-blue-100 p-8">
        {/* Text Section */}
        <motion.div
          className="absolute top-1/4 left-10 max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-semibold text-blue-600">
            <span className="italic font-serif">Smart Solutions</span>
          </h1>
          <h2 className="text-5xl font-bold text-blue-900 mt-2">Swift Resolutions</h2>
          <p className="text-lg text-gray-700 mt-3">
            Report issues, monitor solutions, and share your feedback
          </p>
        </motion.div>

        {/* Illustration Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative bg-white shadow-2xl rounded-xl p-6">
            {/* Simulating the tablet screen with a city map */}
            <motion.div
              className="relative w-[500px] h-[300px] bg-gray-200 rounded-lg overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Icons and elements inside tablet */}
              <motion.div
                className="absolute top-10 left-10 bg-blue-500 p-4 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
              >
                📍
              </motion.div>
              <motion.div
                className="absolute top-20 right-16 bg-green-500 p-4 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 }}
              >
                🏠
              </motion.div>
              <motion.div
                className="absolute bottom-12 left-20 bg-yellow-500 p-4 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4 }}
              >
                💡
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Success Stories Section */}
      <div className="w-full py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Success Stories</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          Discover how our smart city solutions have improved the lives of residents by addressing key urban challenges efficiently.
        </p>
      </div>

      {/* Auto-Scrolling Feature Carousel */}
      <div className="w-full bg-[#f3f4f6] py-16 overflow-hidden relative">
        {/* Gradient Overlays (Left & Right) for fading effect */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#f3f4f6] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#f3f4f6] to-transparent z-10" />

        {/* Scrolling Feature Cards */}
        <div
          ref={sliderRef}
          className="flex space-x-6 px-6 overflow-x-hidden scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Doubling features array for seamless scrolling */}
          {[...features, ...features].map((feature, index) => (
           <div
              key={index}
              className="flex-none w-[calc(25%-1.5rem)] bg-white p-6 rounded-lg text-center shadow-md transition-transform hover:scale-105 hover:shadow-lg"
            >
              {feature.icon}
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
