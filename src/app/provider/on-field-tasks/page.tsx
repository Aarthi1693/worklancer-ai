"use client";

const tasks = [
  {
    id: 1,
    title: "Deliver Laptop",
    pickup: "Electronic City",
    drop: "Whitefield",
    reward: "₹350",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Collect Documents",
    pickup: "Koramangala",
    drop: "MG Road",
    reward: "₹250",
    status: "Pending",
  },
  {
    id: 3,
    title: "Product Delivery",
    pickup: "Indiranagar",
    drop: "HSR Layout",
    reward: "₹400",
    status: "Completed",
  },
];

export default function OnFieldTasksPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-5xl font-bold text-white">
          On-Field Tasks
        </h1>

        <p className="text-slate-400 mt-2">
          Manage physical and location-based tasks.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
          <p className="text-slate-400">Total Tasks</p>
          <h2 className="text-3xl font-bold text-white mt-2">
            24
          </h2>
        </div>

        <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
          <p className="text-slate-400">In Progress</p>
          <h2 className="text-3xl font-bold text-blue-400 mt-2">
            8
          </h2>
        </div>

        <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
          <p className="text-slate-400">Completed</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            14
          </h2>
        </div>

        <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
          <p className="text-slate-400">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            2
          </h2>
        </div>

      </div>

      {/* Tasks Table */}

      <div className="bg-slate-900/50 border border-white/[0.08] rounded-3xl overflow-hidden">

        <div className="p-6 border-b border-white/[0.08]">
          <h2 className="text-2xl font-semibold">
            Active Field Tasks
          </h2>
        </div>

        <table className="w-full">

          <thead>
            <tr className="border-b border-white/[0.08] text-slate-400">
              <th className="text-left p-5">Task</th>
              <th className="text-left p-5">Pickup</th>
              <th className="text-left p-5">Drop</th>
              <th className="text-left p-5">Reward</th>
              <th className="text-left p-5">Status</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-white/5"
              >
                <td className="p-5">
                  {task.title}
                </td>

                <td className="p-5 text-slate-400">
                  {task.pickup}
                </td>

                <td className="p-5 text-slate-400">
                  {task.drop}
                </td>

                <td className="p-5 text-green-400">
                  {task.reward}
                </td>

                <td className="p-5">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs
                      ${
                        task.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : task.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000/20 text-blue-400"
                      }
                    `}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* AI Insights */}

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
          <p className="text-slate-400">
            Average Delivery Time
          </p>

          <h2 className="text-3xl font-bold text-blue-400 mt-2">
            34 Min
          </h2>
        </div>

        <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
          <p className="text-slate-400">
            Success Rate
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            98%
          </h2>
        </div>

        <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
          <p className="text-slate-400">
            AI Suggested Reward
          </p>

          <h2 className="text-3xl font-bold text-purple-400 mt-2">
            ₹320
          </h2>
        </div>

      </div>

    </div>
  );
}