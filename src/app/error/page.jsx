import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";

export default function PaymentError() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 -mb-56 text-center px-6">
      {/* Animated Error Icon */}
      <div
        className="bg-yellow-100 text-yellow-600 p-6 rounded-full shadow-lg"
        data-aos="zoom-in"
      >
        <FaExclamationTriangle className="text-6xl" />
      </div>

      {/* Heading & Message */}
      <h1
        className="text-3xl font-bold text-gray-800 mt-6"
        data-aos="fade-up"
      >
        Payment Error
      </h1>
      <p className="text-gray-600 mt-3" data-aos="fade-up" data-aos-delay="200">
        There was an issue processing your payment. Please try again or check your payment details.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4" data-aos="fade-up" data-aos-delay="400">
        <Link
          href="/checkout"
          className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition"
        >
          Try Again
        </Link>
        <Link
          href="/support"
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
