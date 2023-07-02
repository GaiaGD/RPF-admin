import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className={`bg-emerald-900 text-emerald-900 w-screen h-screen flex items-center`}>
        <div className={'w-full text-center'}>
          <button onClick={() => signIn('google')} className='bg-white p-2 px-4 rounded-md'>Login with Google</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>Logged in:</div>
      <div>{session.user.email}</div>
    </>
  )

}
