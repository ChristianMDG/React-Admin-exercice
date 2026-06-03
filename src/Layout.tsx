import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate, AppBar, Menu } from "react-admin";
import { Typography } from "@mui/material";

const CustomAppBar = (props: any) => (
  <AppBar
    {...props}
    sx={{
      background: "#0B0B14",
      borderBottom: "1px solid rgba(83, 74, 183, 0.15)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      "& .RaAppBar-title": {
        display: "flex",
        alignItems: "center",
        gap: "12px",
      },
      "& .MuiToolbar-root": {
        minHeight: "64px",
      },
    }}
  >
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
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          letterSpacing: "0.05em",
          background: "linear-gradient(135deg, #EAEAFF, #534AB7)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        HR Command Center
      </Typography>
      <div
        className="h-4 w-px mx-1"
        style={{ background: "rgba(83, 74, 183, 0.3)" }}
      />
      <Typography
        sx={{
          fontSize: "11px",
          color: "#5A5A7A",
          letterSpacing: "0.08em",
          fontFamily: "monospace",
        }}
      >
        V2.0
      </Typography>
    </div>
  </AppBar>
);

const CustomMenu = (props: any) => (
  <Menu
    {...props}
    sx={{
      "& .RaMenu-menu": {
        background: "#0B0B14",
        borderRight: "1px solid rgba(83, 74, 183, 0.15)",
        "& .MuiMenuItem-root": {
          color: "#D0D0EC",
          borderRadius: "10px",
          margin: "4px 8px",
          transition: "all 0.2s ease",
          "&:hover": {
            background: "rgba(83, 74, 183, 0.1)",
            color: "#EAEAFF",
          },
          "&.Mui-selected": {
            background: "linear-gradient(135deg, rgba(83, 74, 183, 0.2), rgba(29, 158, 117, 0.1))",
            color: "#534AB7",
            borderLeft: "2px solid #534AB7",
            "&:hover": {
              background: "linear-gradient(135deg, rgba(83, 74, 183, 0.3), rgba(29, 158, 117, 0.15))",
            },
          },
        },
        "& .MuiListItemIcon-root": {
          color: "inherit",
          minWidth: "32px",
        },
      },
    }}
  />
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout
    appBar={CustomAppBar}
    menu={CustomMenu}
    sx={{
      "& .RaLayout-appFrame": {
        background: "#06060C",
      },
      "& .RaLayout-content": {
        background: "#06060C",
      },
    }}
  >
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);