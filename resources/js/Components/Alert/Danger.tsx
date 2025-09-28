interface DangerProps {
    message: string;
    onClose: () => void;
  }
  
  function Danger({ message, onClose }: DangerProps) {
    return (
      <div role="alert" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <button className="cursor-pointer" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <span>{message}</span>
      </div>
    );
  }
  
  export default Danger;
  