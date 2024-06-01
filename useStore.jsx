import { create } from "zustand";

const useStore = create(set => ({
    currency: "$",
    changeCurrency: (value) => set((state) => ({
        currency: value
    }))
}));

export default useStore;
