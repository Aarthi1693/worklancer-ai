"use client";

import { useEffect, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import projectService from "@/services/project.service";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;
  status: string;
}

export default function TasksPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [editingProject, setEditingProject] = useState<Project | null>(null);

const [editForm, setEditForm] = useState({
  title: "",
  description: "",
  budget: 0,
  requiredSkills: "",
});

  const loadProjects = async () => {
  try {
    const data = await projectService.getProjects();
    setProjects(data);
  } catch (error) {
    console.error("Failed to load projects", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const fetchProjects = async () => {
    await loadProjects();
  };

  fetchProjects();
}, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      await projectService.deleteProject(id);
      loadProjects();
    } catch  {
      alert("Failed to delete project.");
    }
  };

  if (loading) {
    return (
      <DesktopLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-2xl font-bold text-white">
            Loading Projects...
          </h1>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}

<div className="flex items-center justify-between">

  <div>
    <h1 className="text-4xl font-bold text-white">
      Project Management
    </h1>

    <p className="text-slate-400 mt-2">
      View and manage all your created projects.
    </p>
  </div>

  <input
    type="text"
    placeholder="🔍 Search Projects..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-80
      p-3
      rounded-xl
      bg-slate-900
      border
      border-white/10
      outline-none
      focus:border-blue-500
      text-white
    "
  />

</div>

{/* Status Filters */}

<div className="flex gap-3">

  {["ALL", "OPEN", "IN_PROGRESS", "REVIEW", "COMPLETED"].map((status) => (

    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`px-5 py-2 rounded-xl transition font-medium
        ${
          statusFilter === status
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
            : "bg-slate-900 border border-white/10 hover:bg-slate-800"
        }`}
    >
      {status.replace("_", " ")}
    </button>

  ))}

</div>

        {/* Statistics */}

        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">

            <p className="text-slate-400">
              Total Projects
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {projects.length}
            </h2>

          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">

            <p className="text-slate-400">
              Open
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              {
                projects.filter(
                  (project) => project.status === "OPEN"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">

            <p className="text-slate-400">
              In Progress
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              {
                projects.filter(
                  (project) =>
                    project.status === "IN_PROGRESS"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">

            <p className="text-slate-400">
              Completed
            </p>

            <h2 className="text-3xl font-bold text-purple-400 mt-2">
              {
                projects.filter(
                  (project) =>
                    project.status === "COMPLETED"
                ).length
              }
            </h2>

          </div>

        </div>

        {/* Projects Table */}

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">

          <div className="p-6 border-b border-white/[0.08]">

            <h2 className="text-2xl font-bold">
              All Projects
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/[0.08] text-slate-400">

                  <th className="p-5 text-left">
                    Title
                  </th>

                  <th className="p-5 text-left">
                    Budget
                  </th>

                  <th className="p-5 text-left">
                    Skills
                  </th>

                  <th className="p-5 text-left">
                    Status
                  </th>

                  <th className="p-5 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {projects.length === 0 ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="text-center p-10 text-slate-500"
                    >

                      No Projects Found

                    </td>

                  </tr>

                ) : (

                 projects
  .filter((project) => {
    const matchesSearch =
      !search ||
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.requiredSkills
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      project.status === statusFilter;

    return matchesSearch && matchesStatus;
  })
  .map((project) => (
                                        <tr
                      key={project.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="p-5">
                        <div>
                          <h3 className="font-semibold text-white">
                            {project.title}
                          </h3>

                          <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </td>

                      <td className="p-5 text-green-400 font-semibold">
                        ₹{(project.budget ?? 0).toLocaleString()}
                      </td>

                      <td className="p-5">
                        <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 text-sm">
                          {project.requiredSkills}
                        </span>
                      </td>

                      <td className="p-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status === "OPEN"
                              ? "bg-green-500/20 text-green-400"
                              : project.status === "IN_PROGRESS"
                              ? "bg-blue-500/20 text-blue-400"
                              : project.status === "REVIEW"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>

                      <td className="p-5">
                        <div className="flex gap-3">

                          <button
  onClick={() => {
    setEditingProject(project);

    setEditForm({
      title: project.title,
      description: project.description,
      budget: project.budget,
      requiredSkills: project.requiredSkills,
    });
  }}
  className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
>
  Edit
</button>

                          <button
                            onClick={() => handleDelete(project.id)}
                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 transition"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* AI Insights */}

        <div className="grid grid-cols-3 gap-6">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">

            <h3 className="text-lg font-semibold">
              Total Budget
            </h3>

            <p className="text-4xl font-bold text-green-400 mt-4">
              ₹
              {projects
                .reduce(
                  (sum, project) => sum + project.budget,
                  0
                )
                .toLocaleString()}
            </p>

            <p className="text-slate-500 mt-2">
              Total value of all projects
            </p>

          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">

            <h3 className="text-lg font-semibold">
              Active Projects
            </h3>

            <p className="text-4xl font-bold text-blue-400 mt-4">
              {
                projects.filter(
                  (project) =>
                    project.status !== "COMPLETED"
                ).length
              }
            </p>

            <p className="text-slate-500 mt-2">
              Currently running
            </p>

          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6">

            <h3 className="text-lg font-semibold">
              Success Rate
            </h3>

             <p className="text-4xl font-bold text-purple-400 mt-4">
               N/A
             </p>

            <p className="text-slate-500 mt-2">
              AI Predicted Success
            </p>

          </div>

        </div>

      </div>

      {/* Edit Project Modal */}

{editingProject && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/10 p-8">

      <h2 className="text-3xl font-bold mb-6">
        Edit Project
      </h2>

      <div className="space-y-5">

        <input
          value={editForm.title}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              title: e.target.value,
            })
          }
          placeholder="Project Title"
          className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
        />

        <textarea
          rows={4}
          value={editForm.description}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              description: e.target.value,
            })
          }
          placeholder="Project Description"
          className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
        />

        <input
          type="number"
          value={editForm.budget}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              budget: Number(e.target.value),
            })
          }
          placeholder="Budget"
          className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
        />

        <input
          value={editForm.requiredSkills}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              requiredSkills: e.target.value,
            })
          }
          placeholder="Required Skills"
          className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
        />

      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => setEditingProject(null)}
          className="px-6 py-3 rounded-xl border border-white/10"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await projectService.updateProject(
              editingProject.id,
              editForm
            );

            setEditingProject(null);

            loadProjects();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}

    </DesktopLayout>
  );
}