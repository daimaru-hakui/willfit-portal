import { News, User } from "@/type";
import { create } from "zustand";


type useState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  newsList: (News & { user: User })[];
  setNewsList: (newsList: (News & { user: User })[] ) => void;
  newsLimit: (News & { user: User })[];
  setNewsLimit: (newsLimit: (News & { user: User })[]) => void;
};

export const useStore = create<useState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  newsList: [],
  setNewsList: (newsList) => set({ newsList }),
  newsLimit: [],
  setNewsLimit: (newsLimit) => set({ newsLimit }),
}));
