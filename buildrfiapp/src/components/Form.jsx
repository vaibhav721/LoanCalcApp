import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    const [financingAmount, setFinancingAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCalculateLoan = async () => {
        if (!financingAmount) {
            toast.error('Please enter a financing amount.');
            return;
        }
        if (isNaN(financingAmount)) {
            toast.error('Please enter a valid number.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/calculate-loan', { amount: financingAmount });
            setMessage(response.data.message);
            setIsModalOpen(true);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getMessageColor = (message) => {
        if (message.includes('Approved')) return 'text-green-500';
        if (message.includes('Denied')) return 'text-red-500';
        if (message.includes('Need More Information')) return 'text-orange-500';
        return 'text-gray-700';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center">Loan Calculator</h1>
                <input
                    type="number"
                    value={financingAmount}
                    onChange={(e) => setFinancingAmount(e.target.value)}
                    placeholder="Enter financing amount in USD"
                    className="w-full p-2 sm:p-3 lg:p-4 mb-3 sm:mb-4 lg:mb-5 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handleCalculateLoan}
                    className="w-full bg-blue-500 text-white py-2 sm:py-3 lg:py-4 rounded-lg hover:bg-blue-600 flex items-center justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg className="animate-spin-slow h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3-3 3h4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8h4l-3-3 3-3H4z"></path>
                        </svg>
                    ) : (
                        'Calculate Loan'
                    )}
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in p-4 sm:p-6 lg:p-8">
                    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg max-w-sm sm:max-w-md lg:max-w-lg w-full text-center animate-slide-in">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8">Result</h2>
                        <p className={`text-base sm:text-lg lg:text-xl font-semibold ${getMessageColor(message)}`}>{message}</p>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 sm:mt-6 lg:mt-8 w-full bg-blue-500 text-white py-2 sm:py-3 lg:py-4 rounded-lg hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default Form;
