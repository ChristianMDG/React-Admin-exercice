import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { Layout } from "./Layout";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";
import { InternCreate } from "./interns/InternCreate";
import { InternEdit } from "./interns/InternEdit";
import { InternShow } from "./interns/InternShow";
import Dashboard from "./Dashboard";
import InternList from "./interns/InternList";

export const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider} layout={Layout}>
    <Resource
      name="employees"
      list={EmployeeList}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
      options={{ label: "Employees" }}
      recordRepresentation="firstname"
    />
    <Resource
      name="interns"
      list={InternList}
      create={InternCreate}
      edit={InternEdit}
      show={InternShow}
      options={{ label: "Interns" }}
      recordRepresentation="first_name"
    />
  </Admin>
);
