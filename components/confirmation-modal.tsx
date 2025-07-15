"use client"

import { Button } from "@mfe/cc-front-shared"
import { BaseModal } from "@/components/ui/base-modal"
import { AlertTriangleIcon } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = 'warning'
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <AlertTriangleIcon className="size-4 text-white" />,
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white'
        }
      case 'warning':
        return {
          icon: <AlertTriangleIcon className="size-4 text-white" />,
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white'
        }
      default:
        return {
          icon: <AlertTriangleIcon className="size-4 text-white" />,
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={message}
      size="sm"
      icon={styles.icon}
    >
      <div className="px-6 pt-4 pb-6">
        <div className="text-sm text-gray-600 mb-6">
          {message}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4 py-2"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={`px-4 py-2`}
            variant="primary"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}