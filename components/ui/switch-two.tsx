"use client"

import { useId } from "react"
import { Switch } from "@/components/ui/switch"

interface SwitchTwoProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function SwitchTwo({ checked, onCheckedChange }: SwitchTwoProps) {
  const id = useId()

  const toggleSwitch = () => onCheckedChange(!checked)

  return (
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={toggleSwitch}
    />
  )
}