import React, { useState } from "react";
import FormRenderer from "../components/FormRenderer";
import TableRenderer from "../components/TableRenderer";
import { searchConfig, resultConfig } from "../config/SearchConfig";
import { fetchCustomers } from "../lib/api";
import type { Customer } from "../types/customer";

export default function SearchPage() {
  // initial blank values
  const initialValues = Object.fromEntries(
    searchConfig.fields.map((f) => [f.key, ""])
  ) as Record<string, string>;

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Customer[]>([]);
  const [searched, setSearched] = useState(false); // track if user searched

  // 🔍 Perform search
  const doSearch = async () => {
    setError(null);
    setLoading(true);
    setSearched(true);

    try {
      // remove empty fields (avoid sending blank filters)
      const activeFilters = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v.trim() !== "")
      );

      // If all fields empty → show all
      const data = await fetchCustomers(activeFilters);
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Reset form and results
  const reset = () => {
    setValues(initialValues);
    setResults([]);
    setError(null);
    setSearched(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Care247 — Customer Search
      </h1>

      <FormRenderer
        fields={searchConfig.fields}
        values={values}
        onChange={(k, v) => setValues((s) => ({ ...s, [k]: v }))}
        onSubmit={doSearch}
        onReset={reset}
      />

      <div className="mt-6">
        {loading && <div className="p-4 text-gray-600">Loading…</div>}
        {error && <div className="p-4 text-red-600">Error: {error}</div>}

        {!loading && !error && searched && results.length > 0 && (
          <TableRenderer data={results} columns={resultConfig.columns} />
        )}

        {!loading && !error && searched && results.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No customers found for your search.
          </div>
        )}

        {!loading && !error && !searched && (
          <div className="p-4 text-center text-gray-500">
            Please enter details to search.
          </div>
        )}
      </div>
    </div>
  );
}
