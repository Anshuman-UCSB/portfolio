import React from "react";

const UserView: React.FC = () => {
  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold mb-6">Your Answer</h2>
      <button className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl">
        Option A
      </button>
      <button className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl">
        Option B
      </button>
      <button className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl">
        Option C
      </button>
      <button className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl">
        Option D
      </button>
    </div>
  );
};

export default UserView;
