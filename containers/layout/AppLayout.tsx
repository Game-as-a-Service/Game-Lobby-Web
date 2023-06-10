import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap__ flex flex-col w-full h-full bg-dark1E">
      <Header />
      <div className="container__ flex flex-row w-full h-full gap-0.5">
        <Sidebar />
        <div className="content__ flex w-full">
          <main className="flex-grow">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
