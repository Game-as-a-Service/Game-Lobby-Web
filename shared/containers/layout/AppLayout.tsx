import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="">
        <Sidebar />
        {children}
      </main>
      <Footer />
    </div>
  );
}
