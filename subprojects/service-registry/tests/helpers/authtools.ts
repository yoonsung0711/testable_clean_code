import { IAuthTools } from '@registry/typings'

export const mockAuthTools: IAuthTools = {
    authenticate: () => undefined,
    cookieCreator: () => undefined,
    tokenizer: () => undefined,
}