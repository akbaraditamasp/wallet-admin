import * as Sidebar from "./Sidebar";
import {
  FiDollarSign,
  FiHome,
  FiMenu,
  FiX,
  FiLogOut,
  FiList,
} from "react-icons/fi";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import TextInput from "./TextInput";
import { Controller, useForm } from "react-hook-form";
import NumberInput from "./NumberInput";
import Button from "./Button";
import service from "../service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

const MySwal = withReactContent(Swal);

export const WebContext = createContext(null);

export default function Layout({
  active = "Dashboard",
  pageTitle = "Dashboard",
  children,
}) {
  const [menuShown, setMenuShown] = useState(false);
  const _modalRef = useRef(null);
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      code: "",
      amount: null,
    },
  });
  const { state, setLoading } = useContext(WebContext);
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const [unauthorized, setUnauthorized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
  }, [cookies]);

  useEffect(() => {
    if (!mounted) {
      if (cookies.token) {
        service.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${cookies.token}`;
      } else {
        service.defaults.headers.common["Authorization"] = null;
        setUnauthorized(true);
      }
      setMounted(true);
    }
  }, [mounted]);

  const logout = () => {
    setLoading(true);
    service
      .delete("/admin/logout")
      .then((response) => {
        removeCookies("token", {
          path: "/",
          maxAge: 0,
        });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const process = (data) => {
    setLoading(true);
    service
      .post("/transaction/withdraw", data)
      .then((response) => {
        setLoading(false);
        reset({
          username: "",
          code: "",
          amount: null,
        });
        _modalRef.current.hide();
        MySwal.fire("Berhasil", "Penarikan berhasil diproses", "success");
      })
      .catch(() => {
        setLoading(false);
        MySwal.fire(
          "Oops!",
          "Terjadi kesalahan saat memproses data. Silahkan periksa kembali",
          "error"
        );
      });
  };

  if (unauthorized && mounted) {
    return <Redirect to="/login" />;
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen overflow-auto flex bg-background">
      {menuShown && (
        <div
          className="bg-black-100 z-30 opacity-50 position fixed top-0 left-0 w-full h-screen block lg:hidden"
          onClick={() => {
            setMenuShown(false);
          }}
        ></div>
      )}
      <Modal ref={_modalRef} title="Proses Penarikan">
        <form onSubmit={handleSubmit(process)}>
          <TextInput
            label="Username"
            type="text"
            containerClassName="mb-3"
            {...register("username", { required: true })}
          />
          <TextInput
            label="Kode"
            type="text"
            containerClassName="mb-3"
            {...register("code", { required: true })}
          />
          <Controller
            control={control}
            name="amount"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <NumberInput
                label="Jumlah"
                value={value}
                onValueChange={({ value }) => onChange(parseInt(value))}
              />
            )}
          />
          <Button type="submit" disabled={state.loading} className="mt-3">
            Proses Penarikan
          </Button>
        </form>
      </Modal>
      <div
        className={
          "w-11/12 md:w-64 bg-white-100 h-full overflow-auto flex flex-col border-r border-white-300 fixed lg:static top-0 left-0 z-30 transform transition-all duration-300 " +
          (menuShown
            ? "-translate-x-0"
            : "-translate-x-full" + " lg:translate-x-0")
        }
      >
        <div className="mb-5 h-16 border-b border-white-200 flex items-center">
          <h1 className="text-xl montserrat-alternates p-5 font-bold flex-1">
            e-Wallet
          </h1>
          <button
            className="w-8 h-8 mr-3 flex lg:hidden justify-center items-center text-black-400"
            type="button"
            onClick={() => {
              setMenuShown(false);
            }}
          >
            <FiX />
          </button>
        </div>
        <Sidebar.Wrapper>
          <Sidebar.List
            to="/dashboard"
            icon={FiHome}
            active={active === "Dashboard"}
          >
            Dashboard
          </Sidebar.List>
          <Sidebar.List
            to="/dashboard/transaction"
            icon={FiList}
            active={active === "Transaksi"}
          >
            Transaksi
          </Sidebar.List>
          <Sidebar.List
            to="#"
            icon={FiDollarSign}
            onClick={(e) => {
              e.preventDefault();
              _modalRef.current.show();
            }}
          >
            Proses Penarikan
          </Sidebar.List>
          <Sidebar.List
            to="#"
            icon={FiLogOut}
            onClick={(e) => {
              e.preventDefault();
              MySwal.fire({
                title: "Kamu yakin?",
                text: "Kamu akan keluar dari akun ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Lanjutkan",
                cancelButtonText: "Batal",
              }).then((response) => {
                if (response.isConfirmed) {
                  logout();
                }
              });
            }}
          >
            Keluar
          </Sidebar.List>
        </Sidebar.Wrapper>
      </div>
      <div className="flex-1 overflow-auto min-h-screen flex flex-col">
        <div className="h-16 bg-white-100 border-b border-white-200 flex items-center p-5 sticky">
          <button
            className="w-8 h-8 mr-3 flex lg:hidden justify-center items-center"
            type="button"
            onClick={() => {
              setMenuShown(true);
            }}
          >
            <FiMenu />
          </button>
          <h1 className="font-bold text-lg">{pageTitle}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
