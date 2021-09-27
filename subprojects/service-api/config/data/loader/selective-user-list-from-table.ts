import { EUserUid, UserOption } from "@config/data/typings"

export function UserSelectiveListFromTable (table: Map<EUserUid, string[]>) {
		return (userSelection: UserOption) => {
			if (Array.isArray(userSelection)){
				return (userSelection as []).reduce((userList: string[], userUid) => {
					return [ 
            ...userList,
						table.get(userUid) 
					]
				}, [])
			} else {
				return [table.get(userSelection)]
			}
		}
	}
