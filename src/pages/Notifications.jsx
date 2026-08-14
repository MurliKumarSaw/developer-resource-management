import { useSelector, useDispatch } from "react-redux";

import Card from "../components/layout/common/Card";
import Avatar from "../components/layout/common/Avatar";
import Badge from "../components/layout/common/Badge";

import developers from "../data/developers";
import projects from "../data/projects";

import {
  updateAssignmentStatus,
} from "../store/slices/assignmentsSlice.js";

function Notifications() {
  const dispatch = useDispatch();

  const assignments = useSelector(
    (state) => state.assignments
  );

  console.log("Redux assignments:", assignments);

  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "PENDING"
  );

  console.log(
    "Pending assignments:",
    pendingAssignments
  );

  const getDeveloper = (developerId) =>
    developers.find(
      (developer) => developer.id === developerId
    );

  const getProject = (projectId) =>
    projects.find(
      (project) => project.id === projectId
    );

  const handleAction = (assignmentId, action) => {
    const newStatus =
      action === "accept"
        ? "ACCEPTED"
        : "DECLINED";

    dispatch(
      updateAssignmentStatus({
        assignmentId,
        status: newStatus,
      })
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Notifications
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review your latest resource assignment notifications.
        </p>
      </div>

      {/* Notifications */}
      <Card className="overflow-hidden p-0">

        {pendingAssignments.length > 0 ? (
          <div className="divide-y divide-slate-100">

            {pendingAssignments.map((assignment) => {
              const developer = getDeveloper(
                assignment.developerId
              );

              const project = getProject(
                assignment.projectId
              );

              if (!developer || !project) {
                return null;
              }

              return (
                <div
                  key={assignment.id}
                  className="bg-indigo-50/40 p-4 sm:p-5"
                >

                  <div className="flex items-start gap-3">

                    <Avatar
                      name={developer.name}
                      size="sm"
                    />

                    <div className="min-w-0 flex-1">

                      {/* Notification Header */}
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            New Project Assignment
                          </p>

                          <p className="mt-1 text-sm text-slate-600">
                            You have been assigned to{" "}
                            <span className="font-medium text-slate-900">
                              {project.name}
                            </span>
                          </p>
                        </div>

                        <span className="w-fit rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700">
                          New
                        </span>

                      </div>

                      {/* Assignment Details */}
                      <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-white p-3 text-sm sm:max-w-xl sm:grid-cols-4">

                        <div>
                          <p className="text-xs text-slate-500">
                            Developer
                          </p>

                          <p className="mt-1 font-medium text-slate-900">
                            {developer.name}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">
                            Project
                          </p>

                          <p className="mt-1 truncate font-medium text-slate-900">
                            {project.name}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">
                            Allocation
                          </p>

                          <p className="mt-1 font-medium text-slate-900">
                            {assignment.allocation}%
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">
                            Status
                          </p>

                          <div className="mt-1">
                            <Badge status={assignment.status} />
                          </div>
                        </div>

                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">

                        <button
                          type="button"
                          onClick={() =>
                            handleAction(
                              assignment.id,
                              "accept"
                            )
                          }
                          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                        >
                          Accept Assignment
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleAction(
                              assignment.id,
                              "decline"
                            )
                          }
                          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          Decline
                        </button>

                      </div>

                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-slate-900">
              No pending notifications
            </p>

            <p className="mt-1 text-sm text-slate-500">
              You're all caught up.
            </p>
          </div>
        )}

      </Card>

    </div>
  );
}

export default Notifications;