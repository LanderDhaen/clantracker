import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Link } from "react-router-dom";

interface HomeCardProps {
  title: string;
  info: string;
  text: string;
  URL: string;
  icon: JSX.Element;
}

export default function HomeCard({
  title,
  info,
  text,
  URL,
  icon,
}: HomeCardProps) {
  return (
    <Card className="shadow-lg rounded-3xl">
      <CardHeader className="">
        <CardTitle>
          <div className="flex items-center">
            {icon}
            {title}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-600">{info}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Link
          to={URL}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          {text}
        </Link>
      </CardFooter>
    </Card>
  );
}
