// Dashboard.tsx
import { useGetList } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import PaidIcon from "@mui/icons-material/Paid";
import GroupIcon from "@mui/icons-material/Group";

const Dashboard = () => {
  // 4 appels useGetList optimisés avec perPage: 1
  const { total: totalEmployees, isLoading: loadingTotalEmp } = useGetList(
    "employees",
    {
      pagination: { page: 1, perPage: 1 },
    },
  );

  const { total: activeEmployees, isLoading: loadingActiveEmp } = useGetList(
    "employees",
    {
      filter: { active: true },
      pagination: { page: 1, perPage: 1 },
    },
  );

  const { total: totalInterns, isLoading: loadingTotalInt } = useGetList(
    "interns",
    {
      pagination: { page: 1, perPage: 1 },
    },
  );

  const { total: remuneratedInterns, isLoading: loadingRemunerated } =
    useGetList("interns", {
      filter: { isRemunerated: true },
      pagination: { page: 1, perPage: 1 },
    });

  const stats = [
    {
      title: "Total employés",
      value: totalEmployees,
      loading: loadingTotalEmp,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
      bgColor: "#e3f2fd",
    },
    {
      title: "Employés actifs",
      value: activeEmployees,
      loading: loadingActiveEmp,
      icon: <GroupIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
      bgColor: "#e8f5e9",
    },
    {
      title: "Total stagiaires",
      value: totalInterns,
      loading: loadingTotalInt,
      icon: <SchoolIcon sx={{ fontSize: 40, color: "#ed6c02" }} />,
      bgColor: "#fff3e0",
    },
    {
      title: "Stagiaires rémunérés",
      value: remuneratedInterns,
      loading: loadingRemunerated,
      icon: <PaidIcon sx={{ fontSize: 40, color: "#9c27b0" }} />,
      bgColor: "#f3e5f5",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Tableau de bord
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%", bgcolor: stat.bgColor }}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" component="h2" fontWeight="bold">
                      {stat.loading ? (
                        <CircularProgress size={30} />
                      ) : (
                        (stat.value ?? 0)
                      )}
                    </Typography>
                  </Box>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
