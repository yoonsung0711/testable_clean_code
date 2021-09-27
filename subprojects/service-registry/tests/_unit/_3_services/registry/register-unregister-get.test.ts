import { IService } from '@registry/services/registry'
import { Cleanup } from '@registry/services/registry/clean-registry'
import { Get } from '@registry/services/registry/get-registry'
import { Register } from '@registry/services/registry/register-registry'
import { Unregister } from '@registry/services/registry/unregister-registry'


describe('Service Registry', () => {

    let get: (name: string, version: string) => IService
    let register: (name: string, version: string, ip: string, port: number) => string
    let unregister: (name: string, version: string, ip: string, port: number) => string
    let cleanup: () => void

    let spy: jest.Mock<any, any>

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('[PUT: /registries: controller.put =>]', () => {

        it('serviceRegistry.register(name, version, ip, port) => services.set', () => {
            const stubCleanup = () => () => undefined
            spy = jest.fn()
            const mockContext = {
                config: {
                    timeout: 1
                },
                log: () => {
                    const debug = () => undefined
                    return {
                        debug
                    }
                },
                services: (() => {
                    return {
                        has: () => false,
                        set: spy
                    }
                })()
            }
            register = Register(stubCleanup)(mockContext as any)
            register("service-feed", "1.0.0", "", 8000)
            expect(spy.mock.calls[0][0]).toEqual(
                "service-feed1.0.08000",
            )
            expect(spy.mock.calls[0][1]).toEqual(
                expect.objectContaining({
                    "ip": "",
                    "name": "service-feed",
                    "port": 8000,
                    "version": "1.0.0"
                })
            )
        })
    })

    describe('[DELETE: /registries: controller.delete =>]', () => {

        it('serviceRegistry.unregister(name, version, ip, port) => services.delete', () => {
            spy = jest.fn()
            const mockContext = {
                config: {
                    timeout: 1
                },
                log: () => {
                    const debug = () => undefined
                    return {
                        debug
                    }
                },
                services: (() => {
                    return {
                        delete: spy
                    }
                })()
            }
            unregister = Unregister(mockContext as any)
            unregister("service-feed", "1.0.0", "", 8000)
            expect(spy).toBeCalled()
            expect(spy).toBeCalledWith("service-feed1.0.08000")
        })
    })

    describe('[GET: /registries: controller.get =>]', () => {

        it('serviceRegistry.unregister(name, version, ip, port) => services.get', () => {
            const stubCleanup = () => () => undefined
            spy = jest.fn()
            const mockContext = {
                config: {
                    timeout: 1
                },
                log: () => {
                    const debug = () => undefined
                    return {
                        debug
                    }
                },
                services: (() => {
                    return {
                        values: spy
                    }
                })()
            }
            spy.mockReturnValue([])
            get = Get(stubCleanup)(mockContext as any)
            get("service-feed", "1.0.0")
            expect(spy).toBeCalled()
        })
    })

    describe('[GET: /registries: controller.get =>]', () => {

        it('serviceRegistry.cleanup() => services.get', () => {
            spy = jest.fn()
            const mockContext = {
                config: {
                    timeout: 2
                },
                log: () => {
                    const debug = () => undefined
                    return {
                        debug
                    }
                },
                services: (() => {
                    return {
                        keys: () => ['1234'],
                        get: (key: string) => {
                            if (key === '1234') {
                                return {
                                    timestamp: Math.floor(new Date().getTime() / 1000) - 3
                                }    
                            }
                        },
                        delete: spy
                    }
                })()
            }
            spy.mockReturnValue([])
            cleanup = Cleanup(mockContext as any)
            cleanup()
            expect(spy).toBeCalled()
        })
    })
})