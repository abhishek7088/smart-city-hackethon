import React, { useState } from "react";
import axios from "axios";

const ReportIssues = () => {
  const [formData, setFormData] = useState({
    category: "",
    desc: "",
    attachment: null,
    location: { latitude: "", longitude: "" },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };


  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setMessage("Location access denied.");
        }
      );
    } else {
      setMessage("Geolocation is not supported by your browser.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("category", formData.category);
      data.append("desc", formData.desc);
      data.append("attachment", formData.attachment);
      data.append("latitude", formData.location.latitude);
      data.append("longitude", formData.location.longitude);

      const response = await axios.post("/api/issues", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Issue reported successfully!");
      setFormData({ category: "", desc: "", attachment: null, location: { latitude: "", longitude: "" } });
    } catch (error) {
      console.error("Error submitting issue:", error);
      setMessage("Failed to report issue. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Report an Issue</h2>

      {message && <p className="mb-4 text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Dropdown */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select a category</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Power Outage">Power Outage</option>
            <option value="Garbage Collection">Garbage Collection</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description Input */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Describe the issue..."
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-medium">Attachment (Optional)</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <button
            type="button"
            onClick={handleGetLocation}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Get Current Location
          </button>

          {formData.location.latitude && (
            <p className="mt-2 text-sm text-gray-600">
              Latitude: {formData.location.latitude}, Longitude: {formData.location.longitude}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default ReportIssues;
