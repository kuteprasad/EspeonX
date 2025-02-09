import { Loader2 } from "lucide-react";

const Loading = ({ size = "default", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center gap-4">
      <Loader2 
        className={`animate-spin text-blue-500 ${sizeClasses[size]}`}
      />
      <p className="text-gray-400 font-medium">{text}</p>
    </div>
  );
};

export default Loading;