import type { FieldConfig } from "../config/SearchConfig";

type Props = {
  fields: FieldConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  onReset?: () => void;
};

export default function FormRenderer({ fields, values, onChange, onSubmit, onReset }: Props) {
  const sorted = [...fields].sort((a, b) => a.renderOrder - b.renderOrder);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-white p-4 rounded shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sorted.map((f) => {
          const value = values[f.key] ?? "";
          return (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1">{f.label}</label>
              {f.uiType === "input" && (
                <input
                  value={value}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full border rounded px-3 py-2"
                />
              )}
              {f.uiType === "date" && (
                <input
                  type="date"
                  value={value}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              )}
              {f.uiType === "select" && (
                <select value={value} onChange={(e) => onChange(f.key, e.target.value)} className="w-full border rounded px-3 py-2">
                  <option value="">Select</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            onReset?.();
          }}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
