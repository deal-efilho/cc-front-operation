"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type ModalType = 'contact-selection' | 'history' | 'confirmation' | null

interface ModalContextType {
  currentModal: ModalType
  modalData: any
  openModal: (type: ModalType, data?: any) => void
  closeModal: () => void
  isModalOpen: (type: ModalType) => boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [currentModal, setCurrentModal] = useState<ModalType>(null)
  const [modalData, setModalData] = useState<any>(null)

  const openModal = (type: ModalType, data?: any) => {
    setCurrentModal(type)
    setModalData(data)
  }

  const closeModal = () => {
    setCurrentModal(null)
    setModalData(null)
  }

  const isModalOpen = (type: ModalType) => {
    return currentModal === type
  }

  return (
    <ModalContext.Provider
      value={{
        currentModal,
        modalData,
        openModal,
        closeModal,
        isModalOpen
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModalContext() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}

export function useContactSelectionModal() {
  const { openModal, closeModal, isModalOpen } = useModalContext()

  return {
    isOpen: isModalOpen('contact-selection'),
    open: (data?: any) => openModal('contact-selection', data),
    close: () => closeModal()
  }
}