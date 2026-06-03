import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  SelectInput,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
} from "react-admin";
import QuickStatusToggle from "./QuickStatusToggle";
import { Chip } from "@mui/material";

const choices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

const employeeFilters = [
  <SearchInput key="q" source="q" placeholder="Search by name or email" alwaysOn />,
  <SelectInput key="department" source="department" choices={choices} />,
  <TextInput key="firstname" source="firstname" label="First Name" />,
  <TextInput key="lastname" source="lastname" label="Last Name" />,
];

export const EmployeeList = () => (
  <div
    className="min-h-screen p-6"
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
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #534AB7, #1D9E75)",
            }}
          >
            <i className="ti ti-users-group text-white text-lg" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: "#534AB7" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#1D9E75" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#D85A30" }} />
              </div>
              <span
                className="text-[10px] font-mono tracking-[0.15em]"
                style={{ color: "#534AB7" }}
              >
                HR SYSTEM
              </span>
            </div>
            <h1
              className="text-2xl font-bold tracking-tight mt-1"
              style={{ color: "#EAEAFF" }}
            >
              Employees Management
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#5A5A7A" }}>
              Manage and track all employees across departments
            </p>
          </div>
        </div>

        <div
          className="h-px mt-4"
          style={{
            background: "linear-gradient(90deg, #534AB7, #1D9E75, #D85A30, transparent)",
          }}
        />
      </div>

      <div className="px-6 pb-6">
        <List
          filters={employeeFilters}
          perPage={10}
          title=" "
          sx={{
            "& .RaList-main": {
              boxShadow: "none",
              background: "transparent",
              padding: 0,
            },
            "& .RaList-content": {
              padding: 0,
            },
            "& .MuiToolbar-root": {
              marginTop: "24px",
              "& .MuiButtonBase-root": {
                color: "#534AB7",
              },
              "& .MuiTypography-root": {
                color: "#5A5A7A",
                fontSize: "13px",
              },
            },
            "& .RaList-filter": {
              background: "#07070F",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "20px",
              border: "1px solid rgba(83, 74, 183, 0.1)",
            },
            "& .MuiInputBase-root": {
              background: "#07070F",
              borderRadius: "8px",
            },
            "& .MuiFormLabel-root": {
              color: "#5A5A7A",
            },
          }}
        >
          <Datagrid
            rowClick="show"
            sx={{
              "& .MuiTableHead-root": {
                "& .MuiTableCell-root": {
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#534AB7",
                  borderBottom: "1px solid rgba(83, 74, 183, 0.2)",
                  padding: "12px 16px",
                  background: "#0B0B14",
                },
              },
              "& .MuiTableBody-root": {
                "& .MuiTableRow-root": {
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(83, 74, 183, 0.05)",
                  },
                },
                "& .MuiTableCell-root": {
                  color: "#D0D0EC",
                  fontSize: "13px",
                  borderBottom: "1px solid rgba(83, 74, 183, 0.08)",
                  padding: "12px 16px",
                  background: "#0B0B14",
                },
              },
            }}
          >
            <TextField source="firstname" label="First Name" />
            <TextField source="lastname" label="Last Name" />
            <TextField source="email" label="Email" />
            <TextField source="department" label="Department" />
            <NumberField
              source="salary"
              label="Salary"
              options={{ style: "currency", currency: "EUR" }}
              sx={{
                "& .MuiTypography-root": {
                  color: "#1D9E75",
                  fontWeight: 500,
                },
              }}
            />
            <BooleanField
              source="active"
              label="Status"
              sx={{
                "& .MuiTypography-root": {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                },
              }}
              render={(active: boolean) => (
                <Chip
                  icon={
                    active ? (
                      <i className="ti ti-circle-check text-[11px]" />
                    ) : (
                      <i className="ti ti-circle-x text-[11px]" />
                    )
                  }
                  label={active ? "Active" : "Inactive"}
                  size="small"
                  sx={{
                    background: active
                      ? "rgba(29, 158, 117, 0.15)"
                      : "rgba(216, 90, 48, 0.15)",
                    color: active ? "#1D9E75" : "#D85A30",
                    border: active
                      ? "1px solid rgba(29, 158, 117, 0.3)"
                      : "1px solid rgba(216, 90, 48, 0.3)",
                    borderRadius: "6px",
                    height: "24px",
                    fontSize: "10px",
                    fontWeight: 500,
                    "& .MuiChip-icon": {
                      color: active ? "#1D9E75" : "#D85A30",
                      fontSize: "11px",
                      marginLeft: "6px",
                    },
                  }}
                />
              )}
            />
            <QuickStatusToggle />
            <EditButton
              sx={{
                color: "#1D9E75",
                "&:hover": {
                  background: "rgba(29, 158, 117, 0.1)",
                },
              }}
            />
            <DeleteButton
              mutationMode="pessimistic"
              sx={{
                color: "#D85A30",
                "&:hover": {
                  background: "rgba(216, 90, 48, 0.1)",
                },
              }}
            />
          </Datagrid>
        </List>
      </div>
    </div>
  </div>
);