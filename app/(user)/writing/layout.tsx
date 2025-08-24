export default function MasterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-screen overflow-auto">{children}</div>;
}
