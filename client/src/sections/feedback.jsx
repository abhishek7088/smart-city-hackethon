import React from "react";

const Feedback = () => {
  return (
    <div className="w-full py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-900">Feedback</h2>
      <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
        Rate your experience and share your thoughts about our Smart City solutions.
      </p>

      {/* Textarea for Feedback */}
      <div className="mt-6 max-w-2xl mx-auto">
        <textarea
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Write your feedback here..."
        ></textarea>
        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
