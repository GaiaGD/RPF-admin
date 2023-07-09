// THIS IS THE DASHBOARD

import { useSession } from "next-auth/react"
import Layout from "./components/Layout"
import Image
 from "next/image"
export default function Home() {
  const { data: session} = useSession()
  return(
    <Layout>
      <div className="text-emerald-900 flex justify-between">
          <h3>Hello <b>{session?.user?.name}</b></h3>

          <div className="flex bg-gray-300 gap-1 text-emerald-900 rounded-full pr-2">
            <img className="w-6 h-6 rounded-full" src={session?.user?.image} />
            <h3>{session?.user?.name}</h3>
          </div>
      </div>
    </Layout>
  )
}
