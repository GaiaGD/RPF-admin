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
          <h1 className="page-names">Hello <b>{session?.user?.name}</b></h1>
      </div>
    </Layout>
  )
}
