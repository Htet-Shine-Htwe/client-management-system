import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import {
    CircleUser,
  } from "lucide-react"
import useLogout from "@/hooks/useLogout";

const Header = () => {

  const logout = useLogout();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">

    <div className="w-full flex-1">
      <form>
        
      </form>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-muted px-4 py-3 rounded-lg hover:bg-muted-foreground cursor-pointer">
       
        <DropdownMenuItem
        onClick={()=>logout()}
        >Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
  )
}

export default Header