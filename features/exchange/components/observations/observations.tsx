"use client"

import { Card, CardContent, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mfe/cc-front-shared";

const SITUACOES_RECEITA = [
  { value: "regular", label: "Regular" },
  { value: "pendente", label: "Pendente de Regularização" },
  { value: "cancelado", label: "Suspenso/Cancelado" },
];

interface ObservationsProps {
  situacaoReceita: string;
  onSituacaoChange?: (value: string) => void;
}

function Observations({ situacaoReceita, onSituacaoChange }: ObservationsProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Observações:</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="situacaoReceita" className="text-sm">
              Situação na Receita:
            </Label>
            <div className="flex items-center gap-2">
              <Select value={situacaoReceita} onValueChange={onSituacaoChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SITUACOES_RECEITA.map((situacao) => (
                    <SelectItem key={situacao.value} value={situacao.value}>
                      {situacao.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button className="text-blue-600 hover:text-blue-800 text-sm underline">
                Validar no site da receita, clique aqui
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { Observations };