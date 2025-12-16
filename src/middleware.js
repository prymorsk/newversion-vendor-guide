import { NextResponse } from 'next/server'
import { useAuth } from "@/context/UserContext";
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    // const {user,navigate}  = useAuth();
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';
    const type = request.cookies.get('user-type')?.value || '';
    const isSubscribe = request.cookies.get('isSubscribe')?.value || '';
    // console.log(path.startsWith(`/company`));
    const isPublicPath = path === '/login' || path === '/register' || path === '/manager/login' || path === '/vendor/login' || path === '/company/login'
    const isPrivatePath = path.startsWith(`/plan`) === '/plan';
    // console.log(request.cookies)

    // if(isSubscribe!="active" && type==0 && token && !path.startsWith(`/plan`)){
    //     return NextResponse.redirect(new URL(`/advertise`, request.nextUrl));
    // }
    if( type===0 && token && !path.startsWith(`/plan`)){
        return NextResponse.redirect(new URL(`/advertise`, request.nextUrl));
    }
    if(isPublicPath && token){
        if(type==1){
            return NextResponse.redirect(new URL(`//dashboard`, request.nextUrl));
        }
        if(type==0){
            return NextResponse.redirect(new URL(`/vendor/dashboard`, request.nextUrl));
        }
        if(type==2){
            return NextResponse.redirect(new URL(`/company/dashboard`, request.nextUrl));
        }
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL(`/login`, request.nextUrl));
    }
    if(token && type!=0 && path.startsWith(`/vendor`)){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }else if(token && type!=1 && path.startsWith(`/manager`)){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }else if(token && type!=2 && path.startsWith(`/company`)){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/register',
        '/login',
        '/manager/:path*',
        '/vendor/:path*',
        '/company/:path*',
        '/plan/:path*'
    ],
}