import { useState } from "react";

export function Select({ options, onChange, placeholder }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="relative">
      <select
        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onChange(e.target.value);
        }}
      >
        <option value="" disabled>
          {placeholder || "Select an option"}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
