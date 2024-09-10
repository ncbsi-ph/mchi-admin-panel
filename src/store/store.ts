import { create } from 'zustand';

interface itemsType {
  title: string;
  href?: string;
}
interface BreadcrumbProps {
  items: Array<itemsType>;
  actions: {
    setItems: (items: Array<itemsType>) => void;
  };
}
const useBreadcrumbStore = create<BreadcrumbProps>((set) => ({
  items: [],
  actions: {
    setItems: (items: Array<itemsType>) => set(() => ({ items: items })),
  },
}));
export const useBreadcrumb = () => useBreadcrumbStore((state) => state.items);
export const useBreadcrumbActions = () =>
  useBreadcrumbStore((state) => state.actions);

interface UserStoreProps {
  username: string | null;
  role: string | null;
  token: string;
  actions: {
    setUser: (username: string, role: string, token: string) => void;
    removeUser: () => void;
  };
}

const useUserStore = create<UserStoreProps>((set) => ({
  username: null,
  role: '',
  token: '',
  actions: {
    setUser: (username: string, role: string, token: string) =>
      set(() => ({
        username: username,
        role: role,
        token: token,
      })),
    removeUser: () => set(() => ({ username: null, role: null, token: '' })),
  },
}));

export const useUser = () => useUserStore((state) => state);
export const useUserActions = () => useUserStore((state) => state.actions);
