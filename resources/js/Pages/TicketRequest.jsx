import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function TicketRequest({ auth }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    time: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    service_type: "",
    type_duration: "",
    postal_office: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket Request Submitted:", formData);
    alert("Your ticket request has been submitted!");
  };

  return (
    <>
      <Head title="Request Ticket" />

      <Layout user={auth.user}>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Request a Ticket
          </h2>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                placeholder="Enter your first name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                placeholder="Enter your last name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Service Type */}
            <div className="mb-4">
              <label
                htmlFor="service_type"
                className="block text-sm font-medium text-gray-700"
              >
                Service Type
              </label>
              <input
                type="text"
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleInputChange}
                required
                placeholder="Enter the service type"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Type Duration */}
            <div className="mb-4">
              <label
                htmlFor="type_duration"
                className="block text-sm font-medium text-gray-700"
              >
                Type Duration (in days)
              </label>
              <input
                type="number"
                id="type_duration"
                name="type_duration"
                value={formData.type_duration}
                onChange={handleInputChange}
                required
                min={1}
                placeholder="Enter duration in days"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Postal Office */}
            <div className="mb-4">
              <label
                htmlFor="postal_office"
                className="block text-sm font-medium text-gray-700"
              >
                Postal Office
              </label>
              <input
                type="text"
                id="postal_office"
                name="postal_office"
                value={formData.postal_office}
                onChange={handleInputChange}
                required
                placeholder="Enter the postal office"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Request
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}
