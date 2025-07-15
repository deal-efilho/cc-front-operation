"use client"

import { useState } from "react"
import { DownloadIcon, XIcon } from "lucide-react"
import { Button } from "@mfe/cc-front-shared"
import { DataTable } from "@/components/ui/data-table"
import { BaseModal } from "@/components/ui/base-modal"
import { historyColumns } from "./history-table-columns"
import { historyMockData, type HistoryColumn } from "../../mocks/history-data"

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
  clientName?: string
}

const PAGE_SIZE = 10;

export function HistoryModal({
  isOpen,
  onClose,
  clientName = "Cliente"
}: HistoryModalProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const handleClose = () => {
    setCurrentPage(1)
    onClose()
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleExport = () => {
    console.log('Exportar histórico')
    // Implementar exportação
  }

  // Simular paginação dos dados mock
  const totalItems = historyMockData.length
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const currentData = historyMockData.slice(startIndex, endIndex)

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Consultar Histórico do Cliente nos últimos 12 meses`}
      description="Visualize o histórico de operações de câmbio do cliente"
      size="2xl"
    >
      <div className="px-6 pt-4 pb-6">
        {/* Header com botões de ação */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            Total de {totalItems} operações encontradas
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <DownloadIcon className="size-4" />
              Exportar
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <XIcon className="size-4" />
              Fechar
            </Button>
          </div>
        </div>

        {/* Tabela */}
        <div className="border rounded-lg">
          <DataTable
            data={currentData as HistoryColumn[]}
            columns={historyColumns}
            id="history"
            page={currentPage}
            pageSize={PAGE_SIZE}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </BaseModal>
  )
}