import type { Customer } from "../types/customer";

export type FieldUiType = "input" | "date" | "select";

export interface FieldConfig {
  uiType: FieldUiType;
  label: string;
  renderOrder: number;
  placeholder?: string;
  options?: string[]; // for select
  key: keyof Customer | string;
}

export const searchConfig = {
  fields: [
    { key: "firstName", uiType: "input", label: "First Name", renderOrder: 1, placeholder: "Enter first name" },
    { key: "lastName", uiType: "input", label: "Last Name", renderOrder: 2, placeholder: "Enter last name" },
    { key: "dateOfBirth", uiType: "date", label: "Date of Birth", renderOrder: 3 }
  ] as FieldConfig[]
};

// result columns config — drives the result UI
export const resultConfig = {
  columns: [
    { key: "fullName", label: "Name" },
    { key: "dateOfBirth", label: "DOB" },
    { key: "primaryPhone", label: "Primary Phone" },
    { key: "primaryEmail", label: "Primary Email" }
  ]
};
