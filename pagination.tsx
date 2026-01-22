import * as React from "react";

type Row = { id: number; name: string; email: string };

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
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>
      <span style={{ margin: "0 8px" }}>
        Page {page} / {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

const DATA: Row[] = Array.from({ length: 103 }).map((_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  email: `person${i + 1}@test.com`,
}));

export function TablePaginationDemo() {
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(25);

  const {
    page: safePage,
    totalPages,
    pageItems,
  } = React.useMemo(() => paginate(DATA, page, pageSize), [page, pageSize]);

  React.useEffect(() => {
    if (page !== safePage) setPage(safePage);
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
