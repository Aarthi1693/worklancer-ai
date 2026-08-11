interface TaskTypeSelectorProps {
  taskType: "digital" | "field";
  setTaskType: (type: "digital" | "field") => void;
}

export default function TaskTypeSelector({
  taskType,
  setTaskType,
}: TaskTypeSelectorProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-slate-900">
        Select Task Type
      </h2>

      <p className="mt-2 text-slate-600">
        Choose the type of task you want to publish.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {/* Digital Task */}
        <button
          onClick={() => setTaskType("digital")}
          className={`rounded-2xl border p-6 text-center transition-all duration-300 ${
            taskType === "digital"
              ? "border-blue-600 bg-blue-50 shadow-md"
              : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
          }`}
        >
          <div className="text-3xl">💻</div>

          <h3
            className={`mt-4 text-xl font-semibold ${
              taskType === "digital"
                ? "text-blue-700"
                : "text-slate-900"
            }`}
          >
            Digital Task
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Software, Design, AI, Content, Development
          </p>
        </button>

        {/* Field Task */}
        <button
          onClick={() => setTaskType("field")}
          className={`rounded-2xl border p-6 text-center transition-all duration-300 ${
            taskType === "field"
              ? "border-green-600 bg-green-50 shadow-md"
              : "border-slate-200 bg-white hover:border-green-300 hover:shadow-md"
          }`}
        >
          <div className="text-3xl">📍</div>

          <h3
            className={`mt-4 text-xl font-semibold ${
              taskType === "field"
                ? "text-green-700"
                : "text-slate-900"
            }`}
          >
            On-Field Task
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Delivery, Survey, Event, Installation, Inspection
          </p>
        </button>

      </div>

    </div>
  );
}