import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const response = await apiCall("user/login", "POST", data);
      console.log("Login successful:", response);
      localStorage.setItem("auth-token", response.token);
      setLoading(false);
      toast.success(response?.message);
      loginModal.onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
      console.error("Login error:", error);
    }
  };

  return (
    <>
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
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/90 p-6 ">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-medium text-black"
                  >
                    Login
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-neutral-400">
                    Welcome to rentomation!
                  </p>
                  <div className="space-y-2 mt-4">
                    <Input
                      placeholder="Email"
                      name="email"
                      id="email"
                      required
                      label="Email"
                      register={register}
                      disabled={loading}
                      errors={errors}
                    />
                    <Input
                      placeholder="Password"
                      name="password"
                      id="password"
                      required
                      label="password"
                      register={register}
                      disabled={loading}
                      errors={errors}
                      type="password"
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      className="justify-center inline-flex items-center gap-2 bg-btnPrimary px-3 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={handleSubmit(onSubmit)}
                      label="Login"
                      loading={loading}
                    />
                  </div>
                  <div className="mt-4 ">
                    <p className="text-black text-sm">
                      Dont have an account?{" "}
                      <span
                        className="text-btnPrimary cursor-pointer hover:underline hover:text-[#0A142F]"
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
