import NavBar from "../components/nav-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="p-12">
        {children}
      </main>
    </>
  );
}