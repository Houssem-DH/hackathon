import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/react";
import QRCode from "qrcode";

export default function TicketRequest({ auth, availableQueues }) {
    const { data, setData, post, processing, reset } = useForm({
        first_name: "",
        last_name: "",
        phone_number: "",
        service_type: "",
        type_duration: "",
        postal_office: "",
        date: "",
        time: "",
    });

    const [availableTimes, setAvailableTimes] = useState([]);
    const [isSlotAvailable, setIsSlotAvailable] = useState(true);
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission
    const [qrCode, setQrCode] = useState(null); // New state for QR code

    const generateTimeSlots = (availableQueues, selectedDate) => {
        const start = 8 * 60;
        const end = 17 * 60;
        const step = 15;

        const queueTimes = availableQueues
            .filter((queue) => queue.date === selectedDate)
            .map((queue) => queue.time);

        const timeSlots = [];
        for (let i = start; i < end; i += step) {
            const hours = Math.floor(i / 60).toString().padStart(2, "0");
            const minutes = (i % 60).toString().padStart(2, "0");
            const time = `${hours}:${minutes}`;

            if (!queueTimes.includes(time)) {
                timeSlots.push(time);
            }
        }

        return timeSlots;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));

        if (name === "date") {
            const times = generateTimeSlots(availableQueues, value);
            setAvailableTimes(times);
        } else if (name === "time" || name === "date") {
            checkSlotAvailability(data);
        }
    };

    const checkSlotAvailability = (data) => {
        const selectedDateTime = `${data.date} ${data.time}`;
        const isAvailable = !availableQueues.some(
            (queue) => `${queue.appointment}` === selectedDateTime
        );
        setIsSlotAvailable(isAvailable);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isSlotAvailable) {
            setError("The selected time slot is unavailable. Please choose another time.");
            return;
        }

        setError(""); // Clear previous errors

        post("/ticket-request/insert", data, {
            onSuccess: () => {
                alert("Your appointment has been successfully booked!");
                setIsSubmitted(true); // Mark as submitted
                reset(); // Reset form after successful submission

                // Generate the QR code after submission
                const clientInfo = JSON.stringify({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone_number: data.phone_number,
                    service_type: data.service_type,
                    postal_office: data.postal_office,
                    date: data.date,
                    time: data.time,
                });

                QRCode.toDataURL(clientInfo).then((url) => {
                    setQrCode(url); // Set the generated QR code URL
                });
            },
            onError: () => {
                setError("There was an error while booking the appointment. Please try again.");
            },
        });
    };

   

    return (
        <>
            <Head title="Request Ticket" />
            <Layout user={auth.user}>
                <div className="max-w-3xl mx-auto bg-white py-32 px-6 rounded-lg shadow-md mt-6">

                    <img src="Assets/qr.png" className="text-center" alt="" />
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Book an Appointment
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={data.phone_number}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Service Type */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Service Type
                            </label>
                            <select
                                name="service_type"
                                value={data.service_type}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                            >
                                <option value="">Select Service</option>
                                <option value="widthraw">Withdraw</option>
                                <option value="add_to_balance">
                                    Add to Balance
                                </option>
                                <option value="transaction">Transaction</option>
                                <option value="bill_payments">
                                    Bill Payments
                                </option>
                                <option value="top_up_credit">
                                    Top Up Credit
                                </option>
                            </select>
                        </div>

                        {/* Postal Office */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Postal Office
                            </label>
                            <select
                                name="postal_office"
                                value={data.postal_office}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                            >
                                <option value="">Select Postal Office</option>
                                <option value="Setif Rp">Setif Rp</option>
                                <option value="Aine Tebinet">
                                    Aine Tebinet
                                </option>
                                <option value="El Hidab">El Hidab</option>
                            </select>
                        </div>

                        {/* Date Picker */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Select Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={data.date}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Time Picker */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">
                                Select Time
                            </label>
                            <select
                                name="time"
                                value={data.time}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                            >
                                <option value="">Select Time</option>
                                {availableTimes.length > 0 ? (
                                    availableTimes.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No available time slots</option>
                                )}
                            </select>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-500 text-sm mb-4">{error}</div>
                        )}

                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-lg shadow text-white ${
                                isSlotAvailable
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-300"
                            }`}
                            disabled={processing || !isSlotAvailable}
                        >
                            {processing ? "Booking..." : "Book Appointment"}
                        </button>
                    </form>

                    {isSubmitted && qrCode && (
                        <div className="mt-8 flex justify-center items-center">
                            <img src={qrCode} alt="QR Code" />
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
}
