import jwt_decode from 'jwt-decode'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getToken as serviceGetToken } from '~/service/token'

type CredentialsType = {
  email: string
  password: string
}
export default NextAuth({
  pages: {
    signIn: '/auth/entrar',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@virtualsoft.dev.br',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials /* , req */) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log('==> authorize:')
        console.log({ credentials })

        const login = await serviceGetToken(credentials as CredentialsType)
        // const user = await serviceGetUser(login?.data)
        const user = login

        console.log({ 'user.data': user?.data })

        console.log('==> fim do authorize')

        // If no error and we have user data, return it
        if (user && user.status < 300) {
          return user.data
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        session.accessToken = token.accessToken
      }
      console.log('==> SESSION')
      console.log({ session })
      console.log({ token })
      console.log({ user })
      console.log('==> FIM DO SESSION')
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('==> JWT')
      console.log({ token })

      if (user) {
        const newToken = user.token as JWT
        const decodedToken: GenericObject<any> = jwt_decode(
          user.token as string
        )
        token.accessToken = newToken
        token.email = decodedToken.email
        token.user_id = decodedToken.user_id
      }
      console.log('após alteração')
      console.log({ token })
      console.log({ user })
      console.log({ account })
      console.log({ profile })
      console.log({ isNewUser })
      console.log('==> FIM DO JWT')

      return token
    },
  },
})
