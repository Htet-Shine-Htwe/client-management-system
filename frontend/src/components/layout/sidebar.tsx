import { BellIcon, HomeIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
            <HomeIcon className="h-6 w-6" />
          <span className="">
            CMS
          </span>
        </Link>
       
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            to="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <HomeIcon className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            to="/admins"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <HomeIcon className="h-4 w-4" />
            Admins
          </Link>

          <Link
            to="/clients"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <HomeIcon className="h-4 w-4" />
            Clients
          </Link>
        
        </nav>
      </div>
      <div className="mt-auto p-4">
       
      </div>
    </div>
  </div>
  )
}

export default Sidebar