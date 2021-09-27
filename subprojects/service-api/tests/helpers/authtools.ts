import { IAuthTools } from '@feed/typings'

export const mockAuthTools: IAuthTools = {
    authenticate: () => undefined,
    cookieCreator: () => undefined,
    tokenizer: () => undefined,
}