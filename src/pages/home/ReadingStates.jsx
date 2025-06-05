import React from "react";

const ReadingStates = () => {
  const stats = [
    {
      label: "Books in Library",
      value: "25,439",
      description: "And growing every day",
    },
    {
      label: "Active Readers",
      value: "12,847",
      description: "Join our community",
    },
    {
      label: "Reviews Written",
      value: "89,123",
      description: "Share your thoughts",
    },
    {
      label: "Reading Goals Met",
      value: "67%",
      description: "Keep pushing forward",
    },
  ];
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-4">
            Reading Community Stats
          </h2>
          <p className="text-lg text-blue-100">Be part of something bigger</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-medium text-blue-100 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-blue-200">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadingStates;
