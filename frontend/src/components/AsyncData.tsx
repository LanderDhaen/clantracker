import Loader from "./Loader";
import Error from "./Error";

interface AsyncDataProps {
  loading: boolean;
  error: Error;
  children: React.ReactNode;
}

export default function AsyncData({
  loading,
  error,
  children,
}: AsyncDataProps) {
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Error error={error} />
      {children}
    </>
  );
}
