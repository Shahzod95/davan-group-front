import { useRef } from "react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";

const TextEditor = () => {
  const editorRef = useRef(null);

  // Apply the selected formatting
  const applyFormatting = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div className="">
      <div className="flex bg-slate-200 gap-4 mb-4">
        <button
          className="p-2 rounded-md"
          onClick={() => applyFormatting("bold")}
        >
          <FaBold />
        </button>
        <button
          className="p-2 rounded-md"
          onClick={() => applyFormatting("italic")}
        >
          <FaItalic />
        </button>
        <button
          className="p-2 rounded-md"
          onClick={() => applyFormatting("underline")}
        >
          <FaUnderline />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="border-2 p-4 rounded-md min-h-[200px] focus:outline-none"
        placeholder="Start typing..."
      ></div>
    </div>
  );
};

export default TextEditor;
