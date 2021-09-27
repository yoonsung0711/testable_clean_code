import { parseJsonFromFile } from "@macroserviced/utils"
import { Feed } from "@feed/data/database"
import path from "path"
import { userPostsTable } from  '@config/data/router/user-posts-table'
import { EUserUid, UserOption } from "@config/data/typings"

export function UserSelectiveLoadFromTable<T> (userTable: Map<EUserUid, string>) {
		return (userSelection: UserOption) => {
			if (Array.isArray(userSelection)){
				return (userSelection as []).reduce((seeds: T[], userUid) => {
					return [ 
						...seeds, 
						...parseJsonFromFile<T>(path.join(__dirname, userTable.get(userUid))) ]
				}, [])
			} else {
				return parseJsonFromFile<T>(path.join(__dirname, userTable.get(userSelection))) 
			}
		}
	}

UserSelectiveLoadFromTable<Feed>(userPostsTable)(EUserUid.ETHAN)
