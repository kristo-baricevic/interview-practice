// Frontend Challenge 2: Search + Highlight

// Prompt
// You’re building a customer list.

// Each customer looks like this:
// {
//   id: string,
//   name: string,
//   email: string
// }

// Requirements
// - Display the list of customers
// - Add a text input to search by name
// - Search should be case-insensitive
// - Highlight the matching part of the name
// - Searching should not mutate the original list

// Code should be easy to reason about
// No CSS required. Plain React is fine.

import React from "react";
import { useState, useMemo } from "react";

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

const HighlightedQuery = ({ name, query }) => {
  if (!query) return <span>{name}</span>;

  const lowerName = name.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerName.indexOf(lowerQuery);

  if (index === -1) return <span>{name}</span>;

  const before = lowerName.splice(0, index);
  const match = lowerName.splice(index, index + query.length);
  const after = lowerName.splice(index + query.length);

  return (
    <span>
      {before}
      <strong>{match}</strong>
      {after}
    </span>
  );
};

export function CustomerList() {
  const [searchTerm, setSearchTerm] = useState("");

  const visibleData = useMemo(() => {
    if (!searchTerm) return DATA;

    return DATA.filter((c) => c.name.includes(searchTerm));
  }, [searchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search Name"
      />
      <table>
        <tbody>
          {visibleData?.map((c) => (
            <tr id={c.id}>
              <td>
                <HighlightedQuery name={c.name} query={searchTerm} />
              </td>
              <td>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
