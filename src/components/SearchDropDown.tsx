import { useState, useEffect } from "react";
import type { SearchableSelectProps } from "../type";

export default function SearchableSelect<T>({
  apiUrl,
  placeholder = "Search...",
  queryKey = "q",
  labelExtractor,
  onSelect,
}: SearchableSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<T[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetch(`${apiUrl}?${queryKey}=${encodeURIComponent(searchTerm)}`)
        .then((res) => res.json())
        .then((data: T[]) => setResults(data))
        .catch((err) => console.error("Error fetching search results:", err));
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, apiUrl, queryKey]);

  return (
    <div className="relative w-full mt-2">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 rounded-md  bg-gradient-to-br from-gray-700 via-gray-800 to-gray-950 text-gray-400 placeholder-gray-400 focus:outline-none border-r-1 border-b-1 border-gray-500"
      />

      {isOpen && searchTerm && (
        <div className="absolute mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSearchTerm(labelExtractor(item));
                  setIsOpen(false);
                  onSelect?.(item);
                }}
                className="px-3 py-2 cursor-pointer hover:bg-gray-700 text-gray-400"
              >
                {labelExtractor(item)}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
