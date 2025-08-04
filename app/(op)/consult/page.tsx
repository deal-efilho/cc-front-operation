"use client";
import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Card, CardContent, Heading } from "@mfe/cc-front-shared";

import {
  FieldFirstLine,
  FieldSecondLine,
  FieldThirdLine,
  FieldFourLine,
  FilterResponse,
} from "@/features/consult/layouts";
import { usetextAssistenceStore } from "@/features/consult/hooks";
import { CancelProposalModal, ViewProposalModal } from "@/features/consult/components";

const ConsultPage = () => {
  const [filter, setFilter] = useState(false);

  const { textAssistenceValue } = usetextAssistenceStore();

  const onFilter = () => {
    console.log("Filtrar propostas...");
    setFilter(!filter);
  };

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Consultar Proposta" />
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4 w-full">
          <FieldFirstLine />
          <FieldSecondLine />
          <FieldThirdLine />
          <FieldFourLine onFilter={onFilter} />
        </div>
        {/* <div className="w-80">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Auxílio de Preenchimento
                  </h3>
                  <p className="text-sm text-blue-700">{textAssistenceValue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
      <ViewProposalModal />
      <CancelProposalModal />
      {filter && <FilterResponse />}
    </div>
  );
};

export default ConsultPage;
