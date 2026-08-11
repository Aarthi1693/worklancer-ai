"use client";

const info = [
  {
    label: "Worker Type",
    value: "Digital + Field",
  },
  {
    label: "Experience",
    value: "2 Years",
  },
  {
    label: "Availability",
    value: "Available",
  },
  {
    label: "Preferred Work",
    value: "Remote & On-site",
  },
  {
    label: "Languages",
    value: "English, Tamil",
  },
];

export default function WorkerInformation() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-slate-900">
        Worker Information
      </h2>

      <div className="mt-6 space-y-5">

        {info.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
          >
            <span className="text-slate-500">
              {item.label}
            </span>

            <span className="font-semibold text-slate-900">
              {item.value}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}