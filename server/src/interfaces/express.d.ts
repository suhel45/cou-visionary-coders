import { request } from "express"

export type CustomReq = request & {
    csrfToken: () => string
}