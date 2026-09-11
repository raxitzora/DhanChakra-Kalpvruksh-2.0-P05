import { SignIn } from "@clerk/react";

function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/register"
      />
    </div>
  );
}

export default Login;