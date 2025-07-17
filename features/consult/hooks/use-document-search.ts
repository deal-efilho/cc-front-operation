import { create } from 'zustand'

export type DocumentType = "CPF" | "PASSAPORTE" | "CNE" | "IDENTIDADE" | "CNPJ"

interface DocumentSearchState {
  selectedType: DocumentType
  documentValue: string
  setSelectedType: (type: DocumentType) => void
  setDocumentValue: (value: string) => void
}

export const applyCPFMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '')
  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const applyCNPJMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '')
  return numbers
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const useDocumentStore = create<DocumentSearchState>((set) => ({
  selectedType: "CPF",
  documentValue: "",
  setSelectedType: (type: DocumentType) => set({ selectedType: type, documentValue: "" }),
  setDocumentValue: (value: string) => set({ documentValue: value }),
}))