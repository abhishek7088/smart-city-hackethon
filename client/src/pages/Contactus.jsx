import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {GOOGLE_MAPS_API_KEY} from "../config"

const ContactUsForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    picture: null,
    location: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  });

  // Map state
  const [markerPosition, setMarkerPosition] = useState(formData.location);

  // Map options
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const onMapClick = (e) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    setFormData({ ...formData, location: newPosition });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here, you would send the data to your backend API
    // e.g., using fetch or axios
    alert('Issue reported successfully!');
    setFormData({ name: '', phone: '', picture: null, location: { lat: 37.7749, lng: -122.4194 } });
    setMarkerPosition({ lat: 37.7749, lng: -122.4194 });
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Report an Issue</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Phone Number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* Picture Upload */}
          <div>
            <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
              Upload Picture
            </label>
            <input
              type="file"
              id="picture"
              onChange={(e) => setFormData({ ...formData, picture: e.target.files[0] })}
              className="mt-1 w-full p-2 border rounded-md"
              accept="image/*"
            />
          </div>

          {/* Google Map for Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Location (Click on the map to mark the issue location)
            </label>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={formData.location}
                zoom={10}
                onClick={onMapClick}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
            </LoadScript>
            <p className="mt-2 text-sm text-gray-600">
              Selected Location: Lat: {formData.location.lat.toFixed(4)}, Lng: {formData.location.lng.toFixed(4)}
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUsForm;