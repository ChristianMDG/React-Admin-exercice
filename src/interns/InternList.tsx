import {
  List,
  Datagrid,
  TextField,
  EmailField,
  ReferenceField,
  BooleanField,
  NumberField,
  DeleteButton,
  EditButton,
  SearchInput,
  SelectInput,
  Filter,
} from "react-admin";
import { Button, Dialog, Chip } from "@mui/material";
import { useState } from "react";
import QuickInternCreate from "./QuickInternCreate";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

const InternFilters = (props: any) => (
  <Filter {...props}>
    <SearchInput source="q" placeholder="Search by name or email" alwaysOn />
    <SelectInput source="department" choices={departmentChoices} alwaysOn />
    <SelectInput 
      source="isRemunerated" 
      choices={[
        { id: true, name: "Remunerated" },
        { id: false, name: "Non-remunerated" },
      ]} 
      alwaysOn 
    />
  </Filter>
);

export default function InternList() {
  const [modalOpen, setModalOpen] = useState(false);

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
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #534AB7, #1D9E75)",
                }}
              >
                <i className="ti ti-school text-white text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
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
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: "#EAEAFF" }}
                >
                  Interns Management
                </h1>
                <p className="text-sm mt-0.5" style={{ color: "#5A5A7A" }}>
                  Manage and track all interns across departments
                </p>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              startIcon={<i className="ti ti-plus" />}
              sx={{
                background: "linear-gradient(135deg, #534AB7, #1D9E75)",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                padding: "10px 24px",
                boxShadow: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #453A9E, #158A65)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(83, 74, 183, 0.3)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Quick Add Intern
            </Button>
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
            filters={<InternFilters />}
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
              <TextField source="first_name" label="First Name" />
              <TextField source="last_name" label="Last Name" />
              <EmailField source="email" label="Email" />
              <TextField source="department" label="Department" />
              <ReferenceField
                source="managerId"
                reference="employees"
                label="Manager"
                link="show"
              >
                <span style={{ color: "#1D9E75" }}>
                  <TextField source="firstname" /> <TextField source="lastname" />
                </span>
              </ReferenceField>
              <BooleanField
                source="isRemunerated"
                label="Status"
                render={(isRemunerated: boolean) => (
                  <Chip
                    icon={
                      isRemunerated ? (
                        <i className="ti ti-coin text-[11px]" />
                      ) : (
                        <i className="ti ti-circle-x text-[11px]" />
                      )
                    }
                    label={isRemunerated ? "Remunerated" : "Non-remunerated"}
                    size="small"
                    sx={{
                      background: isRemunerated
                        ? "rgba(29, 158, 117, 0.15)"
                        : "rgba(90, 90, 122, 0.15)",
                      color: isRemunerated ? "#1D9E75" : "#5A5A7A",
                      border: isRemunerated
                        ? "1px solid rgba(29, 158, 117, 0.3)"
                        : "1px solid rgba(90, 90, 122, 0.3)",
                      borderRadius: "6px",
                      height: "24px",
                      fontSize: "10px",
                      "& .MuiChip-icon": {
                        color: isRemunerated ? "#1D9E75" : "#5A5A7A",
                        fontSize: "11px",
                      },
                    }}
                  />
                )}
              />
              <NumberField
                source="remuneration"
                label="Remuneration"
                options={{ style: "currency", currency: "EUR" }}
                sx={{
                  "& .MuiTypography-root": {
                    color: "#1D9E75",
                    fontWeight: 500,
                  },
                }}
              />
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

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "hidden",
            borderRadius: "16px",
          },
        }}
      >
        <QuickInternCreate
          onSuccess={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </Dialog>
    </div>
  );
}