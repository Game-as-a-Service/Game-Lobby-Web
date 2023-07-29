import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="__wrap flex flex-col w-full h-full">
      <Header />
      <div className="__container flex flex-grow">
        <Sidebar />
        <main className="__main flex-grow px-8 w-full h-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
