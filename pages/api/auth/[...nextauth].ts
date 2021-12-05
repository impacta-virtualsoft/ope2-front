import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DATE_UNTIL_TOKEN_EXPIRES } from '~/helpers/constants'
import {
  decodeToken,
  getLoginToken,
  getLoginUser,
  refreshAccessToken,
} from '~/service/login'

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
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log('==> authorize:')
        console.log({ credentials })

        try {
          const login = await getLoginToken(
            credentials as CredentialRequestType
          )
          const user = await getLoginUser(login!)
          const decodedToken = decodeToken(login!.access)
          const accessTokenExpires = decodedToken.exp * 1000

          const response = {
            id: user?.id,
            email: user?.email,
            token: login?.access,
            accessToken: login?.access,
            accessTokenExpires,
            refreshToken: login?.refresh,
          }
          console.log({ response })
          console.log('==> fim do authorize')

          // If no error and we have user data, return it
          if (login && user && user.id) {
            return response
          }
        } catch (err) {
          console.log(err)
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
        session.expires = token.accessTokenExpires as string
      }
      console.log('==> SESSION')
      console.log({ session })
      console.log({ token })
      console.log({ user })
      console.log('==> FIM DO SESSION')
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // !!! Important !!!
      // Only "token" param exists after first login
      // user, account, profile and isNewUser params are available only at first login time
      // persist any data from those other into token at login time!
      console.log('==> JWT')
      console.log({ token })
      console.log({ user })

      // Runs only once the user logs in
      if (account && user) {
        token = {
          ...token,
          accessToken: user.accessToken,
          accessTokenExpires: user.accessTokenExpires,
          refreshToken: user.refreshToken,
        }
        console.log('após alteração')
        console.log({ token })
      }

      if (DATE_UNTIL_TOKEN_EXPIRES > (token as any).accessTokenExpires) {
        const newToken = await refreshAccessToken(token)
        // console.log('==> TOKEN EXPIROU!!!')
        // console.log({ newToken })
        return newToken
      }

      console.log({ user })
      console.log({ account })
      console.log({ profile })
      console.log({ isNewUser })
      console.log('==> FIM DO JWT')
      return token
    },
  },
})
