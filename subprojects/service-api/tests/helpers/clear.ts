import { Connection, getConnection } from 'typeorm'

export const clearDB
    = async (conn: Connection): Promise<void> => {
        const entities = conn.entityMetadatas
        for (const entity of entities) {
            if (entity.name !== 'User') {
                const repository = getConnection().getRepository(entity.name)
                await repository.clear()
            }
        }
    }