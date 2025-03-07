import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";


import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const ReportIssues = () => {
  const [formData, setFormData] = useState({
    category: "",
    desc: "",
    attachment: null,
    location: { latitude: "", longitude: "" },
    manualLocation: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapRef = useRef(null); // Reference to the map instance
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setMessage("");
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
    setMessage("");
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setFormData({ ...formData, location: newLocation });
          setMarkerPosition(newLocation);

          // Move map to the new location
          if (mapRef.current) {
            mapRef.current.flyTo([newLocation.latitude, newLocation.longitude], 15);
          }
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

    if (formData.location.latitude || !formData.location.longitude) {
      setMessage(
        <>
          Please provide a location by pressing <br />
          (Get Current Location).
        </>
      );
      setLoading(false);
      return;
    }
    

    

    try {
      const data = new FormData();
      data.append("category", formData.category);
      data.append("desc", formData.desc);
      data.append("attachment", formData.attachment);
      data.append("latitude", formData.location.latitude);
      data.append("longitude", formData.location.longitude);

      await axios.post("http://localhost:4000/issues/createIssue", data, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Issue reported successfully!");
      setFormData({ category: "", desc: "", attachment: null, location: { latitude: "", longitude: "" }, manualLocation: "" });
      setMarkerPosition(null);
    } catch (error) {
      console.error("Error submitting issue:", error);
      setMessage(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  function LocationMarker() {
    const map = useMap(); // Get the map instance

    useMapEvents({
      click(e) {
        const newPosition = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        };
        setMarkerPosition(newPosition);
        setFormData((prev) => ({ ...prev, location: newPosition }));

        // Move map to the clicked position
        map.flyTo([newPosition.latitude, newPosition.longitude], 15);
      },
    });

    
    useEffect(() => {
      if (markerPosition) {
        map.flyTo([markerPosition.latitude, markerPosition.longitude], 15);
      }
    }, [markerPosition, map]);

    return markerPosition ? (
      <Marker
        position={[markerPosition.latitude, markerPosition.longitude]}
        icon={new L.Icon({
          iconUrl: markerIconPng,
          shadowUrl: markerShadowPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    ) : null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl text-black border border-blue-200 flex">
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Report an Issue</h2>

          {message && <p className="mb-4 text-center text-red-500 font-semibold">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-blue-50"
              >
                <option value="">Select a category</option>
                <option value="Road Damage">Road Damage</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Power Outage">Power Outage</option>
                <option value="Garbage Collection">Garbage Collection</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Description</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 bg-blue-50"
                rows="4"
                placeholder="Describe the issue..."
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Attachment (Optional)</label>
              <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md bg-blue-50" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition"
            >
              {loading ? "Submitting..." : "Submit Issue"}
            </button>
          </form>
        </div>

        <div className="w-1/2 p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Location</h3>
          <MapContainer
            center={markerPosition || [37.7749, -122.4194]} // Default center
            zoom={12}
            style={{ width: "100%", height: "300px", borderRadius: "10px" }}
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Store map instance in ref
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
          <button
            type="button"
            onClick={handleGetLocation}
            className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Get Current Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportIssues;
