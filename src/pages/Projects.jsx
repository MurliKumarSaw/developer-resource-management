import { useSelector } from "react-redux";

import Card from "../components/layout/common/Card";
import Badge from "../components/layout/common/Badge";

import projects from "../data/projects";
import clients from "../data/clients";

function Projects() {
  // Assignments now come from Redux
  const assignments = useSelector(
    (state) => state.assignments
  );

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Projects
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View projects, clients, and assigned resources.
        </p>
      </div>

      {/* Project List */}
      <Card className="overflow-hidden p-0">

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">

            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Project
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Client
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Team Size
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Timeline
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {projects.map((project) => {

                const client = clients.find(
                  (client) => client.id === project.clientId
                );

                const projectAssignments = assignments.filter(
                  (assignment) =>
                    assignment.projectId === project.id &&
                    assignment.status !== "DECLINED"
                );

                return (
                  <tr
                    key={project.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {project.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {project.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {client?.name || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <Badge status={project.status} />
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {projectAssignments.length} developers
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {project.startDate} → {project.endDate}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 p-4 md:hidden">

          {projects.map((project) => {

            const client = clients.find(
              (client) => client.id === project.clientId
            );

            const projectAssignments = assignments.filter(
              (assignment) =>
                assignment.projectId === project.id &&
                assignment.status !== "DECLINED"
            );

            return (
              <div
                key={project.id}
                className="rounded-xl border border-slate-200 p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-slate-900">
                      {project.name}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {project.id}
                    </p>
                  </div>

                  <Badge status={project.status} />

                </div>

                <div className="mt-4 space-y-2">

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Client
                    </span>

                    <span className="font-medium text-slate-900">
                      {client?.name || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Developers
                    </span>

                    <span className="font-medium text-slate-900">
                      {projectAssignments.length}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Timeline
                    </span>

                    <span className="text-right font-medium text-slate-900">
                      {project.startDate}
                      <br />
                      {project.endDate}
                    </span>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </Card>

      {/* Summary */}
      <p className="text-sm text-slate-500">
        Showing {projects.length} projects
      </p>

    </div>
  );
}

export default Projects;