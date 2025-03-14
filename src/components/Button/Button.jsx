export function Button({ className, ...props }) {
    return (
      <button
        className={`bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${className}`}
        {...props}
      />
    );
  }
  