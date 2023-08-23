import React, { useState } from "react";
import {
  faEnvelope,
  faLock,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputForm from "./InputForm";
import { Button } from "@/components/elements/buttons";

const FormLogin: React.FC = () => {
  const [emailForm1, setEmailForm1] = useState<string>("");
  const [passwordForm1, setPasswordForm1] = useState<string>("");

  return (
    <div className="border rounded-md min-w-[400px] bg-background px-6 py-4 flex flex-col gap-8">
      <div className="mx-auto w-full text-center py-4">
        <FontAwesomeIcon icon={faUserCircle} size="8x" />
      </div>
      <div className="flex flex-col border-b border-primary pb-2">
        <h1 className="text-3xl font-semibold">Login</h1>
        <p>please sign in to continue</p>
      </div>
      <form className="flex flex-col gap-2">
        <InputForm
          icon={faEnvelope}
          value={emailForm1}
          setValue={setEmailForm1}
          type="email"
          placeholder="Email"
        />
        <InputForm
          icon={faLock}
          value={passwordForm1}
          setValue={setPasswordForm1}
          type="password"
          placeholder="Password"
        />

        <div className="my-4 flex flex-col item-center gap-1">
          <Button
            type="reset"
            size="lg"
            width="w-full"
            rounded="rounded-[10rem]"
            background="bg-gradient-to-br from-accent to-50% to-primary"
          >
            Login
          </Button>
          <div className="text-accent cursor-pointer hover:text-text text-center">
            forget password?
          </div>
        </div>
      </form>
      <div className="text-sm flex justify-center gap-1 mt-4">
        <span>don't have any accound ?</span>
        <div className="text-accent cursor-pointer capitalize hover:text-text">
          sign up
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
