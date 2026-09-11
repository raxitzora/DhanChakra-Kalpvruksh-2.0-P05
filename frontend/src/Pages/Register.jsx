import { SignUp } from "@clerk/react";

function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        routing="path"
        path="/register"
        signInUrl="/login"
      />
    </div>
  );
}

export default Register;