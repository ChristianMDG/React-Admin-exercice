import {
  Show,
  TextField,
  NumberField,
  BooleanField,
  EmailField,
  TopToolbar,
  ListButton,
  EditButton,
  useRecordContext,
} from "react-admin";
import InternsByManager from "../interns/InternsByManager";
import DepartmentStats from "../DepartmentStats";

const EmployeeShowActions = () => (
  <TopToolbar
    sx={{
      "& .MuiButtonBase-root": {
        background: "#07070F",
        borderRadius: "10px",
        padding: "8px 16px",
        textTransform: "none",
        fontSize: "13px",
        fontWeight: 600,
        color: "#534AB7",
        border: "1px solid rgba(83, 74, 183, 0.3)",
        transition: "all 0.2s ease",
        "&:hover": {
          background: "#151525",
          borderColor: "#534AB7",
          transform: "translateY(-1px)",
        },
      },
    }}
  >
    <ListButton label="Return to list" />
    <EditButton />
  </TopToolbar>
);

const EmployeeDetail = () => {
  const record = useRecordContext();

  if (!record) return null;

  const getInitials = (first: string, last: string) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: "#06060C",
      }}
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          background: "#0B0B14",
          border: "1px solid rgba(83, 74, 183, 0.15)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #534AB7, #1D9E75)",
                }}
              >
                <span
                  className="text-xl font-bold text-white"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                >
                  {getInitials(record.firstname, record.lastname)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
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
                    EMPLOYEE PROFILE
                  </span>
                </div>
                <h1
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: "#EAEAFF" }}
                >
                  {record.firstname} {record.lastname}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <i
                    className="ti ti-mail text-[11px]"
                    style={{ color: "#5A5A7A" }}
                  />
                  <p className="text-xs" style={{ color: "#5A5A7A" }}>
                    {record.email}
                  </p>
                </div>
              </div>
            </div>
            <EmployeeShowActions />
          </div>

          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg, #534AB7, #1D9E75, #D85A30, transparent)",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div
              className="rounded-xl p-5 transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: "#07070F",
                border: "1px solid rgba(83, 74, 183, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#534AB7" }}
                />
                <span
                  className="text-[10px] font-mono tracking-[0.1em]"
                  style={{ color: "#534AB7" }}
                >
                  PERSONAL INFORMATION
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(83, 74, 183, 0.15)" }}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 text-center">
                    <i
                      className="ti ti-user text-sm"
                      style={{ color: "#534AB7" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: "#5A5A7A" }}
                    >
                      Full Name
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "#D0D0EC" }}
                    >
                      {record.firstname} {record.lastname}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 text-center">
                    <i
                      className="ti ti-id text-sm"
                      style={{ color: "#534AB7" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: "#5A5A7A" }}
                    >
                      Employee ID
                    </div>
                    <div
                      className="text-sm font-mono"
                      style={{ color: "#D0D0EC" }}
                    >
                      #{record.id}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 text-center">
                    <i
                      className="ti ti-mail text-sm"
                      style={{ color: "#534AB7" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: "#5A5A7A" }}
                    >
                      Email Address
                    </div>
                    <a
                      href={`mailto:${record.email}`}
                      className="text-sm font-medium hover:underline transition-all"
                      style={{ color: "#1D9E75", textDecoration: "none" }}
                    >
                      {record.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-5 transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: "#07070F",
                border: "1px solid rgba(83, 74, 183, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#1D9E75" }}
                />
                <span
                  className="text-[10px] font-mono tracking-[0.1em]"
                  style={{ color: "#1D9E75" }}
                >
                  PROFESSIONAL INFORMATION
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(29, 158, 117, 0.15)" }}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 text-center">
                    <i
                      className="ti ti-building text-sm"
                      style={{ color: "#1D9E75" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: "#5A5A7A" }}
                    >
                      Department
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "#D0D0EC" }}
                    >
                      {record.department}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 text-center">
                    <i
                      className="ti ti-chart-bar text-sm"
                      style={{ color: "#1D9E75" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: "#5A5A7A" }}
                    >
                      Salary
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{ color: "#1D9E75" }}
                    >
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      }).format(record.salary)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 text-center">
                    <i
                      className="ti ti-checklist text-sm"
                      style={{ color: "#1D9E75" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: "#5A5A7A" }}
                    >
                      Status
                    </div>
                    {record.active ? (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                        style={{
                          background: "rgba(29, 158, 117, 0.15)",
                          color: "#1D9E75",
                          border: "1px solid rgba(29, 158, 117, 0.3)",
                        }}
                      >
                        <i className="ti ti-circle-check text-[9px]" />
                        Active
                      </span>
                    ) : (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                        style={{
                          background: "rgba(216, 90, 48, 0.15)",
                          color: "#D85A30",
                          border: "1px solid rgba(216, 90, 48, 0.3)",
                        }}
                      >
                        <i className="ti ti-circle-x text-[9px]" />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <InternsByManager />
          </div>

          <div className="mt-5">
            <DepartmentStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmployeeShow = () => (
  <Show>
    <EmployeeDetail />
  </Show>
);
