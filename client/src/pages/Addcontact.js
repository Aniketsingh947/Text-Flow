import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addcontactRoute } from "../utils/APIroutes";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Addcontact() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const initialValues = {
    username: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
  });

  const onSubmit = async (data) => {
    const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    console.log(user);
    console.log(data);
    const response = await axios.post(`${addcontactRoute}/${user._id}`, data);
    console.log(response);
    // if (response.data.status === false) {
    //   toast.error(response.data.msg, toastOptions);
    // }
    // if (response.data.status === true) {
    //   localStorage.setItem("chat-app-user", JSON.stringify(response.data.user));
    //   navigate("/");
    // }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          {/* <div className="brand">
                <img src={Logo} alt="logo" />
                <h1>snappy</h1>
              </div> */}
          <label>Username </label>
          <ErrorMessage name="username" component="span" />
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
          {/* <label>Password </label>
          <ErrorMessage name="password" component="span" /> */}
          {/* <Field
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
          /> */}
          <button type="submit"> Addcontact</button>
          <span>
            Do not have an account ? <Link to="/register">Register.</Link>
          </span>
        </Form>
      </Formik>
    </FormContainer>
  );
}

export default Addcontact;

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
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
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

  Form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
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
// const Field = styled.Field`
//   background-color: transparent;
//   padding: 3rem;
//   border: 0.1rem solid #4e0eff;
//   border-radius: 0.4rem;
//   color: white;
// width: 100%;
// font-size: 1rem;
// &:focus {
//   border: 0.1rem solid #997af0;
//   outline: none;
//   }
// `;
