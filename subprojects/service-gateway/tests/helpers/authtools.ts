import { IAuthTools } from '@gateway/typings'

export const mockAuthTools: IAuthTools = {
    authenticate: () => undefined,
    cookieCreator: () => undefined,
    tokenizer: () => undefined,
}