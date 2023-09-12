import { createContext } from 'react'
import type { StoreApi } from 'zustand';
import { createStore } from 'zustand'

type BearProps = {
  name: string,
  changeName: (name: string) => void
}

export const BaseStoreContext = createContext<StoreApi<BearProps> | null>(null)

export const createBearStore = (initProps?: Partial<BearProps>) => {
  const DEFAULT_PROPS = {
    name: '19Qingfeng',
  }
  return createStore<BearProps>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    changeName: (name: string) => {
      set((state) => ({ name }))
    },
  }))
}