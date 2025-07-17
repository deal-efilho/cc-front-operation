"use client";

import { useState } from "react";

import { DataTable } from "@/components/ui/data-table";

import { responseFilterColumns } from "../components";
import { filterResponseMockData, type FilterResponseColumn } from "../mocks";

const PAGE_SIZE = 10;

export const FilterResponse = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalItems = filterResponseMockData.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = filterResponseMockData.slice(startIndex, endIndex);

  return (
    <div className="px-6 pt-4 pb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Total de {filterResponseMockData.length} propostas encontradas
        </div>
      </div>

      <div className="border rounded-lg">
        <DataTable
          data={currentData as FilterResponseColumn[]}
          columns={responseFilterColumns}
          id="history"
          page={currentPage}
          pageSize={PAGE_SIZE}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
