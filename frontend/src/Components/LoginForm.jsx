import { Formik, Form, Field } from "formik";

const LoginForm = ({}) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(value) => {
        console.log("Form is validated! Submitting the form...");
        console.log(value)
      }}
    >
      {() => (
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" className="form-control" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
