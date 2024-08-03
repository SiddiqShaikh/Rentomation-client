import {create} from 'zustand'

interface UserStatusStore{
    isLoggedIn: boolean;
    setUser: () => void;
    clearUser: () => void;
}

const useUserStatus = create<UserStatusStore>((set)=>({
    isLoggedIn:false,
    clearUser: () => set({ isLoggedIn: false }),
    setUser: () => set({ isLoggedIn: true }),
}))

export default useUserStatus;