import { Request } from "express"

export type CustomReq = Request & {
    csrfToken: () => string
}