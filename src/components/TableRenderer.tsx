import React from "react";
import type { Customer } from "../types/customer";

type Column = { key: string; label: string };

type Props = {
  data: Customer[];
  columns: Column[];
};

const getPrimaryPhone = (c: Customer) => c.phones.find((p) => p.isPrimary)?.number ?? c.phones[0]?.number ?? "-";
const getPrimaryEmail = (c: Customer) => c.emails.find((e) => e.isPrimary)?.address ?? c.emails[0]?.address ?? "-";
const getFullName = (c: Customer) => `${c.firstName} ${c.lastName}`;

export default function TableRenderer({ data, columns }: Props) {
  if (!data.length) {
    return <div className="p-4 text-center text-gray-600">No customers found.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-2 text-sm font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c.id} className="border-t">
              {columns.map((col) => {
                let value: string = "-";
                if (col.key === "fullName") value = getFullName(c);
                else if (col.key === "primaryPhone") value = getPrimaryPhone(c);
                else if (col.key === "primaryEmail") value = getPrimaryEmail(c);
                else if (col.key === "dateOfBirth") value = c.dateOfBirth;
                else {
                  // fallback: try to access key from customer (if simple)
                  // @ts-ignore
                  value = c[col.key] ?? "-";
                }

                return (
                  <td key={col.key} className="px-4 py-3 text-sm">
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
