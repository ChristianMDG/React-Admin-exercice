import {
  List,
  TextField,
  NumberField,
  BooleanField,
  SelectInput,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
  useListContext,
  Filter,
  Pagination,
} from "react-admin";
import { Chip, Avatar } from "@mui/material";
import QuickStatusToggle from "./QuickStatusToggle";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

const EmployeeFilters = (props: any) => (
  <Filter {...props}>
    <SearchInput source="q" placeholder="Search by name or email" alwaysOn />
    <SelectInput source="department" choices={departmentChoices} alwaysOn />
    <TextInput source="firstname" label="First Name" />
    <TextInput source="lastname" label="Last Name" />
  </Filter>
);

const EmployeeCard = ({
  employee,
  onClick,
}: {
  employee: any;
  onClick: () => void;
}) => {
  const getInitials = (first: string, last: string) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div
        className="relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
        style={{
          background: "#0B0B14",
          border: "1px solid rgba(83, 74, 183, 0.15)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{
            background: "linear-gradient(90deg, #534AB7, #1D9E75, #D85A30)",
          }}
        />

        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar
                sx={{
                  background: "linear-gradient(135deg, #534AB7, #1D9E75)",
                  width: 48,
                  height: 48,
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {getInitials(employee.firstname, employee.lastname)}
              </Avatar>
              <div>
                <h3
                  className="font-semibold text-base"
                  style={{ color: "#EAEAFF" }}
                >
                  {employee.firstname} {employee.lastname}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <i
                    className="ti ti-mail text-[10px]"
                    style={{ color: "#5A5A7A" }}
                  />
                  <span className="text-[11px]" style={{ color: "#5A5A7A" }}>
                    {employee.email}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <QuickStatusToggle record={employee} label="" />
              <EditButton
                record={employee}
                sx={{
                  minWidth: "34px",
                  padding: "6px",
                  borderRadius: "8px",
                  color: "#1D9E75",
                  "&:hover": {
                    background: "rgba(29, 158, 117, 0.1)",
                  },
                }}
              />
              <DeleteButton
                record={employee}
                mutationMode="pessimistic"
                sx={{
                  minWidth: "34px",
                  padding: "6px",
                  borderRadius: "8px",
                  color: "#D85A30",
                  "&:hover": {
                    background: "rgba(216, 90, 48, 0.1)",
                  },
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div
              className="rounded-lg p-2"
              style={{
                background: "#07070F",
                border: "1px solid rgba(83, 74, 183, 0.1)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <i
                  className="ti ti-building text-[10px]"
                  style={{ color: "#534AB7" }}
                />
                <span
                  className="text-[9px] uppercase tracking-wider"
                  style={{ color: "#5A5A7A" }}
                >
                  Department
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: "#D0D0EC" }}>
                {employee.department}
              </p>
            </div>

            <div
              className="rounded-lg p-2"
              style={{
                background: "#07070F",
                border: "1px solid rgba(83, 74, 183, 0.1)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <i
                  className="ti ti-chart-bar text-[10px]"
                  style={{ color: "#534AB7" }}
                />
                <span
                  className="text-[9px] uppercase tracking-wider"
                  style={{ color: "#5A5A7A" }}
                >
                  Salary
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: "#1D9E75" }}>
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(employee.salary)}
              </p>
            </div>
          </div>

          <div
            className="flex items-center justify-between pt-3 border-t"
            style={{ borderColor: "rgba(83, 74, 183, 0.08)" }}
          >
            <div className="flex items-center gap-2">
              {employee.active ? (
                <Chip
                  icon={<i className="ti ti-circle-check text-[11px]" />}
                  label="Active"
                  size="small"
                  sx={{
                    background: "rgba(29, 158, 117, 0.15)",
                    color: "#1D9E75",
                    border: "1px solid rgba(29, 158, 117, 0.3)",
                    borderRadius: "6px",
                    height: "24px",
                    fontSize: "10px",
                    "& .MuiChip-icon": {
                      color: "#1D9E75",
                      fontSize: "11px",
                      marginLeft: "6px",
                    },
                  }}
                />
              ) : (
                <Chip
                  icon={<i className="ti ti-circle-x text-[11px]" />}
                  label="Inactive"
                  size="small"
                  sx={{
                    background: "rgba(216, 90, 48, 0.15)",
                    color: "#D85A30",
                    border: "1px solid rgba(216, 90, 48, 0.3)",
                    borderRadius: "6px",
                    height: "24px",
                    fontSize: "10px",
                    "& .MuiChip-icon": {
                      color: "#D85A30",
                      fontSize: "11px",
                      marginLeft: "6px",
                    },
                  }}
                />
              )}
            </div>

            <div className="flex items-center gap-1 text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">
              <span style={{ color: "#534AB7" }}>View details</span>
              <i
                className="ti ti-arrow-right text-[10px]"
                style={{ color: "#534AB7" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeGrid = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl p-5 animate-pulse"
            style={{
              background: "#0B0B14",
              border: "1px solid rgba(83, 74, 183, 0.15)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#151525]" />
              <div className="flex-1">
                <div className="h-3 bg-[#151525] rounded w-28 mb-2" />
                <div className="h-2 bg-[#151525] rounded w-36" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="h-12 bg-[#151525] rounded" />
              <div className="h-12 bg-[#151525] rounded" />
            </div>
            <div className="h-6 bg-[#151525] rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            background: "rgba(83, 74, 183, 0.1)",
          }}
        >
          <i className="ti ti-users text-3xl" style={{ color: "#5A5A7A" }} />
        </div>
        <h3
          className="text-base font-semibold mb-2"
          style={{ color: "#D0D0EC" }}
        >
          No employees found
        </h3>
        <p className="text-sm" style={{ color: "#5A5A7A" }}>
          Click "Create Employee" to add your first employee
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {data.map((employee: any) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onClick={() =>
            (window.location.hash = `/employees/${employee.id}/show`)
          }
        />
      ))}
    </div>
  );
};

export const EmployeeList = () => {
  return (
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
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #534AB7, #1D9E75)",
              }}
            >
              <i className="ti ti-users-group text-white text-xl" />
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
                  HR SYSTEM
                </span>
              </div>
              <h1
                className="text-2xl font-bold tracking-tight"
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
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg, #534AB7, #1D9E75, #D85A30, transparent)",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          <List
            filters={<EmployeeFilters />}
            perPage={12}
            pagination={<Pagination rowsPerPageOptions={[6, 12, 24, 48]} />}
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
            }}
          >
            <EmployeeGrid />
          </List>
        </div>
      </div>
    </div>
  );
};
