import React, { useState, useEffect } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { Socket } from "socket.io-client";

const UserView: React.FC<{ name: string; socket: Socket }> = ({
  name,
  socket,
}) => {
  const [equation, setEquation] = useState("1+2=3");
  const [submitted, setSubmitted] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    socket.on("next_question", () => {
      console.log("Next question");
      setWaiting(false);
      setSubmitted(false);
    });
  }, []);

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold mb-6">Your Answer</h2>
      <div className="relative">
        <div className="w-full h-full flex items-center justify-center">
          <Latex>{`$$${equation}$$`}</Latex>
        </div>
        <div className="relative">
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter your LaTeX here..."
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
          <div className="absolute bottom-14 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-400">TeX</span>
          </div>
        </div>
      </div>

      <button
        className={`w-full px-6 py-3 ${
          submitted
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white rounded-lg text-xl`}
        onClick={() => {
          setSubmitted(true);
          // Get the API URL based on the environment
          const API_URL =
            import.meta.env.VITE_ENV === "PROD"
              ? import.meta.env.VITE_PROD_API
              : import.meta.env.VITE_DEV_API;

          // Send a POST request to the submit endpoint
          fetch(`${API_URL}/submit_answer`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              answer: equation,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Submit response:", data);
              // Handle the response as needed
              if (data.result === "correct") {
                setWaiting(true);
              } else {
                setSubmitted(false);
              }
            })
            .catch((error) => {
              console.error("Error submitting answer:", error);
            });
        }}
        disabled={submitted}
      >
        Submit
      </button>
    </div>
  );
};

export default UserView;
