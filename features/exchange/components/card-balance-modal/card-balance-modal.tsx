import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label
} from "@mfe/cc-front-shared"
import { SearchIcon, CheckIcon, XIcon } from "lucide-react"

interface CardBalanceModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (cardNumber: string) => void
  currencyLabel: string
}

export function CardBalanceModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  currencyLabel 
}: CardBalanceModalProps) {
  const [cardNumber, setCardNumber] = useState({
    part1: "",
    part2: "",
    part3: "",
    part4: ""
  })
  const [isVerifying, setIsVerifying] = useState(false)

  const handleInputChange = (part: keyof typeof cardNumber, value: string) => {
    // Permitir apenas números e limitar a 4 dígitos
    const numericValue = value.replace(/\D/g, '').slice(0, 4)
    
    setCardNumber(prev => ({
      ...prev,
      [part]: numericValue
    }))

    // Auto-focus no próximo campo quando completar 4 dígitos
    if (numericValue.length === 4) {
      const nextField = getNextField(part)
      if (nextField) {
        const nextInput = document.querySelector(`input[name="${nextField}"]`) as HTMLInputElement
        nextInput?.focus()
      }
    }
  }

  const getNextField = (currentPart: keyof typeof cardNumber) => {
    const fields = ['part1', 'part2', 'part3', 'part4']
    const currentIndex = fields.indexOf(currentPart)
    return currentIndex < fields.length - 1 ? fields[currentIndex + 1] : null
  }

  const handleVerifyBalance = async () => {
    setIsVerifying(true)
    
    // Simular verificação de saldo
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const fullCardNumber = `${cardNumber.part1}-${cardNumber.part2}-${cardNumber.part3}-${cardNumber.part4}`
    onConfirm(fullCardNumber)
    setIsVerifying(false)
  }

  const handleCancel = () => {
    setCardNumber({ part1: "", part2: "", part3: "", part4: "" })
    setIsVerifying(false)
    onClose()
  }

  const isCardNumberComplete = Object.values(cardNumber).every(part => part.length === 4)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" noCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">i</span>
            </div>
            Saldo de Cartão
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-sm text-gray-600">
            Produto: <span className="font-medium">{currencyLabel} CONFIDENCE MULTI MOEDA PLATINUM</span>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              <span className="text-red-500">*</span> Número do Cartão
            </Label>
            
            <div className="flex items-center gap-2">
              <Input
                name="part1"
                type="text"
                value={cardNumber.part1}
                onChange={(e) => handleInputChange('part1', e.target.value)}
                placeholder="0000"
                className="w-16 text-center font-mono text-sm"
                maxLength={4}
                disabled={isVerifying}
              />
              <span className="text-gray-400">-</span>
              <Input
                name="part2"
                type="text"
                value={cardNumber.part2}
                onChange={(e) => handleInputChange('part2', e.target.value)}
                placeholder="0000"
                className="w-16 text-center font-mono text-sm"
                maxLength={4}
                disabled={isVerifying}
              />
              <span className="text-gray-400">-</span>
              <Input
                name="part3"
                type="text"
                value={cardNumber.part3}
                onChange={(e) => handleInputChange('part3', e.target.value)}
                placeholder="0000"
                className="w-16 text-center font-mono text-sm"
                maxLength={4}
                disabled={isVerifying}
              />
              <span className="text-gray-400">-</span>
              <Input
                name="part4"
                type="text"
                value={cardNumber.part4}
                onChange={(e) => handleInputChange('part4', e.target.value)}
                placeholder="0000"
                className="w-16 text-center font-mono text-sm"
                maxLength={4}
                disabled={isVerifying}
              />
            </div>
          </div>

          <Button
            onClick={handleVerifyBalance}
            disabled={!isCardNumberComplete || isVerifying}
            variant="outline"
            className="w-full"
            size="sm"
          >
            <SearchIcon className="w-4 h-4 mr-2" />
            {isVerifying ? "Verificando..." : "Verificar Saldo do Cartão"}
          </Button>

          <hr className="border-gray-200" />

          <div className="flex gap-2 justify-end">
            <Button
              onClick={handleVerifyBalance}
              disabled={!isCardNumberComplete || isVerifying}
              size="sm"
            >
              <CheckIcon className="w-4 h-4 mr-1" />
              Ok
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
            >
              <XIcon className="w-4 h-4 mr-1" />
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}