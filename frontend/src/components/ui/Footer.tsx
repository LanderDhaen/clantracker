export default function Footer() {
  return (
    <footer className="py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm font-bold">
          &copy; {new Date().getFullYear()} Dutch Legion 3. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
