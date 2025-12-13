import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Registration</h1>

      <h2>Controlled Component</h2>
      <RegistrationForm />

      <hr />

      <h2>Formik Version</h2>
      <FormikForm />
    </div>
  );
}

export default App;
