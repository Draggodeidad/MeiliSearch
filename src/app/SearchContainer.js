"use client";
import { useState } from "react";
import FreeSoloCreateOptionDialog from "./buscador";
import AlignItemsList from "./lista";

export default function SearchContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="busq">
        <FreeSoloCreateOptionDialog
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      <div className="list">
        <AlignItemsList searchResults={searchResults} loading={loading} />
      </div>
    </>
  );
}
