"use client";

import { useEffect, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import projectService from "@/services/project.service";
import {
  Eye,
  CheckCircle,
  Trash2,
  Briefcase,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;
  status: string;
  taskType: "DIGITAL" | "FIELD";
}

export default function TaskManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [showModal, setShowModal] =
    useState(false);

  const loadProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

   const markCompleted = async (id: string) => {
    try {
      await projectService.updateProject(id, {
        status: "COMPLETED",
      } as any);

      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;

    try {
      await projectService.deleteProject(id);
      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold text-white">
            Task Management
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor and manage all created tasks.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">

            <p className="text-slate-400">
              Total Tasks
            </p>

            <h2 className="text-3xl font-bold mt-3 text-white">
              {projects.length}
            </h2>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">

            <p className="text-slate-400">
              Open
            </p>

            <h2 className="text-3xl font-bold mt-3 text-blue-400">
              {
                projects.filter(
                  (p) => p.status === "OPEN"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">

            <p className="text-slate-400">
              In Progress
            </p>

            <h2 className="text-3xl font-bold mt-3 text-yellow-400">
              {
                projects.filter(
                  (p) => p.status === "IN_PROGRESS"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">

            <p className="text-slate-400">
              Completed
            </p>

            <h2 className="text-3xl font-bold mt-3 text-green-400">
              {
                projects.filter(
                  (p) => p.status === "COMPLETED"
                ).length
              }
            </h2>

          </div>

        </div>

        {/* Projects Grid */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {loading ? (

    <div className="col-span-full text-center py-20 text-slate-400">
      Loading Projects...
    </div>

  ) : projects.length === 0 ? (

    <div className="col-span-full text-center py-20 text-slate-400">
      No Projects Found
    </div>

  ) : (

    projects.map((project) => (

      <div
        key={project.id}
        className="
          rounded-3xl
          border
          border-white/10
          bg-slate-900/70
          backdrop-blur-xl
          p-6
          hover:border-cyan-500/30
          transition-all
          duration-300
        "
      >

        {/* Header */}

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold text-white">
              {project.title}
            </h2>

            <p className="text-slate-400 mt-2 line-clamp-2">
              {project.description}
            </p>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              project.taskType === "DIGITAL"
                ? "bg-cyan-500/20 text-cyan-400"
                : "bg-orange-500/20 text-orange-400"
            }`}
          >
            {project.taskType}
          </span>

        </div>

        {/* Divider */}

        <div className="border-t border-white/10 my-5"></div>

        {/* Details */}

        <div className="grid grid-cols-2 gap-5">

          <div>

            <p className="text-slate-500 text-sm">
              Budget
            </p>

            <h3 className="text-green-400 text-xl font-bold">
              ₹{(project.budget ?? 0).toLocaleString()}
            </h3>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              Status
            </p>

            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                project.status === "OPEN"
                  ? "bg-blue-500/20 text-blue-400"
                  : project.status === "IN_PROGRESS"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : project.status === "REVIEW"
                  ? "bg-purple-500/20 text-purple-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {project.status}
            </span>

          </div>

        </div>

        {/* Skills */}

        <div className="mt-6">

          <p className="text-slate-500 text-sm mb-2">
            Required Skills
          </p>

          <div className="flex flex-wrap gap-2">

            {project.requiredSkills
              .split(",")
              .map((skill) => (

                <span
                  key={skill}
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-cyan-500/10
                    text-cyan-300
                    text-xs
                  "
                >
                  {skill.trim()}
                </span>

              ))}

          </div>

        </div>

        {/* Actions */}

        <div className="flex gap-3 mt-8">

          <button
            onClick={() => {
              setSelectedProject(project);
              setShowModal(true);
            }}
            className="
              flex-1
              py-3
              rounded-xl
              border
              border-white/10
              hover:bg-white/5
              flex
              justify-center
              items-center
              gap-2
            "
          >
            <Eye size={18} />
            View
          </button>

          {project.status !== "COMPLETED" && (

            <button
              onClick={() =>
                markCompleted(project.id)
              }
              className="
                flex-1
                py-3
                rounded-xl
                bg-green-600
                hover:bg-green-500
                flex
                justify-center
                items-center
                gap-2
              "
            >
              <CheckCircle size={18} />
              Complete
            </button>

          )}

          <button
            onClick={() =>
              deleteProject(project.id)
            }
            className="
              px-4
              rounded-xl
              bg-red-600
              hover:bg-red-500
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    ))

  )}

</div>
  

                {/* Project Details Modal */}

        {showModal && selectedProject && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                w-full
                max-w-2xl
                rounded-3xl
                bg-slate-900
                border
                border-white/10
                p-8
                shadow-2xl
              "
            >

              <div className="flex justify-between items-center">

                <h2 className="text-3xl font-bold text-white">
                  Project Details
                </h2>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ✕
                </button>

              </div>

              <div className="grid gap-6 mt-8">

                <div>

                  <p className="text-slate-400 text-sm">
                    Project Title
                  </p>

                  <h3 className="text-2xl font-semibold mt-2">
                    {selectedProject.title}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-400 text-sm">
                    Description
                  </p>

                  <div className="mt-2 rounded-xl bg-slate-800 p-4">
                    {selectedProject.description}
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <p className="text-slate-400 text-sm">
                      Required Skills
                    </p>

                    <h3 className="mt-2">
                      {selectedProject.requiredSkills}
                    </h3>

                  </div>

                  <div>

                    <p className="text-slate-400 text-sm">
                      Budget
                    </p>

                    <h3 className="mt-2 text-green-400 font-bold">
                      ₹{selectedProject.budget.toLocaleString()}
                    </h3>

                  </div>

                  <div>

                    <p className="text-slate-400 text-sm">
                      Task Type
                    </p>

                    <h3 className="mt-2">
                      {selectedProject.taskType}
                    </h3>

                  </div>

                  <div>

                    <p className="text-slate-400 text-sm">
                      Status
                    </p>

                    <h3 className="mt-2">
                      {selectedProject.status}
                    </h3>

                  </div>

                </div>

              </div>

              <div className="flex justify-end gap-4 mt-10">

                <button
                  onClick={() => setShowModal(false)}
                  className="
                    px-6
                    py-3
                    rounded-xl
                    border
                    border-white/10
                    hover:bg-white/5
                  "
                >
                  Close
                </button>

                {selectedProject.status !== "COMPLETED" && (

                  <button
                    onClick={() => {
                      markCompleted(selectedProject.id);
                      setShowModal(false);
                    }}
                    className="
                      px-6
                      py-3
                      rounded-xl
                      bg-green-600
                      hover:bg-green-500
                    "
                  >
                    Mark Completed
                  </button>

                )}

              </div>

            </div>

          </div>

        )}
              </div>
    </DesktopLayout>
  );
}