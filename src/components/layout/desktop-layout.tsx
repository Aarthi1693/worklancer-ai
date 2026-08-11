import Navbar from "./navbar";
import AIWidget from "@/components/ai/AIWidget";

interface Props {
  children: React.ReactNode;
}

export default function DesktopLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#F8F8F6]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
<main className="w-full min-h-[calc(100vh-64px)] bg-[#F8F8F6]">
  <div className="max-w-[1600px] mx-auto px-6 py-6">
    {children}
  </div>
</main>

      {/* Floating AI Assistant */}
    <AIWidget />
    </div>
  );
}