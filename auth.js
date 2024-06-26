import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { login } from '@/actions/auth/login.action';
import { getUser } from '@/actions/user/get-user.action';
import { isTokenValid } from '@/utils/functions/is-token-valid';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const user = await login({
                    username: credentials.username,
                    password: credentials.password
                });
                if (!user) return null;

                const userInfo = await getUser(user.token);
                if (!userInfo) return null;

                const userInformation = { ...user, ...userInfo };

                return {
                    user: userInformation,
                    accessToken: user.token.split(' ')[1]
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            if (!isTokenValid(token.accessToken)) return null;
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        }
    },
    pages: {
        signIn: '/login'
    },
    trustHost: true
});