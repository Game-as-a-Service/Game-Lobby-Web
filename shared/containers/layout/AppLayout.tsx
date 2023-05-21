import Sidebar from "@/shared/components/Sidebar"
import Footer from "@/shared/components/Footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <main className="">{children}</main>
      <Footer />
    </div>
  )
}
