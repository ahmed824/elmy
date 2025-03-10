import React from "react";
import Link from "next/link";
import { FaCheckCircle, FaShoppingCart, FaHome } from "react-icons/fa";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen pb-8 -mb-48 bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        </div>

        {/* Thank You Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Purchase!
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was successful, and your order is being processed. You will
          receive a confirmation email shortly.
        </p>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="text-gray-800 font-medium">#123456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="text-gray-800 font-medium">$99.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="text-gray-800 font-medium">Credit Card</span>
            </div>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaShoppingCart className="text-lg" />
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FaHome className="text-lg" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}