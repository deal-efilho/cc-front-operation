"use client"

import { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@mfe/cc-front-shared"

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | "max",
  showIcon?: boolean
  icon?: ReactNode
}

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-4xl',
  '2xl': 'sm:max-w-7xl',
  "max": "max-w-max"
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showIcon = false,
  icon
}: BaseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`flex flex-col gap-0 overflow-y-visible p-0 ${sizeClasses[size]} [&>button:last-child]:top-3.5 max-h-[90vh]`} noCloseButton>
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base flex items-center gap-2">
            {showIcon && (
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                {icon || <span className="text-white text-xs">i</span>}
              </div>
            )}
            {title}
          </DialogTitle>
        </DialogHeader>

        {description && (
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        )}

        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}