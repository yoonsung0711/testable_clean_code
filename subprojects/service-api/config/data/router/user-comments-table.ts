import { EUserUid } from "@config/data/typings"
const { JAMES, MICHAEL, JENNY, TOM, JACKY, MARK, ETHAN, MIA } = EUserUid

export const userCommentsTable: Map<EUserUid, string> = new Map([
	[MICHAEL, '../../../cli/seeds/_updates/comments/michael-comments.json'],
	[JENNY, '../../../cli/seeds/_updates/comments/jenny-comments.json'],
	[TOM, '../../../cli/seeds/_updates/comments/tom-comments.json'],
	[JACKY, '../../../cli/seeds/_updates/comments/jacky-comments.json'],
	[JAMES, '../../../cli/seeds/_updates/comments/james-comments.json'],
	[MARK, '../../../cli/seeds/_updates/comments/mark-comments.json'],
	[ETHAN, '../../../cli/seeds/_updates/comments/ethan-comments.json'],
	[MIA, '../../../cli/seeds/_updates/comments/mia-comments.json'],
])