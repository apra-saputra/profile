import React, { useState } from "react";
import InputForm from "./InputForm";
import {
  faEnvelope,
  faHome,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/elements/buttons";

const FormRegister: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername("");
    setEmail("");
    setPassword("");
    setAddress("");
  };

  return (
    <div className="border rounded-md min-w-[400px] bg-background px-6 py-4 flex flex-col justify-between gap-8">
      <div className="flex flex-col border-b border-primary pb-2">
        <h1 className="text-3xl font-semibold">Register</h1>
        <p>please sign up to create accont</p>
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <InputForm
          icon={faUser}
          value={username}
          setValue={setUsername}
          type="text"
          placeholder="Username"
          required
        />
        <InputForm
          icon={faEnvelope}
          value={email}
          setValue={setEmail}
          type="email"
          placeholder="Email"
          required
        />
        <InputForm
          icon={faLock}
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Password"
          required
        />
        <InputForm
          icon={faHome}
          value={address}
          setValue={setAddress}
          type="text"
          placeholder="Address"
        />

        <div className="my-4 flex flex-col item-center gap-1">
          <Button
            type="submit"
            size="lg"
            width="w-full"
            rounded="rounded-[10rem]"
            background="bg-gradient-to-br from-accent via-50% via-primary to-80% to-accent"
          >
            Sign Up
          </Button>
        </div>
      </form>
      <div className="text-sm flex justify-center gap-1 mt-4">
        <span>do have any accound ?</span>
        <div className="text-accent cursor-pointer capitalize hover:text-text">
          sign in
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
