// Requirements

// - Display the list of orders

// - Allow filtering by status

// - Allow sorting by pickupTime (ascending or descending)

// - Filters and sort should not reset each other

// - Code should be clear and easy to reason about

// You can assume:
// - Data is already loaded
// - No CSS required
// - React or plain JS is fine. Pick what you’re most comfortable with.

// What I’m looking for
// - Where state lives
// - What is derived vs stored
// - Clean data flow
// - No unnecessary complexity

// Start here

// Tell me:
// - What state you would store
// - What you would derive

// Then start writing code
// You can begin with a function signature or a React component.

import * as React from "react";
import { useState, useEffect, useMemo } from "react";

type Order = {
  id: string;
  customerName: string;
  status: "scheduled" | "picked_up" | "delivered" | "canceled";
  pickupTime: number;
};

const DATA: Order[] = [
  {
    id: "1",
    customerName: "Charlie",
    status: "scheduled",
    pickupTime: 1769128210,
  },
  {
    id: "2",
    customerName: "Suzie",
    status: "delivered",
    pickupTime: 1769142610,
  },
  {
    id: "3",
    customerName: "Frank",
    status: "delivered",
    pickupTime: 1769315410,
  },
  {
    id: "4",
    customerName: "Steve",
    status: "canceled",
    pickupTime: 1769319010,
  },
  {
    id: "5",
    customerName: "Lisa",
    status: "picked_up",
    pickupTime: 1769322610,
  },
];

const timeDateConverter = (pickupTime: number) => {
  const date = new Date(pickupTime * 1000);
  return date.toLocaleString();
};

export function Dashboard() {
  const [filtered, setFiltered] = useState("");
  const [order, setOrder] = useState("");

  const visibleData = useMemo(() => {
    let results = DATA;

    if (filtered) {
      results = results.filter((r) => r.status === filtered);
    }

    if (order == "ascending") {
      results = [...results].sort((a, b) => a.pickupTime - b.pickupTime);
    }

    if (order == "descending") {
      results = [...results].sort((a, b) => b.pickupTime - a.pickupTime);
    }

    return results;
  }, [filtered, order]);

  return (
    <div>
      <select
        value={filtered}
        onChange={(e) => {
          setFiltered(e.target.value);
        }}
      >
        <option value="scheduled">Scheduled</option>
        <option value="picked_up">Picked Up</option>
        <option value="delivered">Delivered</option>
        <option value="canceled">Canceled</option>
        <option value="">None</option>
      </select>
      <select
        value={order}
        onChange={(e) => {
          setOrder(e.target.value);
        }}
      >
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
      </select>
      <table>
        <tbody>
          {visibleData?.map((o: Order) => (
            <tr id={o.id}>
              <td>{o.customerName}</td>
              <td>{o.status}</td>
              <td>{timeDateConverter(o.pickupTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
