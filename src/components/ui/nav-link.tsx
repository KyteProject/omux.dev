import { cn } from "@/lib/utils"

type Props = {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

export const NavLink = ({ href, children, isActive }: Props) => {
  return (
    <li className="group relative">
      <a
        href={href}
        className={cn(
          "block h-full w-full px-5 py-4 transition-colors",
          "group-hover:text-foreground",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {children}
      </a>
      <div
        className={cn(
          "absolute bottom-0 h-0.5 bg-accent opacity-0 transition-all duration-500",
          "group-hover:w-full group-hover:opacity-100",
          isActive ? "w-full opacity-100" : "w-0"
        )}
      />
    </li>
  )
}
