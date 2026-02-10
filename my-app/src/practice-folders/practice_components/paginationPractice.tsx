import React from "react";
import { useState, useMemo, useEffect } from "react";

type Row = { id: number; name: string; email: string };

// declare pagination function

function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  //   Always at least 1, even if dataset is empty
  //   Clamps the requested page:
  // //     never less than 1
  // //     never greater than totalPages
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    page: safePage,
    total,
    totalPages,
    pageItems: items.slice(start, start + pageSize),
  };
}

// create pagination controls
function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  return (
    <div>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      <span style={{ margin: "0 8px" }}>
        Page {page} / {totalPages}
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

// create test data
const DATA: Row[] = Array.from({ length: 103 }).map((_, i) => ({
  id: i + 1,
  name: `Person${i + 1}`,
  email: `Person${i + 1}@test.com`,
}));

// create pagination component

export function TablePaginationDemo() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);

  const {
    page: safePage,
    totalPages,
    pageItems,
  } = useMemo(() => paginate(DATA, page, pageSize), [page, pageSize]);

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage]);

  return (
    <div>
      <PaginationControls
        page={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <table>
        <tbody>
          {pageItems.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
