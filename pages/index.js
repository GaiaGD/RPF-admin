import { useSession } from "next-auth/react"
import Layout from "./components/Layout"
import Image
 from "next/image"
export default function Home() {
  const { data: session} = useSession()
  return(
    <Layout>
      <div className="text-emerald-900">
        <h3>Hello {session?.user?.email}</h3>
        <img src={session?.user?.image} />
      </div>
    </Layout>
  )
}
