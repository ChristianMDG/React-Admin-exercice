import {
  useRecordContext,
  useUpdate,
  useNotify,
  useRefresh,
} from "react-admin";
import { Button } from "@mui/material";

const QuickStatusToggle = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [update, { isLoading }] = useUpdate();

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
          notify(`Status changed successfully`, { type: "success" });
          refresh();
        },
        onError: () => {
          notify(`Error changing status`, { type: "error" });
        },
      },
    );
  };

  return (
    <Button
      variant="contained"
      color={record.active ? "error" : "success"}
      onClick={handleToggle}
      disabled={isLoading}
      size="small"
    >
      {isLoading ? "..." : record.active ? "Deactivate" : "Activate"}
    </Button>
  );
};

export default QuickStatusToggle;
