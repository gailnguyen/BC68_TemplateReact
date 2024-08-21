import React from "react";

const Banner = () => {
  return (
    <div className="container">
      <div className="Banner_Overlay bg-green-900 h-96 relative rounded-2xl">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <form className="max-w-xl mx-auto">
            <h2 className="text-white text-5xl font-normal pb-10">
              Find the right <span className="text-green-400">freelance</span>{" "}
              service, right away
            </h2>
            <div className="relative">
              <input
                type="search"
                id="search-dropdown"
                className="block p-4 w-full text-md text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300"
                placeholder="Search for any service..."
                required
              />

              <button
                type="submit"
                className="absolute top-1.5 end-1.5 p-3.5 text-xs font-medium text-white bg-green-900 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
