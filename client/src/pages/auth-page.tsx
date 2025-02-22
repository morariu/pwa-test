import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertUserSchema, InsertUser } from "@shared/schema";
import { Redirect } from "wouter";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";

export default function AuthPage() {
  const { user, login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm({
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = data;
      await register(registerData);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo Section */}
          <div className="mb-8 flex justify-center items-center" style={{ aspectRatio: '2/1' }}>
            <div className="w-full h-full flex items-center justify-center bg-blue-50 rounded-lg">
              <div className="text-center">
                <Lock className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-600">Auth PWA</h2>
              </div>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...loginForm.register("email")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          {...loginForm.register("password")}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Login
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={registerForm.handleSubmit(handleRegister)}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="reg-email">Email</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          {...registerForm.register("email")}
                        />
                        {registerForm.formState.errors.email && (
                          <p className="text-sm text-red-500 mt-1">
                            {registerForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="reg-password">Password</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          {...registerForm.register("password")}
                        />
                        {registerForm.formState.errors.password && (
                          <p className="text-sm text-red-500 mt-1">
                            {registerForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          {...registerForm.register("confirmPassword")}
                        />
                        {registerForm.formState.errors.confirmPassword && (
                          <p className="text-sm text-red-500 mt-1">
                            {registerForm.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Register
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1 bg-blue-600">
        <div className="absolute inset-0 flex items-center justify-center text-white p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-6">Welcome to Auth PWA</h1>
            <p className="text-xl">
              A secure and modern progressive web application featuring user
              authentication, offline support, and a clean design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}