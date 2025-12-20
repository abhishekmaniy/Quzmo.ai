import Navbar from "./Navbar";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LandingLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <header className="fixed top-0 left-0 z-50 w-full">
        <Navbar />
      </header>{" "}
       <main className="relative z-10 flex flex-col items-center pt-24">
        {children}
      </main>
    </div>
  );
}
