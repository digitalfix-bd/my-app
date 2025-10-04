"use client";

import React, { useEffect, useState } from "react";

interface Location {
  Location: string;
  ["Popular Destinations"]: string[];
  ["Service Features"]: string[];
  Latitude: number | null;
  Longitude: number | null;
  ["Short Description"]: string;
  ["Long Description"]: string;
  Keywords: string;
  ["SEO Meta Description"]: string;
  ["SEO Title"]: string;
}

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("/locations.json")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  // sort করা version বানাই
  const sortedLocations = [...locations].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.Location.localeCompare(b.Location);
    } else {
      return b.Location.localeCompare(a.Location);
    }
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        London Minicab Locations {locations.length}
      </h1>

      {/* Sorting Toggle Button */}
      <div className="mb-4">
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedLocations.map((loc, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-md bg-white p-6 hover:shadow-xl transition text-sm"
          >
            <h2 className="text-lg font-bold mb-2 text-black">{loc.Location}</h2>
            <p className="text-gray-700 mb-2">{loc["Short Description"]}</p>
            <p className="text-gray-600 text-xs mb-3">
              {loc["Long Description"]}
            </p>

            <div className="mb-2">
              <strong className="text-gray-800">Popular Destinations:</strong>
              <ul className="list-disc list-inside text-gray-600">
                {loc["Popular Destinations"].map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="mb-2">
              <strong className="text-gray-800">Service Features:</strong>
              <ul className="list-disc list-inside text-gray-600">
                {loc["Service Features"].map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="mb-2">
              <strong className="text-gray-800">Coordinates:</strong>
              <p className="text-gray-600">
                Lat: {loc.Latitude ?? "N/A"}, Lng: {loc.Longitude ?? "N/A"}
              </p>
            </div>

            <div className="mb-2">
              <strong className="text-gray-800">Keywords:</strong>
              <p className="text-gray-600">{loc.Keywords}</p>
            </div>

            <div className="mb-2">
              <strong className="text-gray-800">SEO Meta Description:</strong>
              <p className="text-gray-600">{loc["SEO Meta Description"]}</p>
            </div>

            <div className="mb-2">
              <strong className="text-gray-800">SEO Title:</strong>
              <p className="text-gray-600">{loc["SEO Title"]}</p>
            </div>

            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Book in {loc.Location}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
