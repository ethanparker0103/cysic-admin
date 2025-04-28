import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


interface ILevelInfo {
  price: string | undefined;
  maxSupply: string | undefined;
  soldAmount: string | undefined;
  soldOut: boolean | undefined;

  id: string | undefined;
}


interface ValidatorResponse {
  levelInfos: {
    [id: string]: ILevelInfo;
  }
}


interface NftState {
  levelInfos: ValidatorResponse | undefined | null,

  setState: (updates: Partial<NftState>) => void;
  resetState: () => void;
}

const useNftPurchase = create<NftState>()(
  immer((set) => ({
    levelInfos: undefined,
    setState: (updates) => set((state) => {
      return {
        ...state,
        ...updates
      }
    }),
    resetState: () => set({ levelInfos: null })
  }))
);

export default useNftPurchase;