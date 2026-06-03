import { useRecordContext, useGetList } from "react-admin";
import {
  Typography,
  List,
  ListItem,
  Link,
  CircularProgress,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const InternsByManager = () => {
  const employee = useRecordContext();

  const {
    data: interns,
    isLoading,
    total,
  } = useGetList("interns", {
    filter: { managerId: employee?.id },
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
    enabled: !!employee?.id && employee?.active === true,
  });

  if (!employee?.id) return null;

  if (!employee.active) {
    return (
      <div
        className="rounded-xl p-4 mt-4"
        style={{
          background: "rgba(216, 90, 48, 0.1)",
          border: "1px solid rgba(216, 90, 48, 0.3)",
        }}
      >
        <div className="flex items-center gap-2">
          <i
            className="ti ti-alert-triangle text-sm"
            style={{ color: "#D85A30" }}
          />
          <Typography style={{ color: "#D85A30", fontSize: "13px" }}>
            This manager is inactive and cannot supervise interns.
          </Typography>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 mt-4">
        <div
          className="w-5 h-5 rounded-full animate-spin"
          style={{
            border: "2px solid rgba(83, 74, 183, 0.2)",
            borderTopColor: "#534AB7",
          }}
        />
        <Typography style={{ color: "#5A5A7A", fontSize: "13px" }}>
          Loading interns...
        </Typography>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl mt-4 overflow-hidden"
      style={{
        background: "#0B0B14",
        border: "1px solid rgba(83, 74, 183, 0.15)",
      }}
    >
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(83, 74, 183, 0.15)",
                color: "#534AB7",
              }}
            >
              <i className="ti ti-users-group text-sm" />
            </div>
            <div>
              <span
                className="text-[10px] font-mono tracking-[0.1em]"
                style={{ color: "#534AB7" }}
              >
                SUPERVISION
              </span>
              <Typography
                variant="h6"
                className="text-sm font-bold"
                style={{ color: "#EAEAFF", marginTop: "2px" }}
              >
                Supervised Interns ({total || 0})
              </Typography>
            </div>
          </div>
          {total > 0 && (
            <div
              className="px-2 py-1 rounded-full text-[10px] font-mono"
              style={{
                background: "rgba(83, 74, 183, 0.15)",
                color: "#534AB7",
                border: "1px solid rgba(83, 74, 183, 0.3)",
              }}
            >
              Active
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, #534AB7, transparent)",
        }}
      />

      {interns && interns.length > 0 ? (
        <div
          className="divide-y"
          style={{ borderColor: "rgba(83, 74, 183, 0.08)" }}
        >
          {interns.map((intern: any) => (
            <div
              key={intern.id}
              className="group p-3 transition-all duration-200 hover:pl-4"
              style={{
                transition: "padding-left 0.2s ease",
              }}
            >
              <div className="flex items-center flex-wrap gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{
                    background: "rgba(29, 158, 117, 0.15)",
                    color: "#1D9E75",
                  }}
                >
                  <i className="ti ti-school text-xs" />
                </div>
                <Link
                  component={RouterLink}
                  to={`/interns/${intern.id}/show`}
                  underline="none"
                  className="font-medium transition-colors duration-200"
                  style={{
                    color: "#D0D0EC",
                    fontSize: "13px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#534AB7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#D0D0EC";
                  }}
                >
                  {intern.first_name} {intern.last_name}
                </Link>
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(186, 117, 23, 0.15)",
                    color: "#BA7517",
                    border: "1px solid rgba(186, 117, 23, 0.3)",
                  }}
                >
                  {intern.department}
                </span>
                {intern.isRemunerated && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{
                      background: "rgba(29, 158, 117, 0.15)",
                      color: "#1D9E75",
                      border: "1px solid rgba(29, 158, 117, 0.3)",
                    }}
                  >
                    <i className="ti ti-coin text-[9px]" />
                    {intern.remuneration}€
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{
              background: "rgba(83, 74, 183, 0.1)",
            }}
          >
            <i
              className="ti ti-user-off text-xl"
              style={{ color: "#5A5A7A" }}
            />
          </div>
          <Typography style={{ color: "#5A5A7A", fontSize: "13px" }}>
            No interns supervised by {employee.firstname} {employee.lastname}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default InternsByManager;
