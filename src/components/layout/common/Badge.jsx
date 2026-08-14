const badgeStyles = {
  AVAILABLE: "bg-emerald-50 text-emerald-700",
  PARTIALLY_ASSIGNED: "bg-amber-50 text-amber-700",
  FULLY_ASSIGNED: "bg-red-50 text-red-700",

  PENDING: "bg-amber-50 text-amber-700",
  ACCEPTED: "bg-emerald-50 text-emerald-700",
  DECLINED: "bg-red-50 text-red-700",
  COMPLETED: "bg-blue-50 text-blue-700",

  PLANNING: "bg-slate-100 text-slate-700",
  ACTIVE: "bg-blue-50 text-blue-700",
  CANCELLED: "bg-red-50 text-red-700",
};

function Badge({ status }) {
  const style =
    badgeStyles[status] || "bg-slate-100 text-slate-700";

  const label = status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style}`}
    >
      {label}
    </span>
  );
}

export default Badge;