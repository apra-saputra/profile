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
import { useAuth } from "../commons/contexts/AuthContext";

export default function SignInPage() {
  const { toast } = useToast();
  const { login } = useAuth();

  const [signInPayload, setSignInPayload] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInPayload((state) => ({ ...state, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(signInPayload);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oopss! Something wrong.",
        description: error.message || JSON.stringify(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl">Sign In</CardTitle>
          <CardDescription>Login by filling form below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <form className="space-y-4 min-w-[300px]" onSubmit={onSubmit}>
            <div>
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                onChange={onChange}
                value={signInPayload.email}
                placeholder="example@email.com"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={onChange}
                value={signInPayload.password}
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
