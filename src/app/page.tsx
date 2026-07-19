"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/splash");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
      Loading...
    </div>
  );
}