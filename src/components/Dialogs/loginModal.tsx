import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import useLoginModal from "../../hooks/loginModal";
import useRegisterModal from "../../hooks/registerModal";
import apiCall from "../../utils/api";
import Button from "../Button";
import Input from "../Input";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onHandleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onHandleLogin = async () => {
    setLoading(true);

    try {
      const response = await apiCall("user/login", "POST", formData);
      console.log("Login successful:", response);
      localStorage.setItem("auth-token", response.token);
      setLoading(false);
      toast.success(response?.data?.message);
      loginModal.onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
      console.error("Login error:", error);
    }
  };
  return (
    <>
      {/* <RegisterModal open={openRegister} setOpen={setOpenRegister} /> */}
      <Transition appear show={loginModal.isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() => loginModal.onClose()}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-medium text-white"
                  >
                    Login
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50">
                    Welcome to rentomation!
                  </p>
                  <div className="space-y-2 mt-4">
                    <Input
                      placeholder="Email"
                      onChange={onHandleChange}
                      name="email"
                    />
                    <Input
                      placeholder="Password"
                      type="password"
                      onChange={onHandleChange}
                      name="password"
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      className="justify-center inline-flex items-center gap-2 bg-btnPrimary py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={() => onHandleLogin()}
                      label="Login"
                      loading={loading}
                    />
                  </div>
                  <div className="mt-4 ">
                    <p className="text-white text-sm">
                      Dont have an account?{" "}
                      <span
                        className="text-btnPrimary cursor-pointer hover:underline"
                        onClick={() => {
                          registerModal.onOpen();
                          loginModal.onClose();
                        }}
                      >
                        Register
                      </span>
                    </p>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoginModal;
