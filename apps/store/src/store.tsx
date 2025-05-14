import { create } from 'zustand'

interface PriceCount {
  price: number
  increment: () => void
  reset: () => void
}

const useStore = create<PriceCount>((set) => ({
  price: 0,
  increment: () => set((state) => ({ price: state.price + 1 })),
  reset: () => set({ price: 0 }),
}))

export default useStore
