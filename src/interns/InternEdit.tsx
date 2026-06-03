import {
  Edit,
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

export const InternEdit = () => {
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
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #534AB7, #1D9E75)",
              }}
            >
              <i className="ti ti-edit text-white text-lg" />
            </div>
            <div className="flex-1">
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
                Edit Intern
              </h1>
              <p className="text-xs mt-0.5" style={{ color: "#5A5A7A" }}>
                Update intern information
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, #534AB7, #1D9E75, #534AB7)",
          }}
        />

        <Edit
          title=" "
          sx={{
            "& .RaEdit-main": {
              boxShadow: "none",
              background: "transparent",
            },
            "& .RaEdit-card": {
              boxShadow: "none",
              background: "transparent",
              padding: 0,
            },
          }}
        >
          <SimpleForm
            sx={{
              padding: "24px",
              "& .MuiFormControl-root": {
                marginBottom: "16px",
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
                  borderRadius: "8px",
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
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "10px 12px",
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div
                className="rounded-lg p-4"
                style={{
                  background: "#07070F",
                  border: "1px solid rgba(83, 74, 183, 0.1)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#534AB7" }}
                  />
                  <span
                    className="text-[9px] font-mono tracking-[0.15em]"
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
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#D0D0EC" }}
                >
                  Identity
                </h3>
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

              <div
                className="rounded-lg p-4"
                style={{
                  background: "#07070F",
                  border: "1px solid rgba(83, 74, 183, 0.1)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#1D9E75" }}
                  />
                  <span
                    className="text-[9px] font-mono tracking-[0.15em]"
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
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#D0D0EC" }}
                >
                  Assignment
                </h3>
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

                    const { data: managers, isLoading } = useGetList(
                      "employees",
                      {
                        filter: {
                          active: true,
                          department: department,
                        },
                        enabled: !!department,
                        pagination: { page: 1, perPage: 100 },
                      },
                    );

                    const managerChoices =
                      managers?.map((m: any) => ({
                        id: m.id,
                        name: `${m.first_name} ${m.last_name}`,
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
                            : "Manager must be active in the same department"
                        }
                        fullWidth
                      />
                    );
                  }}
                </FormDataConsumer>
              </div>

              <div
                className="rounded-lg p-4"
                style={{
                  background: "#07070F",
                  border: "1px solid rgba(83, 74, 183, 0.1)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#BA7517" }}
                  />
                  <span
                    className="text-[9px] font-mono tracking-[0.15em]"
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
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#D0D0EC" }}
                >
                  Remuneration
                </h3>
                <BooleanInput
                  source="isRemunerated"
                  label="Remunerated Intern"
                />

                <FormDataConsumer>
                  {({ formData }) => {
                    const isRemunerated = formData.isRemunerated;

                    const validateRemuneration = (value: number) => {
                      if (isRemunerated && !value) {
                        return "Remuneration is required";
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
            </div>
          </SimpleForm>
        </Edit>
      </div>
    </div>
  );
};
