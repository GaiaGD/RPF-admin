import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav"
import { useState } from "react"

import Logo from "./Logo"

export default function Layout({children}) {
  const { data: session } = useSession()

  const [showNav, setShowNav] = useState(false)

  return (
      <div className={`w-screen min-h-screen`}>
        {session ?


          <div className="">

            <div className="block md:hidden bg-emerald-900">

              <div className="flex justify-between">

                <button className="p-2" onClick={() => setShowNav(!showNav)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>

                <Logo />

              </div>

            </div>

            <div className="flex h-screen">
              {/* nav on left */}
              <Nav show={showNav} />

              {/* login and pages below */}
              <div className="p-4 bg-white flex-grow text-emerald-900">

                {/* login */}
                <div className="hidden md:block">
                  <div className="flex w-full justify-end">
                      <div className="rounded-full flex items-center bg-gray-300 gap-1 text-emerald-900 rounded-full p-2 mr-2">
                        <img className="w-6 h-6 rounded-full" src={session?.user?.image} />
                        <h3 className="h-6">{session?.user?.name}</h3>
                      </div>
                  </div>
                </div>

                {/* pages */}
                <div>
                  {children}
                </div>

              </div>
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
