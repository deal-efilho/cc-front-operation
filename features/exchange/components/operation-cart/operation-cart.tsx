"use client";

import { useState } from "react";
import { Button, Card, CardContent, Label } from "@mfe/cc-front-shared";
import { SaveIcon, EditIcon, MailIcon, TrashIcon, Trash2Icon } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { CheckboxField } from "@/components/ui/checkbox-field";

export interface OperationItem {
  id: string;
  operacao: "COMPRA" | "VENDA";
  moedaOperacional: string;
  quantidade: number;
  taxaNegociada: number;
  valorOperacao: number;
  taxaAdministrativa: number;
  iof: number;
  valorTotal: number;
  vet: number;
  corporate: boolean;
}

interface OperationsCartProps {
  operations: OperationItem[];
  onRemove: (id: string) => void;
  onSave: () => void;
  onRegister: () => void;
  getTotalValue: () => number;
  getTotalType: () => string;
  getAbsoluteTotalValue: () => number;
}

export function OperationsCart({
  operations,
  onRemove,
  onSave,
  onRegister,
  getTotalValue,
  getTotalType,
  getAbsoluteTotalValue,
}: OperationsCartProps) {
  const [cartaoDebitoChecked, setCartaoDebitoChecked] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: "remove";
    data: string;
  } | null>(null);

  const confirmationModal = useModal();
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const generateEmailBody = () => {
    const currentDate = new Date().toLocaleDateString('pt-BR');
    const currentTime = new Date().toLocaleTimeString('pt-BR');

    let emailBody = `Assunto: Cotação de Câmbio - ${currentDate}\n\n`;
    emailBody += `Prezado(a) Cliente,\n\n`;
    emailBody += `Segue abaixo a cotação solicitada em ${currentDate} às ${currentTime}:\n\n`;
    emailBody += `RESUMO DAS OPERAÇÕES:\n`;
    emailBody += `${'='.repeat(50)}\n\n`;

    operations.forEach((operation, index) => {
      emailBody += `OPERAÇÃO ${index + 1}:\n`;
      emailBody += `• Tipo: ${operation.operacao}\n`;
      emailBody += `• Moeda: ${operation.moedaOperacional}\n`;
      emailBody += `• Quantidade: ${operation.quantidade.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
      emailBody += `• Taxa Negociada: R$ ${operation.taxaNegociada.toFixed(5).replace('.', ',')}\n`;
      emailBody += `• Valor da Operação: ${formatCurrency(operation.valorOperacao)}\n`;
      emailBody += `• Taxa Administrativa: ${formatCurrency(operation.taxaAdministrativa)}\n`;
      emailBody += `• IOF: ${formatCurrency(operation.iof)}\n`;
      emailBody += `• Valor Total: ${formatCurrency(operation.valorTotal)}\n`;
      emailBody += `• V.E.T: ${operation.vet.toFixed(5)}\n`;
      emailBody += `• Corporate: ${operation.corporate ? 'Sim' : 'Não'}\n\n`;
    });

    emailBody += `${'='.repeat(50)}\n`;
    emailBody += `TOTAL GERAL: ${formatCurrency(getAbsoluteTotalValue())} (${getTotalType()})\n`;
    emailBody += `${'='.repeat(50)}\n\n`;

    emailBody += `OBSERVAÇÕES IMPORTANTES:\n`;
    emailBody += `• Esta cotação é válida por 24 horas\n`;
    emailBody += `• Valores sujeitos a alteração conforme variação do mercado\n`;
    emailBody += `• Para efetivação da operação, compareça à agência com documentos\n`;
    emailBody += `• Dúvidas: entre em contato conosco\n\n`;

    emailBody += `Atenciosamente,\n`;
    emailBody += `Equipe de Câmbio\n`;
    emailBody += `${currentDate} - ${currentTime}`;

    return emailBody;
  };

  const handleCopyClick = async () => {
    try {
      const emailBody = generateEmailBody();
      await navigator.clipboard.writeText(emailBody);

      // Feedback visual (você pode implementar um toast aqui)
      console.log('Email copiado para o clipboard!');

      // Opcional: mostrar uma notificação temporária
      alert('Corpo do email copiado para o clipboard!');
    } catch (err) {
      console.error('Erro ao copiar para o clipboard:', err);
      alert('Erro ao copiar para o clipboard. Tente novamente.');
    }
  };

  const handleRemoveClick = (id: string) => {
    setPendingAction({ type: "remove", data: id });
    confirmationModal.open();
  };

  const handleConfirmAction = () => {
    if (pendingAction) {
      onRemove(pendingAction.data);
      setPendingAction(null);
    }
  };

  const handleCancelAction = () => {
    setPendingAction(null);
    confirmationModal.close();
  };

  const getConfirmationMessage = () => {
    return "Deseja realmente remover esta operação do carrinho?";
  };

  if (operations.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-4">
            <Label className="text-lg font-semibold">
              Carrinho de Operações
            </Label>
          </div>

          {/* DataTable sem paginação */}
          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    Operação
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    Moeda Operacional
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    Quantidade
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    Taxa Negociada
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    Valor Operação
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    Taxa Administrativa
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    IOF
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    Valor Total
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    V.E.T
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    Corporate
                  </th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {operations.map((operation, index) => (
                  <tr
                    key={operation.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border-b px-3 py-2 text-sm">
                      <span
                        className={
                          operation.operacao === "VENDA"
                            ? "text-red-600 font-medium"
                            : "text-green-600 font-medium"
                        }
                      >
                        {operation.operacao.charAt(0) +
                          operation.operacao.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      {operation.moedaOperacional}
                    </td>
                    <td className="border-b px-3 py-2 text-sm font-medium">
                      ${operation.quantidade.toFixed(2)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      R$ {operation.taxaNegociada.toFixed(5).replace(".", ",")}
                    </td>
                    <td className="border-b px-3 py-2 text-sm font-medium">
                      {formatCurrency(operation.valorOperacao)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      {formatCurrency(operation.taxaAdministrativa)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      {formatCurrency(operation.iof)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm font-bold">
                      {formatCurrency(operation.valorTotal)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      {operation.vet.toFixed(5)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      {operation.corporate ? "Sim" : "Não"}
                    </td>
                    <td className="border-b px-3 py-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyClick}
                          className="h-8 w-8 p-0"
                          title="Copiar email para clipboard"
                        >
                          <MailIcon className="size-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveClick(operation.id)}
                          className="h-8 w-8 p-0"
                          title="Remover"
                        >
                          <Trash2Icon className="size-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer com totais */}
          <div className="flex justify-between items-center pt-4 border-t">
            <CheckboxField
              id="cartaoDebito"
              checked={cartaoDebitoChecked}
              onCheckedChange={setCartaoDebitoChecked}
              disabled
              label="Propostas criadas para cancelamento de Cartão de Débito"
            />

            <div className="text-lg font-bold">
              Total {getTotalType()}{" "}
              {formatCurrency(getAbsoluteTotalValue()).replace("R$ ", "")}
            </div>
          </div>

          {/* Botões movidos para baixo */}
          <div className="flex justify-end items-center pt-4">
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={onSave}
                className="flex items-center gap-2"
              >
                <SaveIcon className="size-4" />
                Salvar / Incluir Proposta
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onRegister}
                className="flex items-center gap-2"
              >
                <EditIcon className="size-4" />
                Registrar Cotação
              </Button>
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={handleCancelAction}
          onConfirm={handleConfirmAction}
          title="Confirmar Remoção"
          message={getConfirmationMessage()}
          confirmText="Remover"
          cancelText="Cancelar"
          variant="danger"
        />
      </CardContent>
    </Card>
  );
}