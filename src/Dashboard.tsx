import { useGetList } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
  LinearProgress,
  Button,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import PaidIcon from "@mui/icons-material/Paid";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const { total: totalEmployees, isLoading: loadingTotalEmp } = useGetList(
    "employees",
    {
      pagination: { page: 1, perPage: 1 },
    }
  );

  const { total: activeEmployees, isLoading: loadingActiveEmp } = useGetList(
    "employees",
    {
      filter: { active: true },
      pagination: { page: 1, perPage: 1 },
    }
  );

  const { total: totalInterns, isLoading: loadingTotalInt } = useGetList(
    "interns",
    {
      pagination: { page: 1, perPage: 1 },
    }
  );

  const { total: remuneratedInterns, isLoading: loadingRemunerated } =
    useGetList("interns", {
      filter: { isRemunerated: true },
      pagination: { page: 1, perPage: 1 },
    });

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      loading: loadingTotalEmp,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      title: "Active Employees",
      value: activeEmployees,
      loading: loadingActiveEmp,
      icon: <GroupIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
    },
    {
      title: "Total Interns",
      value: totalInterns,
      loading: loadingTotalInt,
      icon: <SchoolIcon sx={{ fontSize: 40, color: "#ed6c02" }} />,
    },
    {
      title: "Remunerated Interns",
      value: remuneratedInterns,
      loading: loadingRemunerated,
      icon: <PaidIcon sx={{ fontSize: 40, color: "#9c27b0" }} />,
    },
  ];

  // Calcul du taux d'activité
  const activityRate = totalEmployees
    ? ((activeEmployees || 0) / (totalEmployees || 1)) * 100
    : 0;

  // Calcul du taux de rémunération des stagiaires
  const remunerationRate = totalInterns
    ? ((remuneratedInterns || 0) / (totalInterns || 1)) * 100
    : 0;

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            href="#/employees/create"
          >
            Add Employee
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            href="#/interns/create"
          >
            Add Intern
          </Button>
        </Box>
      </Box>

      {/* Statistiques Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="subtitle2"
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" component="h2">
                      {stat.loading ? (
                        <CircularProgress size={30} />
                      ) : (
                        stat.value ?? 0
                      )}
                    </Typography>
                  </Box>
                  <Box>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Section Analytics */}
      <Grid container spacing={3}>
        {/* Activity Rate Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Employee Activity Rate
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Active Rate
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {activityRate.toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={activityRate}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Total workforce distribution
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Active
                    </Typography>
                    <Typography variant="h6">{activeEmployees ?? 0}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Inactive
                    </Typography>
                    <Typography variant="h6">
                      {(totalEmployees ?? 0) - (activeEmployees ?? 0)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Internship Rate Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Internship Program
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Remuneration Rate
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {remunerationRate.toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={remunerationRate}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Intern distribution
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Remunerated
                    </Typography>
                    <Typography variant="h6">
                      {remuneratedInterns ?? 0}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Non-remunerated
                    </Typography>
                    <Typography variant="h6">
                      {(totalInterns ?? 0) - (remuneratedInterns ?? 0)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;