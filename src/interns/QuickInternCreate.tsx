import { useCreate, useNotify, useRefresh, useGetList } from "react-admin";
import { SimpleForm, TextInput, SelectInput, required } from "react-admin";

const QuickInternCreate = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const [create, { isLoading, error }] = useCreate();
  const notify = useNotify();
  const refresh = useRefresh();

  const {
    data: managers,
    isLoading: isLoadingManagers,
    error: managersError,
  } = useGetList("employees", {
    filter: { active: true },
    pagination: { page: 1, perPage: 100 },
    sort: { field: "firstname", order: "ASC" },
  });

  const managerChoices =
    managers?.map((manager: any) => ({
      id: manager.id,
      name: `${manager.firstname} ${manager.lastname} - ${manager.department}`,
    })) || [];

  const handleSubmit = (data: any) => {
    const selectedManager = managers?.find(
      (m: any) => m.id === parseInt(data.managerId),
    );
    const defaultEmail = `${data.first_name.toLowerCase()}.${data.last_name.toLowerCase()}@intern.com`;

    create(
      "interns",
      {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: defaultEmail,
          department: selectedManager?.department || "Not specified",
          managerId: parseInt(data.managerId),
          isRemunerated: false,
          remuneration: null,
        },
      },
      {
        onSuccess: () => {
          notify("Intern created successfully!", { type: "success" });
          refresh();
          onSuccess();
        },
        onError: (err) => {
          notify(`Error: ${err.message}`, { type: "error" });
        },
      },
    );
  };

  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{
          background: "#0B0B14",
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #534AB7, #1D9E75)",
              }}
            >
              <i className="ti ti-user-plus text-white text-lg" />
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
                  QUICK ACTION
                </span>
              </div>
              <h2
                className="text-xl font-bold tracking-tight mt-1"
                style={{ color: "#EAEAFF" }}
              >
                Quick Add Intern
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "#5A5A7A" }}>
                Create a new intern in seconds
              </p>
            </div>
          </div>

          <div
            className="h-px mb-5"
            style={{
              background:
                "linear-gradient(90deg, #534AB7, #1D9E75, transparent)",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          {(error || managersError) && (
            <div
              className="rounded-xl p-3 mb-4 flex items-start gap-2"
              style={{
                background: "rgba(216, 90, 48, 0.1)",
                border: "1px solid rgba(216, 90, 48, 0.3)",
              }}
            >
              <i
                className="ti ti-alert-circle text-sm"
                style={{ color: "#D85A30" }}
              />
              <span className="text-xs" style={{ color: "#D85A30" }}>
                {error?.message ||
                  managersError?.message ||
                  "An error occurred"}
              </span>
            </div>
          )}

          {isLoadingManagers ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div
                className="w-8 h-8 rounded-full animate-spin mb-3"
                style={{
                  border: "2px solid rgba(83, 74, 183, 0.2)",
                  borderTopColor: "#534AB7",
                }}
              />
              <p className="text-sm" style={{ color: "#5A5A7A" }}>
                Loading managers...
              </p>
            </div>
          ) : managerChoices.length === 0 ? (
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: "rgba(186, 117, 23, 0.1)",
                border: "1px solid rgba(186, 117, 23, 0.3)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{
                  background: "rgba(186, 117, 23, 0.15)",
                }}
              >
                <i
                  className="ti ti-user-off text-xl"
                  style={{ color: "#BA7517" }}
                />
              </div>
              <h4
                className="text-sm font-semibold mb-1"
                style={{ color: "#BA7517" }}
              >
                No Active Managers Available
              </h4>
              <p className="text-xs" style={{ color: "#5A5A7A" }}>
                Please create an active manager first
              </p>
            </div>
          ) : (
            <SimpleForm
              onSubmit={handleSubmit}
              toolbar={null}
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
                  "& .MuiSelect-icon": { color: "#5A5A7A" },
                },
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
              <TextInput
                source="first_name"
                label="First Name"
                validate={required()}
                fullWidth
                disabled={isLoading}
              />
              <TextInput
                source="last_name"
                label="Last Name"
                validate={required()}
                fullWidth
                disabled={isLoading}
              />
              <SelectInput
                source="managerId"
                label="Manager"
                choices={managerChoices}
                validate={required()}
                fullWidth
                disabled={isLoading}
              />
            </SimpleForm>
          )}
        </div>
      </div>

      <div
        className="flex items-center justify-end gap-3 p-4"
        style={{
          background: "#07070F",
          borderTop: "1px solid rgba(83, 74, 183, 0.1)",
        }}
      >
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
          style={{
            background: "transparent",
            color: "#5A5A7A",
            border: "1px solid rgba(90, 90, 122, 0.3)",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            const form = document.querySelector("form");
            if (form) {
              const event = new Event("submit", { bubbles: true });
              form.dispatchEvent(event);
            }
          }}
          disabled={
            isLoading || isLoadingManagers || managerChoices.length === 0
          }
          className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #534AB7, #1D9E75)",
            color: "white",
            border: "none",
            cursor:
              isLoading || isLoadingManagers || managerChoices.length === 0
                ? "not-allowed"
                : "pointer",
            opacity:
              isLoading || isLoadingManagers || managerChoices.length === 0
                ? 0.6
                : 1,
          }}
        >
          {isLoading ? (
            <>
              <div
                className="w-4 h-4 rounded-full animate-spin"
                style={{
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "white",
                }}
              />
              Creating...
            </>
          ) : (
            <>
              <i className="ti ti-plus text-sm" />
              Create Intern
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default QuickInternCreate;
