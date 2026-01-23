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
  const [statusFilter, setStatusFilter] = useState("");
  const [order, setOrder] = useState("");

  //useMemo just keeps the last result of a calculation so React doesn’t have to redo it if nothing relevant changed.
  const visibleData = useMemo(() => {
    let result = DATA;

    if (statusFilter) {
      result = result.filter((o) => o.status === statusFilter);
    }

    if (order === "ascending") {
      result = [...result].sort((a, b) => a.pickupTime - b.pickupTime);
    }

    if (order === "descending") {
      result = [...result].sort((a, b) => b.pickupTime - a.pickupTime);
    }

    return result;
  }, [statusFilter, order]);

  return (
    <div>
      <select
        value={statusFilter}
        onChange={(e) => {
          setStatusFilter(e.target.value);
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
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
        <option value="">None</option>
      </select>

      <table>
        <tbody>
          {visibleData?.map((o: Order) => {
            <td key={o.id}>
              <tr>{o.customerName}</tr>
              <tr>{o.status}</tr>
              <tr>{timeDateConverter(o.pickupTime)}</tr>
            </td>;
          })}
        </tbody>
      </table>
    </div>
  );
}
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
