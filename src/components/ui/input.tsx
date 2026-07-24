import * as React from "react"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`
        h-9 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-1
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

export { Input }
