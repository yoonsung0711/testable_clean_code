import mock, { MockProxy } from 'jest-mock-extended/lib/Mock'
import { Request } from 'express'

import { Delete } from '@registry/controllers/registry/controllers'
import { Get } from '@registry/controllers/registry/controllers'
import { Put } from '@registry/controllers/registry/controllers'

import { IServiceRegistry } from '@registry/services/registry'
import { IHttpResponse } from '@registry/typings'

describe('Feed Controller', () => {
    let mockService: MockProxy<IServiceRegistry>

    let put: (req: Request) => IHttpResponse
    let delete_: (req: Request) => IHttpResponse
    let get: (req: Request) => IHttpResponse

    beforeAll(() => {
        mockService = mock<IServiceRegistry>()

        put = Put(mockService)
        delete_ = Delete(mockService)
        get = Get(mockService)

    })

    describe('[PUT: /registries => ]', () => {
        it('controller.put => serviceRegistry.register(name, version, ip, port)', () => {
            const httpRequest = {
                query: {
                    servicename: 'service-feed',
                    serviceversion: '1.0.0',
                    serviceport: '8000'
                },
                socket: {
                    remoteAddress: ''
                }
            }

            put(httpRequest as any)
            expect(mockService.register).toHaveBeenCalled()
        })

        it('controller.put => serviceRegistry.register(name, version, ip, port)', () => {
            const httpRequest = {
                query: {
                    servicename: 'service-feed',
                    serviceversion: '1.0.0',
                    serviceport: '8000'
                },
                socket: {
                    remoteAddress: ''
                }
            }

            put(httpRequest as any)
            expect(mockService.register).toHaveBeenCalledWith("service-feed", "1.0.0", "", 8000)
        })
    })

    describe('[DELETE: /registries => ]', () => {
        it('controller.delete => serviceRegistry.unregister(name, version, ip, port)', () => {
            const httpRequest = {
                query: {
                    servicename: 'service-feed',
                    serviceversion: '1.0.0',
                    serviceport: '8000'
                },
                socket: {
                    remoteAddress: ''
                }
            }
            delete_(httpRequest as any)
            expect(mockService.unregister).toHaveBeenCalled()
        })

        it('controller.delete => serviceRegistry.unregister(name, version, ip, port)', () => {
            const httpRequest = {
                query: {
                    servicename: 'service-feed',
                    serviceversion: '1.0.0',
                    serviceport: '8000'
                },
                socket: {
                    remoteAddress: ''
                }
            }
            delete_(httpRequest as any)
            expect(mockService.unregister).toHaveBeenCalledWith("service-feed", "1.0.0", "", 8000)
        })
    })

    describe('[GET: /registries => ]', () => {
        it('controller.get => serviceRegistry.get(name, version)', () => {
            const httpRequest = {
                query: {
                    servicename: 'service-feed',
                    serviceversion: '1.0.0',
                    serviceport: '8000'
                },
                socket: {
                    remoteAddress: ''
                }
            }
            get(httpRequest as any)
            expect(mockService.get).toHaveBeenCalled()
        })

        it('controller.get => serviceRegistry.get(name, version)', () => {
            const httpRequest = {
                query: {
                    servicename: 'service-feed',
                    serviceversion: '1.0.0',
                    serviceport: '8000'
                },
                socket: {
                    remoteAddress: ''
                }
            }
            get(httpRequest as any)
            expect(mockService.get).toHaveBeenCalledWith("service-feed", "1.0.0")
        })
    })
})

