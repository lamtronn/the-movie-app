import Navbar from "@/components/Navbar";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") {
    return <div />;
  }
  return (
    <main>
      <div className="w-full h-16 bg-black">
        <Navbar />
      </div>
      {children}
    </main>
  );
}
