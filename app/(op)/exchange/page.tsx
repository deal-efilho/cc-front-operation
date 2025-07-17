"use client"

import { ExchangeTabs } from "@/features/exchange/components/exchange-tabs/exchange-tabs"
import { NormalExchangeContent } from "@/features/exchange/pages/exchange-content/exchange-content"
import { ExpressContent } from "@/features/exchange/pages/express-content/express-content"

const ExchangePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <ExchangeTabs
        normalContent={<NormalExchangeContent />}
        expressContent={<ExpressContent />}
      />
    </div>
  )
}

export default ExchangePage