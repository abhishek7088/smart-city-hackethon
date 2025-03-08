import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/issues/getAllIssues`);
        console.log(response.data.data)
        setIssues(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching issues");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_APP_SERVER_URL}/issues/${id}`, { status });
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === id ? { ...issue, status } : issue
        )
      );
      
      toast.success("Status updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error updating status");
    }
  };

  const filteredIssues =
    filter === "All" ? issues : issues.filter((issue) => issue.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 p-6 text-[#000000]">
      <ToastContainer />
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-6">
        {/* Enhanced Heading */}
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6 shadow-md">
          Admin Panel - Track Issues
        </h1>

        {/* Filter Dropdown */}
        <div className="mb-6 flex justify-between items-center">
          <label className="text-lg font-semibold text-gray-700">Filter by Status:</label>
          <select
            className="border p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">User Email</th>
                  <th className="p-4 text-left">Location</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {filteredIssues.map((issue, index) => (
                  <tr
                    key={issue._id}
                    className={`hover:bg-blue-100 transition-all duration-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-4 font-medium">{issue.category}</td>
                    <td className="p-4 text-gray-700">{issue.desc}</td>
                    <td className="p-4 text-gray-500">{issue.user?.email || "Unknown"}</td>

                    <td className="p-4 text-gray-500">{issue.location.latitude}{" "}{issue.location.longitude}</td>
                    <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-white text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
      issue.status === "Pending"
        ? "bg-yellow-500"
        : issue.status === "In Progress"
        ? "bg-blue-500"
        : "bg-green-500"
    }`}
  >
    {issue.status}
  </span>
</td>

                    <td className="p-4">
                      <select
                        className="border p-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        value={issue.status}
                        onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
   