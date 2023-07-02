import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()


  return (
      <div className={`bg-emerald-900 w-screen h-screen flex items-center`}>
        <div className={'w-full text-center'}>
          {session ?
            <>
              <div className="p-2">
                <h3>Logged in:</h3>
                <h3>{session.user.email}</h3>
              </div>
              <button onClick={() => signOut()} className='bg-white text-emerald-900 p-2 px-4 rounded-md'>Sign out</button>
            </>
            :
            <button onClick={() => signIn('google')} className='bg-white text-emerald-900 p-2 px-4 rounded-md'>Login with Google</button>
          }
        </div>
      </div>
  )
}
