'use client';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export default function DataTable<T>({ columns, data, emptyMessage = 'Keine Einträge', onRowClick }: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-charcoal/5 p-12 text-center text-charcoal-muted text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-charcoal/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-charcoal/5">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-3 text-xs font-medium text-charcoal-muted uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {data.map((item, i) => (
              <tr key={i} onClick={() => onRowClick?.(item)} className={`hover:bg-warm-sand/30 transition-colors${onRowClick ? ' cursor-pointer' : ''}`}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-charcoal-body">
                    {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
