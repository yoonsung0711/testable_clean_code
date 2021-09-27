import { EUserUid } from "@config/data/typings"

const { JAMES, MICHAEL, JENNY, TOM, JACKY, MARK, ETHAN, MIA } = EUserUid

export const userDetailTable: Map<EUserUid, string> = new Map([
	[MICHAEL, '../../../cli/seeds/user-detail/michael-user-detail.json'],
	[JENNY, '../../../cli/seeds/user-detail/jenny-user-detail.json'],
	[TOM, '../../../cli/seeds/user-detail/tom-user-detail.json'],
	[JACKY, '../../../cli/seeds/user-detail/jacky-user-detail.json'],
	[JAMES, '../../../cli/seeds/user-detail/james-user-detail.json'],
	[MARK, '../../../cli/seeds/user-detail/mark-user-detail.json'],
	[ETHAN, '../../../cli/seeds/user-detail/ethan-user-detail.json'],
	[MIA, '../../../cli/seeds/user-detail/mia-user-detail.json'],
])
