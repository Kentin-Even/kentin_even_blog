import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import Link from "@/web/components/ui/Link"

const MenuItem = ({ children, href, ...otherProps }) => (
  <li {...otherProps}>
    <Link
      styless
      href={href}
      className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
)
const Header = () => {
  const { session, signOut } = useSession()
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-xl font-semibold">
          <Link
            href="/"
            styless
            className="text-gray-900 hover:text-gray-800 transition-colors duration-300"
          >
            Blog
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-4">
            {session ? (
              <>
                <MenuItem href="/post/create">Create Post</MenuItem>
                <MenuItem href="/admin">Admin</MenuItem>
                <li>
                  <Button
                    variant="transparent"
                    size="inherit"
                    onClick={signOut}
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  >
                    Sign Out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <MenuItem href="/sign-up">Sign Up</MenuItem>
                <MenuItem href="/sign-in">Sign In</MenuItem>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
