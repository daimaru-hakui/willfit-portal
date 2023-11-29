import { News, User } from "@/type";
import { create } from "zustand";

interface NewsUser extends News {
  user: User;
}

type useState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  newsList: NewsUser[] ;
  setNewsList: (newsList: NewsUser[]) => void;
};

export const useStore = create<useState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  newsList: [],
  setNewsList: (newsList) => set({ newsList }),
}));
