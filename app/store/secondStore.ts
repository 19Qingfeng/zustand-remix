import { create } from 'zustand'

const useStore = create<{
  name: string;
  changeName: (name: string) => void
}>((set) => ({
  name: '19Qingfeng',
  changeName: (name: string) => set(() => ({ name })),
}))

export default useStore