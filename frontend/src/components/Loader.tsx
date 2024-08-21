export default function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
        <p className="text-sm text-gray-500">Please wait a moment</p>
      </div>
    </div>
  );
}
