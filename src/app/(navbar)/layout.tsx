import MainNavbarClientWrapper from "./NavbarClientWrapper";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") {
    return <div />;
  }
  return (
    <main>
      <div className="w-full h-16 bg-black">
        <MainNavbarClientWrapper />
      </div>
      {children}
    </main>
  );
}
