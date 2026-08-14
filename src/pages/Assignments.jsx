import { useState } from "react";

import Card from "../components/layout/common/Card";
import Avatar from "../components/layout/common/Avatar";
import Badge from "../components/layout/common/Badge";

import developers from "../data/developers";
import projects from "../data/projects";
import assignments from "../data/assignments";

function Assignments() {
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [allocation, setAllocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAssign = (event) => {
    event.preventDefault();

    if (
      !selectedDeveloper ||
      !selectedProject ||
      !allocation ||
      !startDate ||
      !endDate
    ) {
      return;
    }

    console.log("New assignment:", {
      developerId: selectedDeveloper,
      projectId: selectedProject,
      allocation: Number(allocation),
      startDate,
      endDate,
      status: "PENDING",
    });

    alert("Assignment created successfully");

    setSelectedDeveloper("");
    setSelectedProject("");
    setAllocation("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Assignments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Assign developers to projects and manage resource allocation.
        </p>
      </div>

      {/* Assignment Form */}
      <Card>
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Create Assignment
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Assign a developer to a project.
          </p>
        </div>

        <form
          onSubmit={handleAssign}
          className="mt-5 space-y-5"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Developer */}
            <div>
              <label
                htmlFor="developer"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Developer
              </label>

              <select
                id="developer"
                value={selectedDeveloper}
                onChange={(event) =>
                  setSelectedDeveloper(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">
                  Select developer
                </option>

                {developers.map((developer) => (
                  <option
                    key={developer.id}
                    value={developer.id}
                  >
                    {developer.name} — {developer.role}
                  </option>
                ))}
              </select>
            </div>

            {/* Project */}
            <div>
              <label
                htmlFor="project"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Project
              </label>

              <select
                id="project"
                value={selectedProject}
                onChange={(event) =>
                  setSelectedProject(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">
                  Select project
                </option>

                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Allocation */}
            <div>
              <label
                htmlFor="allocation"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Allocation (%)
              </label>

              <input
                id="allocation"
                type="number"
                min="1"
                max="100"
                value={allocation}
                onChange={(event) =>
                  setAllocation(event.target.value)
                }
                placeholder="e.g. 50"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Start Date
              </label>

              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                End Date
              </label>

              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(event) =>
                  setEndDate(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 sm:w-auto"
            >
              Assign Developer
            </button>
          </div>
        </form>
      </Card>

      {/* Existing Assignments */}
      <Card className="overflow-hidden p-0">

        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Current Assignments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Developers currently assigned to projects.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Developer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Project
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Allocation
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Dates
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {assignments.map((assignment) => {
                const developer = developers.find(
                  (item) =>
                    item.id === assignment.developerId
                );

                const project = projects.find(
                  (item) =>
                    item.id === assignment.projectId
                );

                if (!developer || !project) {
                  return null;
                }

                return (
                  <tr key={assignment.id}>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={developer.name}
                          size="sm"
                        />

                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {developer.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {developer.role}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {project.name}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {assignment.allocation}%
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {assignment.startDate}
                      {" → "}
                      {assignment.endDate}
                    </td>

                    <td className="px-5 py-4">
                      <Badge status={assignment.status} />
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>

        {/* Mobile */}
        <div className="divide-y divide-slate-100 md:hidden">
          {assignments.map((assignment) => {
            const developer = developers.find(
              (item) =>
                item.id === assignment.developerId
            );

            const project = projects.find(
              (item) =>
                item.id === assignment.projectId
            );

            if (!developer || !project) {
              return null;
            }

            return (
              <div
                key={assignment.id}
                className="p-4"
              >
                <div className="flex items-start gap-3">

                  <Avatar
                    name={developer.name}
                    size="sm"
                  />

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {developer.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {project.name}
                        </p>
                      </div>

                      <Badge status={assignment.status} />
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">

                      <div>
                        <p className="text-xs text-slate-500">
                          Allocation
                        </p>

                        <p className="font-semibold text-slate-900">
                          {assignment.allocation}%
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Start
                        </p>

                        <p className="font-medium text-slate-900">
                          {assignment.startDate}
                        </p>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </Card>

    </div>
  );
}

export default Assignments;