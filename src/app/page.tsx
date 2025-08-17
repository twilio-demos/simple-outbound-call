"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCall = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await axios.post("/api/twilio-call");
      if (res.data.success) {
        setStatus("Call placed successfully! SID: " + res.data.sid);
      } else {
        setStatus("Failed to place call: " + (res.data.error || "Unknown error"));
      }
    } catch (err: any) {
      setStatus("Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <Image src="/twilio-logo.svg" alt="Twilio logo" width={180} height={38} priority />
      <h1 className="text-2xl font-bold">Twilio Outbound Call Demo</h1>
      <p className="text-center max-w-md">
        Press the button below to trigger an outbound call using Twilio. The call will be placed using TO={process.env.NEXT_PUBLIC_TO} and FROM={process.env.NEXT_PUBLIC_FROM}.
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
        onClick={handleCall}
        disabled={loading}
      >
        {loading ? "Placing Call..." : "Place Outbound Call"}
      </button>
      {status && (
        <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-200">
          {status}
        </div>
      )}
    </div>
  );
}
