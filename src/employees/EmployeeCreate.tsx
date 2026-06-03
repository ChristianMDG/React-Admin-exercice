import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  required,
  minValue,
  email,
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

export const EmployeeCreate = () => (
  <div
    className="min-h-screen p-8"
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
        maxWidth: "720px",
        margin: "0 auto",
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
            <i className="ti ti-user-plus text-white text-xl" />
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
              New Employee Registration
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#5A5A7A" }}>
              Create a new employee profile
            </p>
          </div>
        </div>

        <div
          className="h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, #534AB7, #1D9E75, #D85A30, transparent)",
          }}
        />
      </div>

      <div className="px-6 pb-6">
        <Create
          title=" "
          redirect="list"
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
              "& .MuiFormControl-root": {
                marginBottom: "20px",
                "& label": {
                  color: "#5A5A7A",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                },
                "& label.Mui-focused": { color: "#534AB7" },
                "& .MuiOutlinedInput-root": {
                  background: "#07070F",
                  borderRadius: "10px",
                  color: "#EAEAFF",
                  fontSize: "14px",
                  "& fieldset": {
                    borderColor: "rgba(83, 74, 183, 0.2)",
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": { borderColor: "#534AB7" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#534AB7",
                    borderWidth: "1px",
                    boxShadow: "0 0 0 2px rgba(83, 74, 183, 0.1)",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "12px 14px",
                },
                "& .MuiFormHelperText-root": {
                  color: "#5A5A7A",
                  fontSize: "10px",
                  marginTop: "4px",
                },
                "& .MuiFormHelperText-root.Mui-error": { color: "#D85A30" },
              },
              "& .MuiSwitch-root": {
                marginTop: "8px",
                "& .MuiSwitch-track": {
                  background: "#151525",
                  borderRadius: "12px",
                },
                "& .Mui-checked + .MuiSwitch-track": {
                  background: "#534AB780",
                },
                "& .MuiSwitch-thumb": {
                  background: "#5A5A7A",
                },
                "& .Mui-checked .MuiSwitch-thumb": { background: "#534AB7" },
              },
              "& .MuiFormLabel-root": {
                color: "#D0D0EC",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "8px",
              },
              "& .MuiSelect-icon": { color: "#5A5A7A" },
              "& .MuiMenuItem-root": {
                background: "#0B0B14",
                color: "#EAEAFF",
                "&:hover": {
                  background: "#151525",
                },
              },
              "& .MuiPaper-root": {
                background: "#0B0B14",
                border: "1px solid rgba(83, 74, 183, 0.2)",
              },
            }}
          >
            <div
              className="rounded-xl p-5 mb-5"
              style={{
                background: "#07070F",
                border: "1px solid rgba(83, 74, 183, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#534AB7" }}
                />
                <span
                  className="text-[10px] font-mono tracking-[0.1em]"
                  style={{ color: "#534AB7" }}
                >
                  SECTION 01
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(83, 74, 183, 0.15)" }}
                />
              </div>
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#D0D0EC" }}
              >
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  source="firstname"
                  label="First Name"
                  validate={required("The first name is required")}
                  fullWidth
                />
                <TextInput
                  source="lastname"
                  label="Last Name"
                  validate={required("The last name is required")}
                  fullWidth
                />
              </div>
              <TextInput
                source="email"
                label="Email"
                validate={[
                  required("The email is required"),
                  email("The email is not valid"),
                ]}
                fullWidth
              />
            </div>

            <div
              className="rounded-xl p-5 mb-5"
              style={{
                background: "#07070F",
                border: "1px solid rgba(83, 74, 183, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#1D9E75" }}
                />
                <span
                  className="text-[10px] font-mono tracking-[0.1em]"
                  style={{ color: "#1D9E75" }}
                >
                  SECTION 02
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(29, 158, 117, 0.15)" }}
                />
              </div>
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#D0D0EC" }}
              >
                Professional Information
              </h3>
              <SelectInput
                source="department"
                label="Department"
                choices={departmentChoices}
                validate={required("The department is required")}
                fullWidth
              />
              <NumberInput
                source="salary"
                label="Salary (€)"
                validate={[
                  required("The salary is required"),
                  minValue(1500, "The minimum salary is 1,500 €"),
                ]}
                fullWidth
              />
            </div>

            <div
              className="rounded-xl p-5"
              style={{
                background: "#07070F",
                border: "1px solid rgba(83, 74, 183, 0.1)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#BA7517" }}
                />
                <span
                  className="text-[10px] font-mono tracking-[0.1em]"
                  style={{ color: "#BA7517" }}
                >
                  SECTION 03
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(186, 117, 23, 0.15)" }}
                />
              </div>
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#D0D0EC" }}
              >
                Status
              </h3>
              <BooleanInput source="active" label="Active Employee" />
            </div>
          </SimpleForm>
        </Create>
      </div>
    </div>
  </div>
);
