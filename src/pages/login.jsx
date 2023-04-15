import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
        const token = response.data.request_token;
        axios
          .post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`, {
            username: values.username,
            password: values.password,
            request_token: token,
          })
          .then((respon) => {
            const validateToken = respon.data.request_token;

            console.log(validateToken);
            axios
              .post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`, {
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
      <Container
        fluid
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1179&q=80")`,
          backgroundSize: "cover",
        }}
      >
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <p style={{ fontSize: "1.5rem", marginBottom: "2rem", fontWeight: "bold" }}>Welcome To Movie Mania</p>
          <Button variant="dark" onClick={handleShow}>
            Sign In
          </Button>
        </div>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label htmlFor="username" className="mb-2 text-muted text-secondary" />
              <Form.Control type="text" id="username" name="username" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} placeholder="Input Your Username" />
              {formik.touched.username && formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label htmlFor="password" className="mb-2 text-muted text-secondary" />
              <Form.Control type="password" id="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} placeholder="Input Your Password" />
              {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
            </Form.Group>

            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
