import Footer from "@/shared/components/Footer";
import Sidebar from "@/shared/components/Sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="w-full">
        <Sidebar />
        {children}
      </main>
      <Footer />
    </div>
  );
}
