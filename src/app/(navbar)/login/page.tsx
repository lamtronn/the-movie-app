import LoginForm from "@/views/LoginScreen/LoginForm";

export default function Login() {
  return (
    <div className="h-screen w-full flex">
      <div className="m-auto">
        <h1 className="font-bold text-3xl">Login</h1>
        <br />
        <LoginForm />
      </div>
    </div>
  );
}
