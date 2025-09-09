import React from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ⚖️ Advocate Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional Legal Services Website
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
          <p className="text-gray-700">
            This is a test page to verify the application is working.
            If you see this, the React app is loading successfully!
          </p>
          <div className="mt-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Test Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
