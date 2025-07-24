import { create } from 'zustand'

const useStore = create((set) => ({
  username: "psycho",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
  inc: () => set((state) => ({ count: state.count + 1 })),
}))

export default useStore