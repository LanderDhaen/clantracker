import { useNavigate } from "react-router-dom";
import { Users, BarChart2 } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex space-x-4 text-center">
        <button
          className="flex items-center justify-center bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={() => navigate("/members")}
        >
          <Users className="mr-2" />
          Members
        </button>
        <button
          className="flex items-center justify-center bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105"
          onClick={() => navigate("/performance")}
        >
          <BarChart2 className="mr-2" />
          Performance
        </button>
      </div>
    </div>
  );
}
