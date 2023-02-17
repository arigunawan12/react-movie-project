import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./App.css";

function App() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=c63defe7dae36af0e37367adff7a5fb4`).then((response) => {
        const token = response.data.request_token;
        axios
          .post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=c63defe7dae36af0e37367adff7a5fb4`, {
            username: values.username,
            password: values.password,
            request_token: token,
          })
          .then((respon) => {
            const validateToken = respon.data.request_token;

            console.log(validateToken);
            axios
              .post(`https://api.themoviedb.org/3/authentication/session/new?api_key=c63defe7dae36af0e37367adff7a5fb4`, {
                request_token: validateToken,
              })
              .then((res) => {
                const sessionID = res.data.session_id;
                localStorage.setItem("sessionId", sessionID);
                localStorage.setItem("name", values.username);
                window.location.assign("/movie");
              });
          })
          .catch((err) => {
            const showError = err.response.data.status_message;
            alert(showError);
          });
      });
    },
  });

  return (
    <>
      <div className="container-fluid">
        <h1 className="text-danger text-center fw-bold">Login</h1>
        <div className="card shadow-lg">
          <div className="card-body p-5" id="form1">
            <form className="form-data p-3 mx-auto w-25" onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <div htmlFor="username" className="mb-2 text-muted text-secondary">
                  Username
                </div>

                <input className="form-control" type="text" id="username" name="username" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} />
                {formik.touched.username && formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}
              </div>

              <div className="mb-3">
                <div htmlFor="password" className="text-secondary">
                  Password
                </div>
                <input className="form-control" type="password" id="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
              </div>
              <div className="mb-3">
                <button variant="primary" type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
