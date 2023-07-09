import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav"

export default function Layout({children}) {
  const { data: session } = useSession()

  return (
      <div className={`bg-emerald-900 w-screen min-h-screen`}>
        {session ?
          <div className="flex h-screen">
            <Nav />
            <div className="p-4 bg-white flex-grow text-emerald-900">
              <div>
                {children}
              </div>
              <button onClick={() => signOut()} className='text-white bg-emerald-900 p-2 px-4 rounded-md mt-20'>Sign out</button>
            </div>
          </div>
          :
          <div className={"flex justify-center items-center h-screen"}>
            <button onClick={() => signIn('google')} className='bg-white text-emerald-900 p-2 px-4 rounded-md'>Login with Google</button>
          </div>
        }
      </div>
  )
}
