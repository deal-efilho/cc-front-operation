"use client"

import { Button, StarRating } from "@mfe/cc-front-shared"
import { BaseModal } from "@/components/ui/base-modal"

interface ClientDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  clientName?: string
}

export function ClientDetailsModal({
  isOpen,
  onClose,
  clientName = "Valentina Maria"
}: ClientDetailsModalProps) {
  // Dados mockados baseados nas imagens
  const clientData = {
    grauRisco: "Baixíssimo",
    cpf: "051.671.541-03",
    nome: "Valentina Maria",
    tipoDocumento: "RG",
    numeroDocumento: "3442519",
    orgaoEmissor: "",
    situacao: "Ativo",
    taxaEspecial: "0,00 %",
    indicadoPor: "Padrão Confidence",
    telResidencial: "(61) 9212-0313",
    telCelular: "(61) 99212-0313",
    telComercial: "()",
    email: "letheleni@gmail.com",
    nomeFiliacaoUm: "",
    nomeFiliacaoDois: "",
    comercialResponsavel: "",
    pepTitular: "Não",
    pepFamiliar: "Não",
    pepRelacionado: "Não",
    classificacao: 0,
    limiteIntraday: "R$ 1,00",
    valorDisponivelCompra12Meses: "R$ 140.000,00",
    valorDisponivelCompraOperar: "R$ 123.284,49",
    valorDisponivelVenda12Meses: "R$ 140.000,00",
    valorDisponivelVendaOperar: "R$ 83.016,50",
    dataNascimento: "22/08/1996",
    outrosContatos: "",
    empresas: "",
    cargo: "",
    profissao: "Outras ocupações não especificadas anteriormente",
    sexo: "",
    estadoCivil: "",
    observacao: ""
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Pessoa Física - Brasileiro"
      description="Detalhes completos do cliente"
      size="xl"
    >
      <div className="px-6 pt-4 pb-6 space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Primeira seção - Dados básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Grau de Risco: </span>
            <span>{clientData.grauRisco}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">CPF: </span>
            <span className="font-mono">{clientData.cpf}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Nome: </span>
            <span className="font-medium">{clientData.nome}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Tipo de documento: </span>
            <span>{clientData.tipoDocumento}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Número documento: </span>
            <span>{clientData.numeroDocumento}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Órgão Emissor: </span>
            <span>{clientData.orgaoEmissor || "-"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Situação: </span>
            <span className="text-green-600 font-medium">{clientData.situacao}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Taxa especial: </span>
            <span>{clientData.taxaEspecial}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Indicado por: </span>
            <span>{clientData.indicadoPor}</span>
          </div>
        </div>

        {/* Seção de contatos */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Tel. Residencial: </span>
              <span>{clientData.telResidencial}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Tel. Celular: </span>
              <span>{clientData.telCelular}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Tel. Comercial: </span>
              <span>{clientData.telComercial}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">E-mail: </span>
              <span className="text-blue-600">{clientData.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Nome da filiação 1: </span>
              <span>{clientData.nomeFiliacaoUm || "-"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Nome da filiação 2: </span>
              <span>{clientData.nomeFiliacaoDois || "-"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Comercial Responsável: </span>
              <span>{clientData.comercialResponsavel || "-"}</span>
            </div>
          </div>
        </div>

        {/* Seção PEP e Classificação */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Pep Titular: </span>
              <span>{clientData.pepTitular}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Pep Familiar: </span>
              <span>{clientData.pepFamiliar}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Pep Relacionado: </span>
              <span>{clientData.pepRelacionado}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">Classificação: </span>
              <StarRating filledStars={clientData.classificacao} />
            </div>
          </div>
        </div>

        {/* Seção de valores e limites */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Limite Intraday: </span>
              <span className="font-medium text-blue-600">{clientData.limiteIntraday}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Valor Disponível Compra (12 meses): </span>
              <span className="font-medium text-blue-600">{clientData.valorDisponivelCompra12Meses}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Valor disponível de compra para operar: </span>
              <span className="font-medium text-blue-600">{clientData.valorDisponivelCompraOperar}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Valor Disponível Venda (12 meses): </span>
              <span className="font-medium text-red-600">{clientData.valorDisponivelVenda12Meses}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Valor disponível de venda para operar: </span>
              <span className="font-medium text-red-600">{clientData.valorDisponivelVendaOperar}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Data de Nascimento: </span>
              <span>{clientData.dataNascimento}</span>
            </div>
          </div>
        </div>

        {/* Seção de informações adicionais */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Outros Contatos: </span>
              <span>{clientData.outrosContatos || "-"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Empresas: </span>
              <span>{clientData.empresas || "-"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Cargo: </span>
              <span>{clientData.cargo || "-"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Profissão: </span>
              <span>{clientData.profissao}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Sexo: </span>
              <span>{clientData.sexo || "-"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Estado civil: </span>
              <span>{clientData.estadoCivil || "-"}</span>
            </div>
          </div>
        </div>

        {/* Seção de observação */}
        <div className="border-t pt-4">
          <div className="text-sm">
            <span className="font-medium text-gray-600">Observação: </span>
            <span>{clientData.observacao || "-"}</span>
          </div>
        </div>

        {/* Botão de fechar */}
        <div className="border-t pt-4 flex justify-end">
          <Button
            onClick={onClose}
            variant="primary"
          >
            Fechar
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}