import {
  List,
  TextField,
  EmailField,
  ReferenceField,
  BooleanField,
  NumberField,
  DeleteButton,
  EditButton,
  useListContext,
} from "react-admin";
import { Button, Dialog } from "@mui/material";
import { useState } from "react";
import QuickInternCreate from "./QuickInternCreate";

const InternGrid = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl p-4 animate-pulse"
            style={{
              background: "#0B0B14",
              border: "1px solid rgba(83, 74, 183, 0.15)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#151525]" />
              <div className="flex-1">
                <div className="h-3 bg-[#151525] rounded w-24 mb-2" />
                <div className="h-2 bg-[#151525] rounded w-32" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-[#151525] rounded w-full" />
              <div className="h-2 bg-[#151525] rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            background: "rgba(83, 74, 183, 0.1)",
          }}
        >
          <i className="ti ti-users text-2xl" style={{ color: "#5A5A7A" }} />
        </div>
        <h3 className="text-sm font-medium mb-1" style={{ color: "#D0D0EC" }}>
          No interns found
        </h3>
        <p className="text-xs" style={{ color: "#5A5A7A" }}>
          Click "Quick Add Intern" to create one
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((intern: any) => (
        <div
          key={intern.id}
          className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "#0B0B14",
            border: "1px solid rgba(83, 74, 183, 0.15)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: "linear-gradient(90deg, #534AB7, #1D9E75, #534AB7)",
            }}
          />

          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #534AB7, #1D9E75)",
                  }}
                >
                  <i className="ti ti-school text-white text-base" />
                </div>
                <div>
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: "#EAEAFF" }}
                  >
                    {intern.first_name} {intern.last_name}
                  </h3>
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: "#5A5A7A" }}
                  >
                    ID: {intern.id}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <EditButton
                  record={intern}
                  sx={{
                    minWidth: "32px",
                    padding: "4px",
                    color: "#1D9E75",
                    "&:hover": {
                      background: "rgba(29, 158, 117, 0.1)",
                    },
                  }}
                />
                <DeleteButton
                  record={intern}
                  mutationMode="pessimistic"
                  sx={{
                    minWidth: "32px",
                    padding: "4px",
                    color: "#D85A30",
                    "&:hover": {
                      background: "rgba(216, 90, 48, 0.1)",
                    },
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <i className="ti ti-mail" style={{ color: "#534AB7" }} />
                <span style={{ color: "#D0D0EC" }}>{intern.email}</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <i className="ti ti-building" style={{ color: "#534AB7" }} />
                <span style={{ color: "#D0D0EC" }}>{intern.department}</span>
              </div>

              {intern.managerId && (
                <div className="flex items-center gap-2 text-xs">
                  <i className="ti ti-user" style={{ color: "#534AB7" }} />
                  <span style={{ color: "#D0D0EC" }}>
                    Manager: {intern.managerId}
                  </span>
                </div>
              )}

              <div
                className="flex items-center justify-between pt-2 mt-1 border-t"
                style={{ borderColor: "rgba(83, 74, 183, 0.1)" }}
              >
                <div className="flex items-center gap-2">
                  {intern.isRemunerated ? (
                    <>
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
                    </>
                  ) : (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(90, 90, 122, 0.15)",
                        color: "#5A5A7A",
                        border: "1px solid rgba(90, 90, 122, 0.3)",
                      }}
                    >
                      Non remunerated
                    </span>
                  )}
                </div>
                <a
                  href={`#/interns/${intern.id}/show`}
                  className="text-[10px] flex items-center gap-1 transition-all duration-200 hover:gap-2"
                  style={{ color: "#534AB7", textDecoration: "none" }}
                >
                  View details
                  <i className="ti ti-arrow-right text-[9px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function InternList() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className="p-8"
      style={{
        background: "#06060C",
        minHeight: "100vh",
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #534AB7, #1D9E75)",
                }}
              >
                <i className="ti ti-users text-white text-lg" />
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
                    HR SYSTEM
                  </span>
                </div>
                <h1
                  className="text-xl font-bold tracking-tight mt-1"
                  style={{ color: "#EAEAFF" }}
                >
                  Interns List
                </h1>
                <p className="text-xs mt-0.5" style={{ color: "#5A5A7A" }}>
                  Manage and track all interns
                </p>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{
                background: "linear-gradient(135deg, #534AB7, #1D9E75)",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                padding: "8px 20px",
                boxShadow: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #453A9E, #158A65)",
                  boxShadow: "0 4px 15px rgba(83, 74, 183, 0.3)",
                },
              }}
            >
              <i className="ti ti-plus mr-2 text-base" />
              Quick Add Intern
            </Button>
          </div>
        </div>

        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, #534AB7, #1D9E75, #534AB7)",
          }}
        />

        <div className="p-6">
          <List
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
                },
              },
            }}
          >
            <InternGrid />
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
