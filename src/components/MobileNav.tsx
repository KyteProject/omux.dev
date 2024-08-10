import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { config } from "@/config"
import { List as Menu } from "@phosphor-icons/react"

export const MobileNav = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="order-3 md:hidden" asChild>
          <Button variant="ghost" size="icon" className="btn shrink-0">
            <Menu size={24} />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Synth & Syntax</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <nav className="mt-6 grid gap-6 text-lg font-medium">
            {config.mainMenu.map(item => (
              <SheetClose asChild key={item.href}>
                <Button variant="outline">
                  <a href={item.href}>{item.name}</a>
                </Button>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
