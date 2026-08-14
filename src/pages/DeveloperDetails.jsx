import { Link, useParams } from "react-router-dom";

import Card from "../components/layout/common/Card";
import Avatar from "../components/layout/common/Avatar";
import Badge from "../components/layout/common/Badge";

import developers from "../data/developers";
import assignments from "../data/assignments";
import projects from "../data/projects";
import skills from "../data/skills";

function DeveloperDetails() {
  const { developerId } = useParams();

  const developer = developers.find(
    (item) => item.id === developerId
  );

  // Developer not found
  if (!developer) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Developer Not Found
        </h1>

        <Link
          to="/developers"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Developers
        </Link>
      </div>
    );
  }

  // Get this developer's assignments
  const developerAssignments = assignments.filter(
    (assignment) =>
      assignment.developerId === developer.id &&
      assignment.status !== "DECLINED"
  );

  // Connect assignments to projects
  const developerProjects = developerAssignments
    .map((assignment) => {
      const project = projects.find(
        (project) => project.id === assignment.projectId
      );

      return {
        ...assignment,
        project,
      };
    })
    .filter((assignment) => assignment.project);

  // Calculate allocation
  const totalAllocation = developerAssignments.reduce(
    (total, assignment) => total + assignment.allocation,
    0
  );

  const availableCapacity = Math.max(
    0,
    100 - totalAllocation
  );

  // Temporary skill relationship
  // We will improve developers.js later with skillIds.
  const developerSkills = skills.filter((skill) =>
    ["React", "JavaScript", "Redux"].includes(skill.name)
  );

  return (
    <div className="space-y-6">

      {/* Back */}
      <Link
        to="/developers"
        className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        ← Back to Developers
      </Link>

      {/* Profile */}
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

          <Avatar
            name={developer.name}
            size="lg"
          />

          <div className="min-w-0 flex-1">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <h1 className="text-2xl font-bold text-slate-900">
                {developer.name}
              </h1>

              <div>
                <Badge status={developer.status} />
              </div>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {developer.role}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {developer.email}
            </p>

          </div>
        </div>
      </Card>

      {/* Allocation */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        <Card>
          <p className="text-sm text-slate-500">
            Total Allocation
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {totalAllocation}%
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{
                width: `${Math.min(totalAllocation, 100)}%`,
              }}
            />
          </div>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">
            Available Capacity
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {availableCapacity}%
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{
                width: `${availableCapacity}%`,
              }}
            />
          </div>
        </Card>

      </div>

      {/* Skills + Projects */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Skills */}
        <Card>

          <h2 className="text-base font-semibold text-slate-900">
            Skills
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Developer capabilities
          </p>

          <div className="mt-4 flex flex-wrap gap-2">

            {developerSkills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
              >
                {skill.name}
              </span>
            ))}

          </div>

        </Card>

        {/* Projects */}
        <Card className="lg:col-span-2">

          <h2 className="text-base font-semibold text-slate-900">
            Current Projects
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Projects assigned to this developer
          </p>

          <div className="mt-4 space-y-4">

            {developerProjects.length > 0 ? (
              developerProjects.map((assignment) => (
                <div
                  key={assignment.id}
                  className="rounded-lg border border-slate-200 p-4"
                >

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="min-w-0">

                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {assignment.project.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {assignment.startDate} →{" "}
                        {assignment.endDate}
                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <span className="text-sm font-semibold text-slate-900">
                        {assignment.allocation}%
                      </span>

                      <Badge status={assignment.status} />

                    </div>

                  </div>

                </div>
              ))
            ) : (
              <p className="py-4 text-sm text-slate-500">
                No current projects assigned.
              </p>
            )}

          </div>

        </Card>

      </div>

    </div>
  );
}

export default DeveloperDetails;