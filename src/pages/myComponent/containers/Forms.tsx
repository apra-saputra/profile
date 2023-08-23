import React from "react";
import FormLogin from "./forms/FormLogin";
import FormRegister from "./forms/FormRegister";
import FormSubmitProduct from "./forms/FormSubmitProduct";

const Forms: React.FC = () => {
  return (
    <div className="border-2 rounded-lg p-2 relative">
      <div className="py-2">
        <h1 className="text-3xl capitalize font-bold">Form Login</h1>
      </div>
      <hr className="absolute right-0 border-t-2 w-full" />
      <div className="py-2 flex justify-center gap-4 mt-2 w-full flex-wrap">
        <FormLogin />
        <FormRegister />
        <FormSubmitProduct />
      </div>
    </div>
  );
};

export default Forms;
