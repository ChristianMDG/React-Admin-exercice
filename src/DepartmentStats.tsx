import { useRecordContext, useGetList } from "react-admin";

const DepartmentStats = () => {
  const employee = useRecordContext();

  const { total, isLoading } = useGetList("employees", {
    filter: {
      department: employee?.department,
      active: true,
    },
    pagination: { page: 1, perPage: 1 },
    enabled: !!employee?.department,
  });

  if (!employee?.department) return null;

  if (isLoading) {
    return (
      <div
        className="rounded-xl p-4 mt-4"
        style={{
          background: "#07070F",
          border: "1px solid rgba(83, 74, 183, 0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-full animate-spin"
            style={{
              border: "2px solid rgba(83, 74, 183, 0.2)",
              borderTopColor: "#534AB7",
            }}
          />
          <p className="text-sm" style={{ color: "#5A5A7A" }}>
            Loading department statistics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl overflow-hidden mt-4 transition-all duration-200 hover:scale-[1.01]"
      style={{
        background: "#07070F",
        border: "1px solid rgba(29, 158, 117, 0.2)",
      }}
    >
      <div
        className="px-5 py-3"
        style={{
          background:
            "linear-gradient(135deg, rgba(29, 158, 117, 0.1), rgba(83, 74, 183, 0.05))",
          borderBottom: "1px solid rgba(29, 158, 117, 0.15)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#1D9E75" }}
          />
          <span
            className="text-[10px] font-mono tracking-[0.1em]"
            style={{ color: "#1D9E75" }}
          >
            DEPARTMENT INSIGHTS
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(29, 158, 117, 0.15)" }}
          />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(29, 158, 117, 0.15)",
            }}
          >
            <i
              className="ti ti-users-group text-xl"
              style={{ color: "#1D9E75" }}
            />
          </div>
          <div>
            <p className="text-xs font-mono mb-1" style={{ color: "#5A5A7A" }}>
              ACTIVE COWORKERS
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold" style={{ color: "#1D9E75" }}>
                {total || 0}
              </span>
              <span className="text-sm" style={{ color: "#5A5A7A" }}>
                in{" "}
                <strong style={{ color: "#EAEAFF" }}>
                  {employee.department}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        i < Math.min(5, Math.ceil((total || 0) / 2))
                          ? "#1D9E75"
                          : "rgba(90, 90, 122, 0.3)",
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px]" style={{ color: "#5A5A7A" }}>
                {total === 0
                  ? "No coworkers yet"
                  : total === 1
                    ? "1 coworker"
                    : `${total} coworkers`}
              </span>
            </div>
          </div>
        </div>

        <div
          className="mt-4 pt-3 text-right text-[10px]"
          style={{
            borderTop: "1px solid rgba(29, 158, 117, 0.1)",
            color: "#5A5A7A",
          }}
        >
          <span>Active employees only</span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentStats;
