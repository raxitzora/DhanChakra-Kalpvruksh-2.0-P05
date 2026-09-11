import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <SignIn routing="path" path="/" />
    </div>
  );
};
 
export { Login };