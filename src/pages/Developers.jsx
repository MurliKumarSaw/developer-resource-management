import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/layout/common/Card";
import Avatar from "../components/layout/common/Avatar";
import Badge from "../components/layout/common/Badge";

import developers from "../data/developers";

function Developers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
const assignments = useSelector(
  (state) => state.assignments
);
const getDeveloperAllocation = (developerId) => {
  return assignments
    .filter(
      (assignment) =>
        assignment.developerId === developerId &&
        assignment.status !== "DECLINED"
    )
    .reduce(
      (total, assignment) =>
        total + Number(assignment.allocation),
      0
    );
};

const getDeveloperStatus = (allocation) => {
  if (allocation >= 100) {
    return "FULLY_ASSIGNED";
  }

  if (allocation > 0) {
    return "PARTIALLY_ASSIGNED";
  }

  return "AVAILABLE";
};const filteredDevelopers = developers.filter((developer) => {
  const allocation = getDeveloperAllocation(developer.id);
  const status = getDeveloperStatus(allocation);

  const matchesSearch =
    developer.name.toLowerCase().includes(search.toLowerCase()) ||
    developer.role.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "ALL" ||
    status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Developers
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage developer resources and availability.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Search */}
          <div>
            <label
              htmlFor="developer-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search
            </label>

            <input
              id="developer-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or role..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status-filter"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="ALL">All Statuses</option>
              <option value="AVAILABLE">Available</option>
              <option value="PARTIALLY_ASSIGNED">
                Partially Assigned
              </option>
              <option value="FULLY_ASSIGNED">
                Fully Assigned
              </option>
            </select>
          </div>

        </div>
      </Card>

      {/* Developer List */}
      <Card className="overflow-hidden p-0">

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Developer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Role
                </th>
<th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
  Allocation
</th>

<th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
  Availability
</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredDevelopers.map((developer) => (
                <tr
                  key={developer.id}
                  className="transition hover:bg-slate-50"
                >
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
                          {developer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {developer.role}
                  </td>
<td className="px-5 py-4 text-right text-sm font-medium text-slate-700">
  {getDeveloperAllocation(developer.id)}%
</td>

<td className="px-5 py-4 text-right text-sm font-medium text-slate-700">
  {Math.max(
    0,
    100 - getDeveloperAllocation(developer.id)
  )}%
</td>
                  <td className="px-5 py-4">
                   <Badge
  status={getDeveloperStatus(
    getDeveloperAllocation(developer.id)
  )}
/>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link to={`/developers/${developer.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
  View
</Link>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {filteredDevelopers.map((developer) => (
            <div
              key={developer.id}
              className="p-4"
            >
              <div className="flex items-start gap-3">
                <Avatar
                  name={developer.name}
                  size="md"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {developer.name}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {developer.role}
                      </p>
                    </div>

                    <Badge status={developer.status} />
                  </div>

                  <p className="mt-2 truncate text-xs text-slate-500">
                    {developer.email}
                  </p>

                  <a
                    href={`/developers/${developer.id}`}
                    className="mt-3 inline-block text-sm font-medium text-indigo-600"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDevelopers.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-slate-900">
              No developers found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        )}

      </Card>

      {/* Result Count */}
      <p className="text-sm text-slate-500">
        Showing {filteredDevelopers.length} of {developers.length} developers
      </p>

    </div>
  );
}

export default Developers;