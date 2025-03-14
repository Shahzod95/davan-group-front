export function Checkbox({ className, ...props }) {
    return (
      <input
        type="checkbox"
        className={`w-5 h-5 text-blue-500 border rounded focus:ring-2 ${className}`}
        {...props}
      />
    );
  }
  