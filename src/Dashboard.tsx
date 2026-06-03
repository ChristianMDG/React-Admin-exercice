import { useGetList } from "react-admin";
import { useEffect, useState } from "react";

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
    className="group relative overflow-hidden rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.01]"
    style={{
      background: "#0B0B14",
      border: "1px solid rgba(83, 74, 183, 0.15)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    }}
  >
    <div
      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
      style={{ background: accent }}
    />

    <div className="relative flex items-center justify-between">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
        style={{
          background: `${accent}15`,
          color: accent,
        }}
      >
        <i className={`ti ti-${icon}`} aria-hidden="true" />
      </div>
      <span
        className="text-[10px] px-2.5 py-1 rounded-full font-mono"
        style={{
          background: `${accent}10`,
          color: accent,
          border: `1px solid ${accent}30`,
          letterSpacing: "0.05em",
        }}
      >
        {badge}
      </span>
    </div>

    <div className="relative">
      <p
        className="text-[10px] uppercase mb-1.5 font-mono tracking-wider"
        style={{ color: "#5A5A7A" }}
      >
        {label}
      </p>
      {loading ? (
        <div
          className="h-9 w-20 rounded-lg animate-pulse"
          style={{ background: "#151525" }}
        />
      ) : (
        <>
          <p
            className="text-3xl font-bold tracking-tight"
            style={{ color: "#EAEAFF" }}
          >
            {value?.toLocaleString() ?? 0}
          </p>
          <p className="text-[10px] mt-2" style={{ color: "#5A5A7A" }}>
            {sub}
          </p>
        </>
      )}
    </div>

    <div
      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
      style={{ background: accent }}
    />
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
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(Math.min(100, rate)), 100);
  }, [rate]);

  return (
    <div
      className="rounded-xl p-6 transition-all duration-300 hover:scale-[1.005]"
      style={{
        background: "#0B0B14",
        border: "1px solid rgba(83, 74, 183, 0.15)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: `${accent}15`,
              color: accent,
            }}
          >
            <i className={`ti ti-${icon} text-base`} aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold" style={{ color: "#D0D0EC" }}>
            {title}
          </span>
        </div>
        <div
          className="px-2.5 py-1 rounded-full font-mono text-xs font-bold"
          style={{
            background: `${accent}15`,
            color: accent,
            border: `1px solid ${accent}30`,
          }}
        >
          {rate.toFixed(1)}%
        </div>
      </div>

      <div className="relative mb-6">
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: "#151525" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: accent,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-lg p-3"
          style={{
            background: "#07070F",
            border: "1px solid rgba(83, 74, 183, 0.1)",
          }}
        >
          <p
            className="text-[9px] uppercase mb-1.5 font-mono tracking-wider"
            style={{ color: "#5A5A7A" }}
          >
            {left.label}
          </p>
          <p className="text-xl font-bold" style={{ color: leftColor }}>
            {left.value.toLocaleString()}
          </p>
        </div>
        <div
          className="rounded-lg p-3"
          style={{
            background: "#07070F",
            border: "1px solid rgba(83, 74, 183, 0.1)",
          }}
        >
          <p
            className="text-[9px] uppercase mb-1.5 font-mono tracking-wider"
            style={{ color: "#5A5A7A" }}
          >
            {right.label}
          </p>
          <p className="text-xl font-bold" style={{ color: rightColor }}>
            {right.value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

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
    <div
      className="min-h-screen p-8"
      style={{
        background: "#06060C",
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #534AB7, #1D9E75)",
              }}
            >
              <i className="ti ti-chart-infographic text-white text-base" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#534AB7" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#1D9E75" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#D85A30" }}
                  />
                </div>
                <span
                  className="text-[10px] font-mono tracking-[0.15em]"
                  style={{ color: "#534AB7" }}
                >
                  HR COMMAND CENTER
                </span>
              </div>
              <h1
                className="text-2xl font-bold tracking-tight mt-1"
                style={{ color: "#EAEAFF" }}
              >
                Workforce Intelligence
              </h1>
              <p className="text-sm mt-0.5" style={{ color: "#5A5A7A" }}>
                Real-time analytics & insights
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href="#/employees/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold no-underline transition-all duration-200 hover:opacity-80"
            style={{
              background: "#0F0F1A",
              border: "1px solid #534AB7",
              color: "#534AB7",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <i className="ti ti-user-plus" aria-hidden="true" />
            New Employee
          </a>
          <a
            href="#/interns/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold no-underline transition-all duration-200 hover:opacity-80"
            style={{
              background: "#0F1A14",
              border: "1px solid #1D9E75",
              color: "#1D9E75",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <i className="ti ti-school" aria-hidden="true" />
            New Intern
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total employees"
          value={totalEmployees}
          loading={loadingTotalEmp}
          icon="users"
          accent="#534AB7"
          badge="+12%"
          sub="vs last quarter"
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
          badge="Q4 2024"
          sub="All programs"
        />
        <StatCard
          label="Remunerated interns"
          value={remuneratedInterns}
          loading={loadingRemunerated}
          icon="coin"
          accent="#D85A30"
          badge="Paid"
          sub="Stipend active"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <ProgressCard
          title="Employee Activity Rate"
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
          title="Internship Program"
          icon="report-money"
          rate={remunerationRate}
          accent="#1D9E75"
          left={{ label: "Remunerated", value: remuneratedInterns ?? 0 }}
          right={{
            label: "Non-remunerated",
            value: (totalInterns ?? 0) - (remuneratedInterns ?? 0),
          }}
          leftColor="#1D9E75"
          rightColor="#5A5A7A"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            href: "#/employees",
            icon: "users-group",
            accent: "#534AB7",
            bg: "#0F0F1A",
            title: "Employee Directory",
            sub: "View, manage and analyze your team",
          },
          {
            href: "#/interns",
            icon: "certificate",
            accent: "#1D9E75",
            bg: "#0F1A14",
            title: "Internship Program",
            sub: "Track progress and manage interns",
          },
        ].map((lk) => (
          <a
            key={lk.href}
            href={lk.href}
            className="group flex items-center justify-between rounded-xl p-4 no-underline transition-all duration-200 hover:scale-[1.01]"
            style={{
              background: "#0B0B14",
              border: "1px solid rgba(83, 74, 183, 0.15)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{ background: lk.bg, color: lk.accent }}
              >
                <i className={`ti ti-${lk.icon}`} aria-hidden="true" />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#D0D0EC" }}
                >
                  {lk.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#5A5A7A" }}>
                  {lk.sub}
                </p>
              </div>
            </div>
            <i
              className="ti ti-arrow-right text-base transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ color: lk.accent }}
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
