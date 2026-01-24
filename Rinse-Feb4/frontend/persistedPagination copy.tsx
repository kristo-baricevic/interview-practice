// Frontend Challenge 3: Paginated Table With Persistent State

// You’re building an orders table.
// Each order looks like:

// {
//   id: string,
//   customerName: string,
//   status: "scheduled" | "picked_up" | "delivered" | "canceled"
// }

// Requirements

// - Display orders in a table
// - Show 10 orders per page
// - Add Next and Previous buttons
// - Allow filtering by status
// - Changing the filter should not reset the page unless the page becomes invalid
// - No external libraries

// Example behavior
// - You’re on page 3
// - You change the filter
// - If page 3 still exists → stay on page 3
// - If page 3 no longer exists → go to the last valid page

import * as React from "react";
import { useState, useMemo } from "react";
import { useEffect } from "react/cjs/react.production";

type Order = {
  id: string;
  customerName: string;
  status: "scheduled" | "picked_up" | "delivered" | "canceled";
};

const DATA: Order[] = [
  {
    id: "1",
    customerName: "Charlie",
    status: "scheduled",
  },
  {
    id: "2",
    customerName: "Suzie",
    status: "delivered",
  },
  {
    id: "3",
    customerName: "Frank",
    status: "delivered",
  },
  {
    id: "4",
    customerName: "Steve",
    status: "canceled",
  },
  {
    id: "5",
    customerName: "Lisa",
    status: "picked_up",
  },
];

function pagination<T>(items: T[], page, pageSize) {
  const total = items.length;
  const totalPages = Math.max(1, total / pageSize);

  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    page: safePage,
    total,
    totalPages,
    pageItems: items.slice(start, start + pageSize),
  };
}

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => {
          onPageChange(page - 1);
        }}
      >
        Prev
      </button>
      <span>
        {page} \ {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => {
          onPageChange(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export const Table = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const [filter, setFilter] = useState("");

  const filteredItems = useMemo(() => {
    if (!filter) return DATA;

    return DATA.filter((d) => d.status == filter);
  }, [filter]);

  const {
    page: safePage,
    total,
    totalPages,
    pageItems,
  } = pagination<Order>(filteredItems, page, pageSize);

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage]);

  return (
    <div>
      <h1>Table with Filters</h1>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="scheduled">Scheduled</option>
        <option value="picked_up">Picked Up</option>
        <option value="delivered">Delivered</option>
        <option value="canceled">Canceled</option>
        <option value="">No Filter</option>
      </select>
      <div>{total} Orders</div>
      <table>
        <tbody>
          {pageItems.map((o: Order) => {
            <tr id={o.id}>
              <td>{o.customerName}</td>
              <td>{o.status}</td>
            </tr>;
          })}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};
