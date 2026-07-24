import * as React from "react"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={`
        flex min-h-[60px] w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2
        text-base text-white shadow-sm transition-all outline-none
        placeholder:text-slate-500
        focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
        disabled:pointer-events-none disabled:opacity-50
        md:text-sm
        ${className ?? ""}
      `}
      {...props}
    />
  )
}

export { Textarea }
