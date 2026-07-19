import Sidebar from "./sidebar";
import Header from "./header";
import AIPanel from "./ai-panel";
import AICopilot from "@/components/ai-chat/ai-copilot";
interface Props {
  children: React.ReactNode;
}

export default function DesktopLayout({
  children,
}: Props) {
  return (
    <div className="h-screen flex flex-col">
      {/* Glow Orbs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main
  className="
    flex-1
    overflow-y-auto
    p-6
    bg-gradient-to-br
    from-slate-950
    via-[#050B1F]
    to-[#0A1028]
    text-white
  "
>
          {children}
        </main>

        <AIPanel />
        <AICopilot/>
      </div>
    </div>
  );
}