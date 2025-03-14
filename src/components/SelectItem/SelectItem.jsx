export function SelectItem({ value, children, onSelect }) {
    return (
      <div
        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => onSelect(value)}
      >
        {children}
      </div>
    );
  }
  