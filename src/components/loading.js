export default function LoadingSpinner() {
    return (
      <div className="flex items-center fixed inset-0 justify-center bg-black/25 z-50">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }