// Frontend Practice Prompt: Debounced Search
// Scenario

// You’re building an internal dashboard that displays a list of customers.

// Each customer looks like this:

// {
//   id: string,
//   name: string,
//   email: string
// }
//
// You already have the full list in memory.

// Requirements
// - Display the list of customers
// - Add a text input to search by name
// - Searching should be case-insensitive
// - The list should update only after the user stops typing
// - The delay should be configurable (e.g. 300ms)
// - Do not mutate the original list

// Code should be clear and easy to reason about

// Clarifications (this is how they’d answer you)
// - You do not need to fetch data
// - You do not need to style anything
// - You may use React hooks
// - You do not need to write a reusable debounce library unless you want to

// Focus on correctness and UX

import React from "react";
import { useState, useEffect, useMemo } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
};

const DATA: Customer[] = [
  {
    id: "1",
    name: "Charlie",
    email: "charlie@gmail.com",
  },
  {
    id: "2",
    name: "Buzz",
    email: "buzz@gmail.com",
  },
  {
    id: "3",
    name: "Woody",
    email: "woody@gmail.com",
  },
];

function useDebounce(query, delay = 300) {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), delay);
    () => clearTimeout(t);
  }, [query, delay]);

  return debounced;
}

function TableWithSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedQuery = useDebounce(searchTerm);

  const visibleData = useMemo(() => {
    if (!debouncedQuery) return DATA;

    return DATA.filter((o) =>
      o.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  return (
    <div>
      <h1>Table with Search</h1>
      <input
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search Name"
      />
      <table>
        <thead>
          {visibleData?.map((o: Customer) => (
            <tr id={o.id}>
              <td>{o.name}</td>
              <td>{o.email}</td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}
