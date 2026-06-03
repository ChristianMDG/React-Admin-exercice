import {
  useRecordContext,
  useUpdate,
  useNotify,
  useRefresh,
} from "react-admin";
import { useState } from "react";

const QuickStatusToggle = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [update, { isLoading }] = useUpdate();
  const [isHovered, setIsHovered] = useState(false);

  if (!record) return null;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    update(
      "employees",
      {
        id: record.id,
        data: {
          ...record,
          active: !record.active,
        },
        previousData: record,
      },
      {
        onSuccess: () => {
          notify("Status changed successfully", { type: "success" });
          refresh();
        },
        onError: () => {
          notify("Error changing status", { type: "error" });
        },
      },
    );
  };

  const isActive = record.active;

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden transition-all duration-300 rounded-lg"
      style={{
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.6 : 1,
      }}
    >
      <div
        className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all duration-300"
        style={{
          background: isActive
            ? isHovered
              ? "rgba(216, 90, 48, 0.2)"
              : "rgba(216, 90, 48, 0.15)"
            : isHovered
              ? "rgba(29, 158, 117, 0.2)"
              : "rgba(29, 158, 117, 0.15)",
          border: isActive
            ? "1px solid rgba(216, 90, 48, 0.3)"
            : "1px solid rgba(29, 158, 117, 0.3)",
          color: isActive ? "#D85A30" : "#1D9E75",
        }}
      >
        {isLoading ? (
          <>
            <div
              className="w-3 h-3 rounded-full animate-spin"
              style={{
                border: "2px solid currentColor",
                borderTopColor: "transparent",
              }}
            />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {isActive ? (
              <>
                <i className="ti ti-user-x text-sm" />
                <span>Deactivate</span>
              </>
            ) : (
              <>
                <i className="ti ti-user-check text-sm" />
                <span>Activate</span>
              </>
            )}
          </>
        )}
      </div>

      {/* Ripple effect on click */}
      {!isLoading && (
        <div
          className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300"
          style={{
            background: isActive
              ? "radial-gradient(circle, rgba(216,90,48,0.3) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(29,158,117,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}
    </button>
  );
};

export default QuickStatusToggle;
