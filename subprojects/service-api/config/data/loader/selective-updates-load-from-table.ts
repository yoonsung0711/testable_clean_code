import { EUserUid, UserOption } from "@config/data/typings"

export function UserSelectiveUpdatesLoadFromTable<T> (table: Map<EUserUid, Partial<T>>) {
		return (userSelection: UserOption) => {
			if (Array.isArray(userSelection)){
				return (userSelection as []).reduce((seeds: Partial<T>[], userUid) => {
					return [ 
						...seeds, 
						table.get(userUid) 
					]
				}, [])
			} else {
				return [table.get(userSelection)]
			}
		}
	}

