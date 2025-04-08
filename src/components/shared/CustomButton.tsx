import clsx from "clsx";
import { ReactNode } from "react";

// Define types for the props
interface CustomButtonProps {
  textName: ReactNode; // Allow textName to be a ReactNode (string, element, etc.)
  handleAnything?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string; // Allow className to be passed as a prop
}

// custom button
const CustomButton: React.FC<CustomButtonProps> = ({
  textName,
  handleAnything,
  className = "",
}) => {
  return (
    <button
      onClick={handleAnything}
      className={clsx(
        "relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono dark:bg-slate-800 tracking-tighter text-white bg-blue-600 rounded-lg group",
        className
      )}
    >
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-full group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-90 bg-gradient-to-b from-transparent via-transparent to-purple-400"></span>
      {/* text name */}
      <span className="relative text-text dark:text-slate-200 group-hover:text-white">
        {textName}
      </span>
    </button>
  );
};

export default CustomButton;
