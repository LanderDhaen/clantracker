import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 py-60">
      <h1 className="text-7xl font-extrabold">404</h1>
      <p className="text-2xl font-semibold  mb-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div>
        <Button
          className="ml-auto"
          variant="outline"
          onClick={() => navigate("/")}
        >
          <House className="mr-2" />
          Back to home
        </Button>
      </div>
    </div>
  );
}
