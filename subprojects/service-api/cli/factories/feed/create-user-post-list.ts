import { userPostsTable } from "@config/data/router"
import { EUserUid } from "@config/data/typings"
import { Feed } from "@feed/data/database"
import { parseJsonFromFile } from "@macroserviced/utils"
import path from 'path'

export const CreateUserPostList
  = (userPostsTable: Map<EUserUid, string>) => {
    return (userSelection: EUserUid) => {
      const filename = userPostsTable.get(userSelection)
      return parseJsonFromFile<Feed>(path.join(__dirname, filename)).map(f => f.uuid) 
    }
  }

const { MICHAEL } = EUserUid

// console.log(CreateUserPostList(userPostsTable)(MICHAEL))