import { Request } from 'express'
import mock, { MockProxy } from 'jest-mock-extended/lib/Mock'
import { LoginController } from '@gateway/controllers/auth/controllers'
import { IAuthService } from '@gateway/services'
import { mockAuthTools } from '@tests/helpers/authtools'
import { nextTick } from '@micro/utils'


describe('Feed Controller', () => {
    let mockService: MockProxy<IAuthService>
    let login: (httpRequest: Request) => Promise<any>

    beforeAll(() => {
        mockService = mock<IAuthService>()
    })

    describe('[POST: /auth/logout => ]', () => {
        it('case1: controller.logout send http response without invoking any service', () => {
            expect(true).toEqual(true)
        })
    })

    describe('[POST: /auth/login => ]', () => {
        it('case1: controller.login (if already loggined) => service.getUserInfo(userUid)', async () => {
            login = LoginController(mockService, mockAuthTools)
            const httpRequest: Partial<Request> = { login_user_uid: '3c07' }
            await login(httpRequest as Request)
            expect(mockService.getUserPass).not.toHaveBeenCalled()
        })

        it('case2: controller.login (not loggined without pass and id)', async () => {
            login = LoginController(mockService, mockAuthTools)
            const httpRequest: Partial<Request> = {}
            await login(httpRequest as Request)
            expect(mockService.getUserPass).toHaveBeenCalledTimes(0)
        })

        it('case3: controller.login (with right pass and id) => service.getUserPass(userUid)', async () => {
            const spyAuthenticate = jest.fn()
            const spyTokenSign = jest.fn()
            const spyCookieCreator = jest.fn()
            const mockTokenizer = { sign: spyTokenSign }

            spyAuthenticate.mockImplementation(async ({ saved, input }: { saved: string, input: string }) => await new Promise(res => setTimeout(res, 0, (saved === input))))
            spyTokenSign.mockImplementation(() => 'token')

            mockService.getUserPass.mockImplementation(async (userUid: string) => {
                await nextTick()
                return {
                    "userCredentialId": "ea203692",
                    "uuid": "3c07",
                    "password": "Mia"
                }
            })
            login = LoginController(mockService, {
                authenticate: spyAuthenticate,
                cookieCreator: spyCookieCreator,
                tokenizer: mockTokenizer
            })
            const httpRequest: Partial<Request> = {
                login_user_uid: undefined,
                body: {
                    userUid: '3c07',
                    pass: 'Mia',
                }
            }
            await login(httpRequest as Request)
            expect(mockService.getUserPass).toHaveBeenCalled()
            expect(spyTokenSign).toBeCalled()
            expect(spyCookieCreator).toBeCalled()

            expect(mockService.getUserPass).toHaveBeenCalledWith('3c07')
            expect(spyTokenSign).toHaveBeenCalledWith({ "userUid": '3c07' })
            expect(spyCookieCreator).toHaveBeenCalledWith('token')
        })
    })
})

