import {
  Show,
  TextField,
  EmailField,
  BooleanField,
  NumberField,
  ReferenceField,
  useRecordContext,
} from "react-admin";
import ManagerCard from "./ManagerCard";

const InternDetail = () => {
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
          <div className="flex items-center gap-4 mb-4">
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
                {getInitials(record.first_name, record.last_name)}
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
                  INTERN PROFILE
                </span>
              </div>
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ color: "#EAEAFF" }}
              >
                {record.first_name} {record.last_name}
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
                      {record.first_name} {record.last_name}
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
                      Intern ID
                    </div>
                    <div
                      className="text-sm font-mono"
                      style={{ color: "#D0D0EC" }}
                    >
                      #{record.id}
                    </div>
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
                      className="ti ti-user-check text-sm"
                      style={{ color: "#1D9E75" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: "#5A5A7A" }}
                    >
                      Manager
                    </div>
                    {record.managerId ? (
                      <ReferenceField
                        source="managerId"
                        reference="employees"
                        link="show"
                        record={record}
                      >
                        <div className="flex items-center gap-1">
                          <i
                            className="ti ti-user text-[11px]"
                            style={{ color: "#1D9E75" }}
                          />
                          <span
                            className="text-sm font-medium hover:underline transition-all"
                            style={{ color: "#1D9E75", cursor: "pointer" }}
                          >
                            <TextField source="firstname" />{" "}
                            <TextField source="lastname" />
                          </span>
                        </div>
                      </ReferenceField>
                    ) : (
                      <div className="flex items-center gap-1">
                        <i
                          className="ti ti-user-off text-[11px]"
                          style={{ color: "#D85A30" }}
                        />
                        <span className="text-sm" style={{ color: "#5A5A7A" }}>
                          Not assigned
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-5 transition-all duration-200 hover:scale-[1.01] lg:col-span-2"
              style={{
                background: "#07070F",
                border: "1px solid rgba(83, 74, 183, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#BA7517" }}
                />
                <span
                  className="text-[10px] font-mono tracking-[0.1em]"
                  style={{ color: "#BA7517" }}
                >
                  COMPENSATION
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(186, 117, 23, 0.15)" }}
                />
              </div>

              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: record.isRemunerated
                        ? "rgba(29, 158, 117, 0.15)"
                        : "rgba(90, 90, 122, 0.15)",
                    }}
                  >
                    <i
                      className="ti ti-coin text-xl"
                      style={{
                        color: record.isRemunerated ? "#1D9E75" : "#5A5A7A",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{ color: "#5A5A7A" }}
                    >
                      Status
                    </div>
                    {record.isRemunerated ? (
                      <span
                        className="text-sm px-3 py-1 rounded-full inline-flex items-center gap-1.5"
                        style={{
                          background: "rgba(29, 158, 117, 0.15)",
                          color: "#1D9E75",
                          border: "1px solid rgba(29, 158, 117, 0.3)",
                        }}
                      >
                        <i className="ti ti-circle-check text-[11px]" />
                        Remunerated
                      </span>
                    ) : (
                      <span
                        className="text-sm px-3 py-1 rounded-full inline-flex items-center gap-1.5"
                        style={{
                          background: "rgba(90, 90, 122, 0.15)",
                          color: "#5A5A7A",
                          border: "1px solid rgba(90, 90, 122, 0.3)",
                        }}
                      >
                        <i className="ti ti-circle-x text-[11px]" />
                        Non-remunerated
                      </span>
                    )}
                  </div>
                </div>

                {record.isRemunerated && record.remuneration && (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{
                        background: "rgba(83, 74, 183, 0.15)",
                      }}
                    >
                      <i
                        className="ti ti-chart-bar text-xl"
                        style={{ color: "#534AB7" }}
                      />
                    </div>
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-wider mb-1"
                        style={{ color: "#5A5A7A" }}
                      >
                        Monthly Remuneration
                      </div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "#1D9E75" }}
                      >
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(record.remuneration)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <ManagerCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export const InternShow = () => (
  <Show>
    <InternDetail />
  </Show>
);