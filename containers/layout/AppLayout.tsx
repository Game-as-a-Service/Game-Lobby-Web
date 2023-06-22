import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap__ flex flex-col w-full h-full">
      <Header />
      <div className="container__ flex flex-grow gap-5">
        <Sidebar />
        <main className="flex-grow w-full h-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
