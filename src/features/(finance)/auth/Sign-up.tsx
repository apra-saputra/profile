import { Button } from "@/features/commons/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/commons/components/ui/card";
import { Input } from "@/features/commons/components/ui/input";
import { Label } from "@/features/commons/components/ui/label";
import { useToast } from "@/features/commons/hooks/use-toast";
import { ChangeEvent, FormEvent, useState } from "react";
import { Separator } from "@/features/commons/components/ui/separator";
import GoogleSignIn from "./components/GoogleSignInButton";
import useSignUp from "./hooks/useSignUp";

export default function SignUpPage() {
  const { toast } = useToast();
  const { signUp } = useSignUp();

  const [signUpPayload, setSignUpPayload] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpPayload((state) => ({ ...state, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(signUpPayload.email, signUpPayload.password);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oopss! Something wrong.",
        description: JSON.stringify(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Register</CardTitle>
          <CardDescription>
            Create a new account by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4 min-w-[300px]" onSubmit={onSubmit}>
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                onChange={onChange}
                value={signUpPayload.name}
                placeholder="Name here"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                onChange={onChange}
                value={signUpPayload.email}
                placeholder="example@email.com"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={onChange}
                value={signUpPayload.password}
                placeholder="Password"
              />
            </div>

            <Button className="w-full" type="submit">
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
          <Separator />
          <div className="w-full flex flex-col items-center gap-y-4">
            <span>Or</span>
            <GoogleSignIn />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
