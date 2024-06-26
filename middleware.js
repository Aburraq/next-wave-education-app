import { auth } from '@/auth';
import { apiPrefix, publicRoutes } from '@/routes';
import { isTokenValid } from '@/utils/functions/is-token-valid';
import { NextResponse } from 'next/server';
import { isUserAuthorized } from '@/utils/functions/is-user-authorized';

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};

export default auth((req) => {

    const reqUrl = new URL(req.url);

    const auth = req.auth;

    const currentPath = reqUrl.pathname;

    const isLoggedIn = !!auth?.user;

    const isApiAuthRoute = currentPath.startsWith(apiPrefix);

    const isPublicRoute = publicRoutes.includes(currentPath);

    const isValidToken = isTokenValid(auth?.accessToken);

    const isOnProtectedRoute = currentPath.startsWith('/dashboard');
    
    const isOnLoginRoute = currentPath.startsWith('/login');

    if (isApiAuthRoute) return NextResponse.next();

    if (isOnLoginRoute) {
        if (isLoggedIn && isValidToken)
            return NextResponse.redirect(new URL('/dashboard', reqUrl));

        return NextResponse.next();
    }

    if (!isLoggedIn || !isValidToken) {
        return NextResponse.redirect(new URL('/login', reqUrl));
    }

    if (isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', reqUrl));
    } else if (isOnProtectedRoute) {
        const canAccess = isUserAuthorized(auth?.user?.role, currentPath);

        if (!canAccess)
            return NextResponse.redirect(new URL('/unauthorized', reqUrl));

        return NextResponse.next();
    }

    return NextResponse.next();
});