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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RegisterModal = () => {
  const [loading, setLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      city: "",
      cnic: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setLoading(true);
    try {
      const response = await apiCall("user/register", "POST", data);
      console.log(response);
      toast.success(response?.message);
      setLoading(false);
      registerModal.onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={registerModal.isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() => registerModal.onClose()}
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
                    Register
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-neutral-400">
                    Create your account!
                  </p>
                  <div className="space-y-4 mt-4">
                    <Input
                      placeholder="Username"
                      name="username"
                      id="username"
                      required
                      label="Username"
                      register={register}
                      disabled={loading}
                      errors={errors}
                    />
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
                      placeholder="Cnic Number"
                      name="cnic"
                      id="cnic"
                      required
                      label="Cnic"
                      register={register}
                      disabled={loading}
                      errors={errors}
                    />
                    <Input
                      placeholder="City"
                      name="city"
                      id="city"
                      required
                      label="City"
                      register={register}
                      disabled={loading}
                      errors={errors}
                    />
                    <Input
                      placeholder="Password"
                      name="password"
                      id="password"
                      required
                      label="Password"
                      register={register}
                      disabled={loading}
                      errors={errors}
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      className="justify-center inline-flex items-center gap-2 bg-btnPrimary px-3 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={handleSubmit(onSubmit)}
                      label="Register"
                      loading={loading}
                    />
                  </div>
                  <div className="mt-4 ">
                    <p className="text-black text-sm">
                      Already have an account?{" "}
                      <span
                        className="text-btnPrimary cursor-pointer hover:underline hover:text-[#0A142F]"
                        onClick={() => {
                          loginModal.onOpen();
                          registerModal.onClose();
                        }}
                      >
                        Login
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

export default RegisterModal;
