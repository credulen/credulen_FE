import React from "react";
import { LoginForm } from "../components/Forms";

const Login = () => {
  return (
    <div className="md:mt-32 mt-36 md:px-[5rem] p-16 border-2 md:mx-[30rem] mx-[1rem] rounded-xl">
      <h2 className="mb-10 flex justify-center text-xl">Login</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
