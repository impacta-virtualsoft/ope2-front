import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import login from '~/service/login'

type CredentialsType = {
  username: string
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
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials /* , req */) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log('==> credentials:')
        console.log({ credentials })

        const user = await login(credentials as CredentialsType)

        // const res = await fetch('https://virtualsoft.dev.br/login/', {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: {
        //     'Content-Type': 'application/json',
        //     corsOrigin: '*',
        //     'Access-Control-Allow-Origin': '*',
        //   },
        // })
        // console.log({ res })
        // const user = await res.json()

        console.log('==> user:')
        console.log({ user })

        // If no error and we have user data, return it
        if (user && user.status < 300) {
          return user.data
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
})
