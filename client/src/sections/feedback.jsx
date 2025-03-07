import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FeedbackForm = () => {
  const [reason, setReason] = useState("");
  
  const handleSubmit = () => {
    alert(`Feedback Submitted! Reason: ${reason}`);
  };

  return (
    <div className="flex justify-center items-center py-10 bg-[#f3f5f6]">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
        transition={{ duration: 0.5 }}
        className="bg-blue-100 shadow-xl shadow-slate-500 rounded-2xl p-10 w-[600px]"
      >
        <h2 className="text-xl font-bold text-center">Share Your Thoughts</h2>
        <p className="text-base text-gray-500 text-center mb-6">
          How has your experience been? We would love to hear your feedback!
        </p>
        <textarea
          className="w-full p-3 border rounded-lg mb-6"
          placeholder="Mention a reason for your feedback"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-5 py-3 rounded-lg" onClick={handleSubmit}>
            Submit
          </button>
          <button className="bg-gray-300 text-black px-5 py-3 rounded-lg" onClick={() => setReason("")}> 
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackForm;
