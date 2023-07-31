import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav"
import { useState } from "react"

export default function Layout({children}) {
  const { data: session } = useSession()

  const [showNav, setShowNav] = useState(false)

  return (
      <div className={`w-screen min-h-screen`}>
        {session ?


          <div className="">

            <div className="block md:hidden bg-emerald-900">

              <button className="p-2" onClick={() => setShowNav(!showNav)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

            </div>

            <div className="flex h-screen">
              {/* nav on left */}
              <Nav show={showNav} />

              {/* login and pages below */}
              <div className="p-4 bg-white flex-grow text-emerald-900">

                {/* login */}
                <div className="flex w-full justify-end">

                  <div className="rounded-full flex items-center bg-gray-300 gap-1 text-emerald-900 rounded-full p-2 mr-2">
                    <img className="w-6 h-6 rounded-full" src={session?.user?.image} />
                    <h3 className="h-6">{session?.user?.name}</h3>
                  </div>
                  {/* <button onClick={() => signOut()} className='text-white bg-emerald-900 p-2 px-4 rounded-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Sign out
                  </button> */}
                
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
