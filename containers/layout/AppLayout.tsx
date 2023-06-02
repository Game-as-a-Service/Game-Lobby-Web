import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
