// import { EUserUid, UserOption } from '@config/data/typings'
import { EUserUid, UserOption } from '../typings'
import { LoadFromPath } from './load-from-path'
import { UserSelectiveLoadFromTable } from './selective-load-from-table'
import { UserSelectiveUpdatesLoadFromTable } from './selective-updates-load-from-table'

export interface ISeedLoader<T> {
	loadFromPath: (filepath: string) => T[]
	userSelectiveLoadFromTable: (userTable: Map<EUserUid, string>) => (userSelection: UserOption) => T[]
	userSelectiveUpdatesLoadFromTable: (table: Map<EUserUid, Partial<T>>) => (userSelection: UserOption) => Partial<T>[]
}

function Loader<T>(): ISeedLoader<T> {
	return {
		loadFromPath: LoadFromPath,
		userSelectiveLoadFromTable: UserSelectiveLoadFromTable,
		userSelectiveUpdatesLoadFromTable: UserSelectiveUpdatesLoadFromTable,
	}
}

export default Loader
