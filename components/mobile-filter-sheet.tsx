"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import FilterPanel from "./filter-panel"

export default function MobileFilterSheet() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterPanel isMobile={true} onClose={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
