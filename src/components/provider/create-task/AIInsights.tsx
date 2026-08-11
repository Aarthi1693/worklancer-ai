export default function AIInsights() {
  return (
    <div className="sticky top-24">

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-2xl font-bold text-slate-900">
          🤖 AI Insights
        </h2>

        <p className="mt-2 text-slate-600">
          AI recommendations will appear here while you create your task.
        </p>

        <div className="mt-8 space-y-6">

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">
              Suggested Budget
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-600">
              --
            </h3>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">
              Recommended Skills
            </p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              --
            </h3>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">
              Estimated Duration
            </p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              --
            </h3>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">
              Success Score
            </p>

            <h3 className="mt-2 text-2xl font-bold text-blue-600">
              --
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}