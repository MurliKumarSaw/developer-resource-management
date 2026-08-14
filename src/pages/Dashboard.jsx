import Card from "../components/layout/common/Card";
import Avatar from "../components/layout/common/Avatar";
import Badge from "../components/layout/common/Badge";

import developers from "../data/developers";
import assignments from "../data/assignments";
import projects from "../data/projects";

function Dashboard() {
  // -----------------------------
  // Developer statistics
  // -----------------------------

  const totalDevelopers = developers.length;

  const availableDevelopers = developers.filter(
    (developer) => developer.status === "AVAILABLE"
  ).length;

  const fullyAssignedDevelopers = developers.filter(
    (developer) => developer.status === "FULLY_ASSIGNED"
  ).length;

  const partiallyAssignedDevelopers = developers.filter(
    (developer) => developer.status === "PARTIALLY_ASSIGNED"
  ).length;

  // -----------------------------
  // Resource utilization
  // -----------------------------

  const acceptedAssignments = assignments.filter(
    (assignment) => assignment.status === "ACCEPTED"
  );

  const totalAllocation = acceptedAssignments.reduce(
    (total, assignment) => total + assignment.allocation,
    0
  );

  const averageUtilization =
    totalDevelopers > 0
      ? Math.round(totalAllocation / totalDevelopers)
      : 0;

  // -----------------------------
  // Recent assignments
  // -----------------------------

  const recentAssignments = assignments
    .filter((assignment) => assignment.status !== "DECLINED")
    .slice(-5)
    .reverse()
    .map((assignment) => {
      const developer = developers.find(
        (developer) => developer.id === assignment.developerId
      );

      const project = projects.find(
        (project) => project.id === assignment.projectId
      );

      return {
        ...assignment,
        developer,
        project,
      };
    });

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your developer resources and allocations.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <Card>
          <p className="text-sm text-slate-500">
            Total Developers
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {totalDevelopers}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">
            Available
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {availableDevelopers}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">
            Fully Assigned
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {fullyAssignedDevelopers}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">
            Partially Assigned
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-600">
            {partiallyAssignedDevelopers}
          </p>
        </Card>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Resource Utilization */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Resource Utilization
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Average developer allocation
              </p>
            </div>

            <span className="text-2xl font-bold text-indigo-600">
              {averageUtilization}%
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${averageUtilization}%` }}
            />
          </div>
        </Card>

        {/* Recent Assignments */}
        <Card>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Recent Assignments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest developer assignments
            </p>
          </div>

          <div className="mt-5 space-y-4">

            {recentAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center gap-3"
              >
                <Avatar
                  name={assignment.developer.name}
                  size="sm"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {assignment.developer.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {assignment.project.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {assignment.allocation}%
                  </p>

                  <Badge status={assignment.status} />
                </div>
              </div>
            ))}

          </div>
        </Card>

      </div>
    </div>
  );
}

export default Dashboard;