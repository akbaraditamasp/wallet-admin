import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { FiLock, FiUser } from "react-icons/fi";
import Alert from "../components/Alert";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import service from "../service";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { WebContext } from "../components/Layout";

export default function Login() {
  const [cookies, setCookies] = useCookies(["token"]);
  const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { setLoading, state: { loading } = {} } = useContext(WebContext);

  const login = ({ username, password }) => {
    setLoading(true);
    service
      .get("/admin/login", {
        params: {
          username,
          password,
        },
      })
      .then((response) => {
        setCookies("token", response.data.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        });
        setLoading(false);
        setSuccess(true);
      })
      .catch((e) => {
        setFail(true);
        setLoading(false);
      });
  };

  if (success) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="bg-background min-h-screen flex justify-center items-center">
      <div className="w-full lg:w-3/4 xl:w-3/5 flex rounded bg-white-100 h-96 m-8">
        <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 justify-center items-center">
          <img src="/logo.png" className="h-1/2 w-auto" />
        </div>
        <div className="flex-1 p-8 border-l border-white-200">
          <h1 className="montserrat-alternates text-black-100 font-bold text-2xl">
            Login
          </h1>
          <h2>Silahkan masuk ke akun anda</h2>
          <form className="mt-6" onSubmit={handleSubmit(login)}>
            {fail && (
              <Alert className="mb-3 text-center">Autentikasi gagal</Alert>
            )}
            <TextInput
              left={<FiUser size={16} />}
              placeholder="Username"
              type="text"
              containerClassName="mb-3"
              {...register("username", { required: true })}
            />
            <TextInput
              left={<FiLock size={16} />}
              placeholder="Password"
              type="password"
              containerClassName="mb-3"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
