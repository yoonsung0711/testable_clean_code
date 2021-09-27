import { EUserUid } from "@config/data/typings"

const { JAMES, MICHAEL, JENNY, TOM, JACKY, MARK, ETHAN, MIA } = EUserUid

export const userTable: Map<EUserUid, string> = new Map([
	[MICHAEL, '../../../cli/seeds/user/michael-user.json',],
	[JENNY, '../../../cli/seeds/user/jenny-user.json'],
	[TOM, '../../../cli/seeds/user/tom-user.json'],
	[JACKY, '../../../cli/seeds/user/jacky-user.json'],
	[JAMES, '../../../cli/seeds/user/james-user.json'],
	[MARK, '../../../cli/seeds/user/mark-user.json'],
	[ETHAN, '../../../cli/seeds/user/ethan-user.json'],
	[MIA, '../../../cli/seeds/user/mia-user.json'],
])