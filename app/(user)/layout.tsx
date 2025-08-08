import Footer from "@/components/Footer";
import Headedr from "@/components/Header";

export default async function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen ">
      <Headedr />
      <Footer />

      <main className="fixed left-0 right-0 bottom-16 top-0 sm:bottom-0 sm:top-20 ">
        {children}
      </main>
    </div>
  );
}
