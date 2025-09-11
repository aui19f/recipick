import Menu from "@/components/layout/Menu";
export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-t z-50 flex  items-center justify-around border-t border-t-gray-400">
      <div className="flex-1">
        <Menu />
      </div>
    </footer>
  );
}
