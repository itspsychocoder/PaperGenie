import { create } from 'zustand'

const useStore = create((set) => ({
  name: "psycho",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
  userId: "",
  SetName: (name) => set({ name }),
  SetEmail: (email) => set({ email }),
  SetAvatar: (avatar) => set({ avatar }),
  SetUserId: (userId) => set({ userId }),
}))

export default useStore