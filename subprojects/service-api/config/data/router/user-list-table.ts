import { EUserUid } from "@config/data/typings"
const { JAMES, MICHAEL, JENNY, TOM, JACKY, MARK, ETHAN, MIA } = EUserUid

export const userListTable: Map<EUserUid, string> = new Map([
	[MICHAEL, 'Michael'],
	[JENNY, 'Jenny'],
	[TOM, 'Tom'],
	[JACKY, 'Jacky'],
	[JAMES, 'James'],
	[MARK, 'Mark'],
	[ETHAN, 'Ethan'],
	[MIA, 'Mia'],
])