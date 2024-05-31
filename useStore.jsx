import { create } from "zustand";

const useStore = create(set => ({
    currency: "$",
}));


export default useStore;