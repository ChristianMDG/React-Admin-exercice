import { useGetList } from "react-admin";

const StatCard = ({
  label,
  value,
  loading,
  icon,
  accent,
  badge,
  sub,
}: {
  label: string;
  value: number | undefined;
  loading: boolean;
  icon: string;
  accent: string;
  badge: string;
  sub: string;
}) => (
  <div
    className="relative overflow-hidden rounded-xl p-4 flex flex-col gap-3"
    style={{ background: "#0e0e1c", border: "1px solid #1e1e3a" }}
  >
    <div
      className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
      style={{ background: accent }}
    />
    <div className="flex items-center justify-between">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
        style={{ background: accent + "22", color: accent }}
      >
        <i className={`ti ti-${icon}`} aria-hidden="true" />
      </div>
      <span
        className="text-[10px] px-2 py-0.5 rounded-full"
        style={{
          background: accent + "15",
          color: accent,
          border: `1px solid ${accent}40`,
          letterSpacing: "0.05em",
        }}
      >
        {badge}
      </span>
    </div>
    <div>
      <p
        className="text-[10px] uppercase mb-1"
        style={{ color: "#444460", letterSpacing: "0.08em" }}
      >
        {label}
      </p>
      {loading ? (
        <div
          className="h-8 w-12 rounded animate-pulse"
          style={{ background: "#1a1a2e" }}
        />
      ) : (
        <p
          className="text-3xl font-medium leading-none"
          style={{ color: "#e0e0f0" }}
        >
          {value ?? 0}
        </p>
      )}
      <p className="text-[11px] mt-1.5" style={{ color: "#333350" }}>
        {sub}
      </p>
    </div>
  </div>
);

const ProgressCard = ({
  title,
  icon,
  rate,
  accent,
  left,
  right,
  leftColor,
  rightColor,
}: {
  title: string;
  icon: string;
  rate: number;
  accent: string;
  left: { label: string; value: number };
  right: { label: string; value: number };
  leftColor: string;
  rightColor: string;
}) => (
  <div
    className="rounded-xl p-5"
    style={{ background: "#0e0e1c", border: "1px solid #1e1e3a" }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2" style={{ color: "#a0a0c0" }}>
        <i
          className={`ti ti-${icon} text-base`}
          style={{ color: accent }}
          aria-hidden="true"
        />
        <span
          className="text-[13px] font-medium"
          style={{ letterSpacing: "0.03em" }}
        >
          {title}
        </span>
      </div>
      <span
        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
        style={{
          background: accent + "15",
          color: accent,
          border: `1px solid ${accent}40`,
        }}
      >
        {rate.toFixed(1)}%
      </span>
    </div>

    <div
      className="w-full h-1 rounded-full overflow-hidden mb-5"
      style={{ background: "#1a1a2e" }}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(100, rate)}%`, background: accent }}
      />
    </div>

    <div className="grid grid-cols-2 gap-2">
      <div
        className="rounded-lg p-3"
        style={{ background: "#0a0a18", border: "1px solid #1a1a30" }}
      >
        <p
          className="text-[10px] uppercase mb-1"
          style={{ color: "#444460", letterSpacing: "0.07em" }}
        >
          {left.label}
        </p>
        <p className="text-xl font-medium" style={{ color: leftColor }}>
          {left.value}
        </p>
      </div>
      <div
        className="rounded-lg p-3"
        style={{ background: "#0a0a18", border: "1px solid #1a1a30" }}
      >
        <p
          className="text-[10px] uppercase mb-1"
          style={{ color: "#444460", letterSpacing: "0.07em" }}
        >
          {right.label}
        </p>
        <p className="text-xl font-medium" style={{ color: rightColor }}>
          {right.value}
        </p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { total: totalEmployees, isLoading: loadingTotalEmp } = useGetList(
    "employees",
    { pagination: { page: 1, perPage: 1 } },
  );
  const { total: activeEmployees, isLoading: loadingActiveEmp } = useGetList(
    "employees",
    { filter: { active: true }, pagination: { page: 1, perPage: 1 } },
  );
  const { total: totalInterns, isLoading: loadingTotalInt } = useGetList(
    "interns",
    { pagination: { page: 1, perPage: 1 } },
  );
  const { total: remuneratedInterns, isLoading: loadingRemunerated } =
    useGetList("interns", {
      filter: { isRemunerated: true },
      pagination: { page: 1, perPage: 1 },
    });

  const activityRate = totalEmployees
    ? ((activeEmployees || 0) / (totalEmployees || 1)) * 100
    : 0;
  const remunerationRate = totalInterns
    ? ((remuneratedInterns || 0) / (totalInterns || 1)) * 100
    : 0;

  return (
    <div className="min-h-screen p-6" style={{ background: "#0a0a12" }}>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#534AB7" }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#1D9E75" }}
            />
            <span
              className="text-[10px] uppercase"
              style={{ color: "#534AB7", letterSpacing: "0.15em" }}
            >
              HR Command Center
            </span>
          </div>
          <h1
            className="text-lg font-medium"
            style={{ color: "#e8e8f4", letterSpacing: "0.02em" }}
          >
            Workforce intelligence
          </h1>
        </div>
        <div className="flex gap-2">
          <a
            href="#/employees/create"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium no-underline transition-opacity hover:opacity-80"
            style={{
              background: "#1a1630",
              border: "1px solid #534AB7",
              color: "#AFA9EC",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <i className="ti ti-user-plus" aria-hidden="true" /> New employee
          </a>
          <a
            href="#/interns/create"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium no-underline transition-opacity hover:opacity-80"
            style={{
              background: "#0a1a14",
              border: "1px solid #1D9E75",
              color: "#5DCAA5",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <i className="ti ti-school" aria-hidden="true" /> New intern
          </a>
        </div>
      </div>

      {/* Status ticker */}
      <div
        className="flex items-center gap-4 px-3 py-2 rounded-lg mb-5 flex-wrap"
        style={{ background: "#0e0e1c", border: "1px solid #1e1e3a" }}
      >
        <span
          className="text-[10px] uppercase flex-shrink-0"
          style={{ color: "#534AB7", letterSpacing: "0.12em" }}
        >
          Live
        </span>
        {[
          { dot: "#534AB7", text: "System nominal" },
          { dot: "#1D9E75", text: "Data synced" },
          { dot: "#BA7517", text: "Last update: today" },
        ].map((item) => (
          <span
            key={item.text}
            className="text-[11px] flex items-center gap-1.5"
            style={{ color: "#555570" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: item.dot }}
            />
            {item.text}
          </span>
        ))}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        <StatCard
          label="Total employees"
          value={totalEmployees}
          loading={loadingTotalEmp}
          icon="users"
          accent="#534AB7"
          badge="+2 this month"
          sub="Across all departments"
        />
        <StatCard
          label="Active employees"
          value={activeEmployees}
          loading={loadingActiveEmp}
          icon="user-check"
          accent="#1D9E75"
          badge="Active"
          sub="Currently on-board"
        />
        <StatCard
          label="Total interns"
          value={totalInterns}
          loading={loadingTotalInt}
          icon="school"
          accent="#BA7517"
          badge="Interns"
          sub="All programs"
        />
        <StatCard
          label="Remunerated"
          value={remuneratedInterns}
          loading={loadingRemunerated}
          icon="coin"
          accent="#D85A30"
          badge="Paid"
          sub="Stipend active"
        />
      </div>

      {/* Progress cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ProgressCard
          title="Employee activity"
          icon="chart-bar"
          rate={activityRate}
          accent="#534AB7"
          left={{ label: "Active", value: activeEmployees ?? 0 }}
          right={{
            label: "Inactive",
            value: (totalEmployees ?? 0) - (activeEmployees ?? 0),
          }}
          leftColor="#1D9E75"
          rightColor="#D85A30"
        />
        <ProgressCard
          title="Internship program"
          icon="report-money"
          rate={remunerationRate}
          accent="#1D9E75"
          left={{ label: "Remunerated", value: remuneratedInterns ?? 0 }}
          right={{
            label: "Non-remunerated",
            value: (totalInterns ?? 0) - (remuneratedInterns ?? 0),
          }}
          leftColor="#1D9E75"
          rightColor="#5F5E5A"
        />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            href: "#/employees",
            icon: "users",
            accent: "#534AB7",
            bg: "#1a1630",
            title: "Manage employees",
            sub: "View, edit and manage your team",
          },
          {
            href: "#/interns",
            icon: "school",
            accent: "#1D9E75",
            bg: "#0a1a14",
            title: "Manage interns",
            sub: "View, edit and manage internships",
          },
        ].map((lk) => (
          <a
            key={lk.href}
            href={lk.href}
            className="flex items-center justify-between rounded-xl p-4 no-underline transition-all"
            style={{
              background: "#0e0e1c",
              border: "1px solid #1e1e3a",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                lk.accent + "80")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "#1e1e3a")
            }
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                style={{ background: lk.bg, color: lk.accent }}
              >
                <i className={`ti ti-${lk.icon}`} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#c0c0dc" }}>
                  {lk.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#444460" }}>
                  {lk.sub}
                </p>
              </div>
            </div>
            <i
              className="ti ti-arrow-right text-base"
              style={{ color: "#333350" }}
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
