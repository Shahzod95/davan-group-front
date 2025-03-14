export function SelectTrigger({ onClick, placeholder, value }) {
    return (
      <div
        className="w-full px-3 py-2 border rounded-md cursor-pointer bg-white flex justify-between items-center"
        onClick={onClick}
      >
        <span>{value || placeholder || "Select..."}</span>
        <span>▼</span>
      </div>
    );
  }
  