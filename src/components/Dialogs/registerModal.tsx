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



const RegisterModal = () => {
  const [loading, setLoading] = useState(false);
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    city: "",
    cnic: "",
  });
  const onHandleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const onHandleRegister = async () => {
    setLoading(true);
    try {
      const response = await apiCall("user/register", "POST", formData);
      console.log(response);
      toast.success(response?.data?.message);
      setLoading(false);
      registerModal.onClose()
    } catch (error:any) {
      toast.error(error?.response?.data?.message) 
      setLoading(false);
    }
  };
  return (
    <>
      <Transition appear show={registerModal.isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() =>registerModal.onClose()}
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
                    Register
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50">
                    Create your account!
                  </p>
                  <div className="space-y-2 mt-4">
                    <Input
                      placeholder="Username"
                      name="username"
                      onChange={(e) => onHandleChange(e)}
                    />
                    <Input
                      placeholder="Email"
                      name="email"
                      onChange={(e) => onHandleChange(e)}
                    />
                    <Input
                      placeholder="Cnic Number"
                      name="cnic"
                      onChange={(e) => onHandleChange(e)}
                    />
                    <Input
                      placeholder="City"
                      name="city"
                      onChange={(e) => onHandleChange(e)}
                    />
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      className="justify-center inline-flex items-center gap-2 bg-btnPrimary py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={() => onHandleRegister()}
                      label="Register"
                      loading={loading}
                    />
                  </div>
                  <div className="mt-4 ">
                    <p className="text-white text-sm">
                      Already have an account?{" "}
                      <span
                        className="text-btnPrimary cursor-pointer hover:underline"
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
