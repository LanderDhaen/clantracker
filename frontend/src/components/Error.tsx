import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 5000); // 5 seconds

    return () => clearTimeout(timeoutId);
  }, [error, navigate]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-60">
      <h1 className="text-7xl font-extrabold">Oops!</h1>
      <p className="text-2xl font-semibold my-4">
        An unknow error occured. Redirecting to home page in 5 seconds...
      </p>
    </div>
  );
}
