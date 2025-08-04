import {
  Tooltip as TooltipUi,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipProps {
  message: string;
  isOpen: boolean;
  children: ReactNode
}

export const Tooltip = ({ message, isOpen, children }: TooltipProps) => (
  <TooltipUi open={isOpen}>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent>
      <p>{message}</p>
    </TooltipContent>
  </TooltipUi>
);
