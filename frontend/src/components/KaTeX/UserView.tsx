import React, { useState } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

const UserView: React.FC = () => {
  const [equation, setEquation] = useState("f(x) = x^2");
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
    </div>
  );
};

export default UserView;
