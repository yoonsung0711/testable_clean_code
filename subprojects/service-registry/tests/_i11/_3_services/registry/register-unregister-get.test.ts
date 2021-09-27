import { createServiceRegistryContext, IService, IServiceRegistryContext } from '@registry/services/registry'
import { Cleanup, Get, Register, Unregister } from '@registry/services/registry/serviceRegistry'

describe('Service Registry', () => {
    let context: IServiceRegistryContext

    let get: (name: string, version: string) => IService
    let register: (name: string, version: string, ip: string, port: number) => string
    let unregister: (name: string, version: string, ip: string, port: number) => string

    beforeAll(() => {
        context = createServiceRegistryContext(5)

    })

    describe('[PUT: /registries: controller.put =>]', () => {

        it('serviceRegistry.register(name, version, ip, port) => services.set', () => {
            register = Register(Cleanup)(context)
            const result = register("service-feed", "1.0.0", "", 8000)
            expect(context.services.get('service-feed1.0.08000')).toEqual(expect.objectContaining({ "ip": "", "name": "service-feed", "port": 8000, "version": "1.0.0" }))
            expect(result).toEqual('service-feed1.0.08000')
        })
    })

    describe('[GET: /registries: controller.get =>]', () => {

        it('serviceRegistry.unregister(name, version, ip, port) => services.set', () => {
            get = Get(Cleanup)(context)
            const result = get("service-feed", "1.0.0")
            expect(result).toEqual(expect.objectContaining({"ip": "", "name": "service-feed", "port": 8000, "version": "1.0.0"}))
        })
    })

    describe('[DELETE: /registries: controller.delete =>]', () => {

        it('serviceRegistry.unregister(name, version, ip, port) => services.set', () => {
            unregister = Unregister(context)
            const result = unregister("service-feed", "1.0.0", "", 8000)
            expect(context.services.get('service-feed1.0.08000')).toEqual(undefined)
            expect(result).toEqual('service-feed1.0.08000')
        })
    })

})
