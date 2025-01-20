"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle search
  const handleSearch = async (value) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://69.164.194.254/indexes/movies/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer f85205aa46728d9312ab3ef7d3bf0382a06be5835ea20a6863ac43a1ca7a",
          },
          body: JSON.stringify({
            q: value,
            limit: 5,
          }),
        }
      );

      const data = await response.json();
      setSearchResults(data.hits || []);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  // Handle input change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar películas..."
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Results List */}
        {showDropdown && (searchTerm || loading) && (
          <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border z-10">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Cargando...</div>
            ) : searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {searchResults.map((movie, index) => (
                  <li key={movie.id || index} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {movie.poster ? (
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-12 h-12 rounded-md object-cover"
                            onError={(e) => {
                              e.target.src = "/api/placeholder/48/48";
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {movie.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {movie.release_date
                            ? new Date(movie.release_date * 1000).getFullYear()
                            : "Año desconocido"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : searchTerm ? (
              <div className="p-4 text-center text-gray-500">
                No hay resultados disponibles
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
