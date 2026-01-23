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

function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    page: safePage,
    total,
    totalPages,
    pageItems: items.slice(start, start + pageSize),
  };
}

function Pagination({ totalPages, page, onPageChange }) {
  return (
    <div>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      <span>
        {page}\{totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export function TableWithPagination() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const filtered = useMemo(() => {
    if (!filter) return DATA;
    return DATA.filter((o) => o.status === filter);
  }, [filter]);

  const {
    page: safePage,
    total,
    totalPages,
    pageItems,
  } = paginate<Order>(filtered, page, pageSize);

  React.useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage]);

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="scheduled">Scheduled</option>
        <option value="picked_up">Picked Up</option>
        <option value="delivered">Delivered</option>
        <option value="canceled">Canceled</option>
        <option value="">No Filter</option>
      </select>
      <table>
        <tbody>
          {pageItems?.map((o: Order) => (
            <tr key={o.id}>
              <td>{o.customerName}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} page={page} onPageChange={setPage} />
    </div>
  );
}
