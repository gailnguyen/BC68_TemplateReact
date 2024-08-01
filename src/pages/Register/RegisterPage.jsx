import React from "react";
import registerAnimation from "./../../assets/animation/registerAnimation.json";
import { useLottie } from "lottie-react";
import FormRegister from "../../components/FormRegister/FormRegister";
const RegisterPage = () => {
  const options = {
    animationData: registerAnimation,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <div className="flex">
      <div className="w-1/2">{View}</div>
      <div className="w-1/2">
        <FormRegister/>
      </div>
    </div>
  );
};

export default RegisterPage;
