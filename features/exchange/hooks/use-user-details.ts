import { create } from 'zustand'

interface UserDetailsData {
  nome: string;
  classificacao: number;
  usuarioUltimaAtualizacao: string;
  dataUltimaAtualizacao: string;
  diferencial: number;
  valorDisponivelCompra: number;
  valorDisponivelVenda: number;
  situacaoReceita: string;
}

interface UserDetailsState {
  userDetails: UserDetailsData;
  isVisible: boolean;
  setUserDetails: (data: Partial<UserDetailsData>) => void;
  showUserDetails: () => void;
  hideUserDetails: () => void;
  resetUserDetails: () => void;
}

const initialUserDetails: UserDetailsData = {
  nome: 'Valentina Maria',
  classificacao: 0,
  usuarioUltimaAtualizacao: 'rpereira',
  dataUltimaAtualizacao: '03/06/2025',
  diferencial: 0.00,
  valorDisponivelCompra: 123204.49,
  valorDisponivelVenda: 83016.50,
  situacaoReceita: 'regular'
};

export const useUserDetailsStore = create<UserDetailsState>((set) => ({
  userDetails: initialUserDetails,
  isVisible: false,

  setUserDetails: (data) => {
    set((state) => ({
      userDetails: { ...state.userDetails, ...data }
    }));
  },

  showUserDetails: () => {
    set({ isVisible: true });
  },

  hideUserDetails: () => {
    set({ isVisible: false });
  },

  resetUserDetails: () => {
    set({
      userDetails: initialUserDetails,
      isVisible: false
    });
  }
}));