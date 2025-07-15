"use client"

import { Card, CardContent, StarRating } from "@mfe/cc-front-shared";
import { ActionButtons } from "../action-buttons/action-buttons";
import { useModal } from "@/hooks/use-modal";
import { ClientDetailsModal } from "../client-details-modal/client-details-modal";

interface UserInfoProps {
  nome: string;
  classificacao: number;
  usuarioUltimaAtualizacao: string;
  dataUltimaAtualizacao: string;
  diferencial: number;
}

function UserInfo({
  nome,
  classificacao,
  usuarioUltimaAtualizacao,
  dataUltimaAtualizacao,
  diferencial
}: UserInfoProps) {
  const clientDetailsModal = useModal()

  const handleNomeClick = () => {
    clientDetailsModal.open()
  };

  const handleSelecionar = () => {
    console.log('Selecionar clicked');
  };

  const handleHistorico = () => {
    console.log('Histórico clicked');
  };

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Informações do usuário */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-sm font-medium">Nome: </span>
                  <button
                    onClick={handleNomeClick}
                    className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer transition-colors"
                  >
                    {nome}
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">Classificação: </span>
                  <StarRating filledStars={classificacao} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium">Usuário da última atualização: </span>
                  <span>{usuarioUltimaAtualizacao}</span>
                </div>
                <div>
                  <span className="font-medium">Data da última atualização: </span>
                  <span>{dataUltimaAtualizacao}</span>
                </div>
              </div>

              <div className="text-sm">
                <span className="font-medium">% Diferencial: </span>
                <span>{diferencial.toFixed(2)} %</span>
              </div>
            </div>

            {/* Valor disponível */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Valor Disponível
                </h3>
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="font-medium">Compra: </span>
                    <span className="text-blue-600 font-semibold">R$ 123.204,49</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Venda: </span>
                    <span className="text-red-600 font-semibold">R$ 83.016,50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ActionButtons
            onSelecionar={handleSelecionar}
            onHistorico={handleHistorico}
          />
        </CardContent>
      </Card>

      <ClientDetailsModal
        isOpen={clientDetailsModal.isOpen}
        onClose={clientDetailsModal.close}
        clientName={nome}
      />
    </>
  );
}

export { UserInfo };