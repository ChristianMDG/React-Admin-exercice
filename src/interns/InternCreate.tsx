import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  NumberInput,
  required,
  email,
  FormDataConsumer,
  useGetList,
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

const futuristic = {
  page: { background: "#0a0a12", minHeight: "100vh", padding: "2rem" },
  card: {
    background: "#0e0e1c",
    border: "1px solid #1e1e3a",
    borderRadius: "16px",
    padding: "2rem",
    maxWidth: "640px",
    margin: "0 auto",
  },
  header: {
    borderBottom: "1px solid #1e1e3a",
    paddingBottom: "1.25rem",
    marginBottom: "1.75rem",
  },
  label: {
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#534AB7",
    marginBottom: "4px",
    display: "block",
  },
  accentBar: {
    width: "32px",
    height: "2px",
    background: "#534AB7",
    borderRadius: "2px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 500,
    color: "#e8e8f4",
    letterSpacing: "0.02em",
  },
  sub: { fontSize: "12px", color: "#444460", marginTop: "4px" },
  section: {
    background: "#0a0a18",
    border: "1px solid #1a1a30",
    borderRadius: "10px",
    padding: "1.25rem",
    marginBottom: "1rem",
  },
  sectionTitle: {
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#333350",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#534AB7",
    display: "inline-block",
  },
} as const;

export const InternCreate = () => {
  return (
    <div style={futuristic.page}>
      <div style={futuristic.card}>
        {/* Card header */}
        <div style={futuristic.header}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <span style={{ ...futuristic.dot }} />
            <span style={{ ...futuristic.label, marginBottom: 0 }}>
              HR System
            </span>
          </div>
          <div style={futuristic.accentBar} />
          <h1 style={futuristic.title}>New intern registration</h1>
          <p style={futuristic.sub}>Fill in the intern's information below</p>
        </div>

        <Create
          title=" "
          sx={{
            "& .RaCreate-main": {
              boxShadow: "none",
              background: "transparent",
            },
            "& .RaCreate-card": {
              boxShadow: "none",
              background: "transparent",
              padding: 0,
            },
          }}
        >
          <SimpleForm
            sx={{
              padding: 0,
              "& .MuiFormControl-root": {
                "& label": { color: "#555570", fontSize: "13px" },
                "& label.Mui-focused": { color: "#7F77DD" },
                "& .MuiOutlinedInput-root": {
                  background: "#0a0a18",
                  borderRadius: "8px",
                  color: "#e0e0f0",
                  "& fieldset": { borderColor: "#1e1e3a", borderWidth: "1px" },
                  "&:hover fieldset": { borderColor: "#3C3489" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#534AB7",
                    borderWidth: "1px",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#444460",
                  fontSize: "11px",
                },
                "& .MuiFormHelperText-root.Mui-error": { color: "#D85A30" },
              },
              "& .MuiSwitch-root": {
                "& .MuiSwitch-track": { background: "#1e1e3a" },
                "& .Mui-checked + .MuiSwitch-track": {
                  background: "#534AB780",
                },
                "& .Mui-checked .MuiSwitch-thumb": { background: "#534AB7" },
              },
              "& .MuiFormLabel-root": { color: "#a0a0c0", fontSize: "14px" },
              "& .MuiSelect-icon": { color: "#444460" },
              "& .MuiMenuItem-root": {
                background: "#0e0e1c",
                color: "#e0e0f0",
              },
            }}
          >
            {/* Identity section */}
            <div style={futuristic.section}>
              <div style={futuristic.sectionTitle}>
                <span style={{ ...futuristic.dot, background: "#534AB7" }} />
                Identity
              </div>
              <TextInput
                source="first_name"
                label="First Name"
                validate={required()}
                fullWidth
              />
              <TextInput
                source="last_name"
                label="Last Name"
                validate={required()}
                fullWidth
              />
              <TextInput
                source="email"
                label="Email"
                validate={[required(), email()]}
                fullWidth
              />
            </div>

            {/* Assignment section */}
            <div style={futuristic.section}>
              <div style={futuristic.sectionTitle}>
                <span style={{ ...futuristic.dot, background: "#1D9E75" }} />
                Assignment
              </div>
              <SelectInput
                source="department"
                label="Department"
                choices={departmentChoices}
                validate={required()}
                fullWidth
              />

              <FormDataConsumer>
                {({ formData }) => {
                  const department = formData.department;
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const { data: managers, isLoading } = useGetList(
                    "employees",
                    {
                      filter: { active: true, department },
                      enabled: !!department,
                      pagination: { page: 1, perPage: 100 },
                    },
                  );

                  const managerChoices =
                    managers?.map((m: any) => ({
                      id: m.id,
                      name: `${m.firstname} ${m.lastname}`,
                    })) || [];

                  return (
                    <SelectInput
                      source="managerId"
                      label="Manager"
                      choices={managerChoices}
                      validate={required()}
                      disabled={isLoading || !department}
                      helperText={
                        !department
                          ? "Select the department first"
                          : "Active managers in the same department"
                      }
                      fullWidth
                    />
                  );
                }}
              </FormDataConsumer>
            </div>

            {/* Remuneration section */}
            <div style={futuristic.section}>
              <div style={futuristic.sectionTitle}>
                <span style={{ ...futuristic.dot, background: "#BA7517" }} />
                Remuneration
              </div>
              <BooleanInput
                source="isRemunerated"
                label="Remunerated intern?"
              />

              <FormDataConsumer>
                {({ formData }) => {
                  const isRemunerated = formData.isRemunerated;

                  const validateRemuneration = (value: number) => {
                    if (isRemunerated && !value) {
                      return "Remuneration is required for a remunerated intern";
                    }
                    return undefined;
                  };

                  return isRemunerated ? (
                    <NumberInput
                      source="remuneration"
                      label="Remuneration (€)"
                      validate={validateRemuneration}
                      min={0}
                      fullWidth
                    />
                  ) : null;
                }}
              </FormDataConsumer>
            </div>
          </SimpleForm>
        </Create>
      </div>
    </div>
  );
};
