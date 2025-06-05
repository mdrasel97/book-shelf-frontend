import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Loading;
