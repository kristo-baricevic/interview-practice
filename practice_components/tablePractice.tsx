import React from "react";
import { useState, useEffect, useMemo } from "react";

type Row = {
  id: number;
  name: string;
  email: string;
};

const DATA: Row[] = [
  { id: 1, name: "Alice", email: "alice@gmail.com" },
  { id: 2, name: "George", email: "george@gmail.com" },
  { id: 3, name: "Bob", email: "bob@gmail.com" },
];

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

export function TableWithSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();

    if (!q) return DATA;

    return DATA.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
      {filtered.length === 0 ? (
        <div>No Results</div>
      ) : (
        <table>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
