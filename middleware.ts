export {default} from 'next-auth/middleware'

export const config = {
    // * : zero or more param
    // + : one or more param
    // ? : zero or one param
    matcher: ['/users/:id*']
}