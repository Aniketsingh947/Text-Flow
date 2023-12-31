import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { registerRoute } from "../utils/APIroutes";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required(),
    password: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required(),
    username: Yup.string().min(3, "Too Short!").max(8, "Too Long!").required(),
  });

  const onSubmit = async (data) => {
    const response = await axios.post(registerRoute, data);
    console.log(response);
    if (response.data.status === false) {
      alert(response.data.msg);
    }
    if (response.data.status === true) {
      localStorage.setItem("chat-app-user", JSON.stringify(response.data.user));
      navigate("/");
    }
  };

  return (
    <>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="form">
            <label>Username </label>
            <Field
              style={{
                backgroundColor: "transparent",
                padding: "0.7em",
                border: "0.1rem solid #4e0eff ",
                borderRadius: "0.4rem",
                color: "white",
                width: "100%",
                fontSize: "1rem",
              }}
              autocomplete="off"
              id="logincred"
              name="username"
              placeholder="username"
            />
            <ErrorMessage
              style={{ fontSize: "0.5rem" }}
              name="username"
              component="span"
            />

            <label>Email </label>
            <Field
              style={{
                backgroundColor: "transparent",
                padding: "0.7em",
                border: "0.1rem solid #4e0eff ",
                borderRadius: "0.4rem",
                color: "white",
                width: "100%",
                fontSize: "1rem",
              }}
              autocomplete="off"
              id="logincred"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage
              style={{ fontSize: "0.5rem" }}
              name="email"
              component="span"
            />
            <label>Password </label>

            <Field
              style={{
                backgroundColor: "transparent",
                padding: "0.7em",
                border: "0.1rem solid #4e0eff ",
                borderRadius: "0.4rem",
                color: "white",
                width: "100%",
                fontSize: "1rem",
              }}
              autocomplete="off"
              id="logincred"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              style={{ fontSize: "0.5rem" }}
              name="password"
              component="span"
            />
            <button type="submit"> Create User</button>
            <span>
              Already have an account ? <Link to="/login">Login.</Link>
            </span>
          </Form>
        </Formik>
      </FormContainer>
    </>
  );
}
export default Register;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  Form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  label {
    display: flex;
    color: black;
    background-color: #e1d1e8;
    padding: 0.5rem;
    // border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    width: 100%;
    font-size: 1rem;
  }
  Field {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 0.5rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
