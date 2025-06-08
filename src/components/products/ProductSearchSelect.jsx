// components/ProductSearchSelect.jsx
import { useEffect, useState } from "react";
import { useBusinessStore, useProductStore } from "../../hooks";

export default function ProductSearchSelect({ onSelect }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {
    products,
    filteredProducts,
    isLoading,
    searchingProducts,
    startLoadingProducts,
  } = useProductStore();

  const { business } = useBusinessStore();

  const productsToDisplay = query.trim() ? filteredProducts : products;

  useEffect(() => {
    const delay = setTimeout(() => {
      searchingProducts({query,business:business._id});
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (product) => {
    onSelect(product); // notificar al padre
    setQuery("");
  };

  useEffect(() => {
    startLoadingProducts({ _id: business._id });
  }, []);

  return (
    <div className="relative mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // para permitir clic
          placeholder="Buscar producto para agregar"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-gray-500"
        />
      </div>

      {showSuggestions && (
        <>
          {productsToDisplay.length > 0 ? (
            <ul className="absolute z-10 bg-white w-full border mt-1 rounded shadow max-h-64 overflow-auto">
              {productsToDisplay.map((p) => (
                <li
                  key={p._id}
                  onClick={() => handleSelect(p)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {p.name} – ${p.pvp.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && (
              <div className="absolute z-10 bg-white w-full border mt-1 rounded shadow p-2 text-sm text-gray-500 italic">
                No hay productos
              </div>
            )
          )}
        </>
      )}

      {isLoading && (
        <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow p-2 text-sm italic text-gray-500">
          Buscando...
        </div>
      )}
    </div>
  );
}
