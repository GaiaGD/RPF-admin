import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'

const adminEmails = ['gaia.digregorio@gmail.com']

export const authOption = {
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })

  ],
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    session: ({session, token, user}) => {
      console.log({session, token, user})
      if (adminEmails.includes(session?.user?.email)){
      return session}
      else {
        return false
      }
    }
  },

  secret: process.env.SECRET

}

export default NextAuth(authOption)

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOption)
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401)
    res.end()
    throw 'not an admin'
  }
}