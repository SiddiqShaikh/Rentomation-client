import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";

interface IModal {
    title: string
    subtitle?: string
    bodyContent: React.ReactNode
    footerContent: React.ReactNode;
    openModal: boolean;
    // onOpenModal: () => void;
    onCloseModal: () => void;

}
const Modal: React.FC<IModal> = ({ title, subtitle, bodyContent, footerContent, onCloseModal, openModal }) => {
    return (
        <>
            <Transition appear show={openModal}>
                <Dialog
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={() => onCloseModal()}
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
                                <DialogPanel className="w-full max-w-xl rounded-xl bg-white p-6 backdrop-blur-2xl shadow-md">
                                    <DialogTitle
                                        as="h3"
                                        className="text-xl font-medium text-black/80"
                                    >
                                        {title ?? "Modal"}
                                    </DialogTitle>
                                    <p className="mt-2 text-sm/6 text-black/50">
                                        {subtitle}
                                    </p>
                                    <div className="space-y-2 mt-4">
                                        {bodyContent}
                                    </div>
                                    {footerContent}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Modal;
