import { EUserUid } from "@config/data/typings"

const { JAMES, MICHAEL, JENNY, TOM, JACKY, MARK, ETHAN, MIA } = EUserUid

export const cliUserTable: Map<string, EUserUid> = new Map([
	['michael', MICHAEL],
	['jenny', JENNY],
	['tom', TOM],
	['jacky', JACKY],
	['james', JAMES],
	['mark', MARK],
	['ethan', ETHAN],
	['mia', MIA],
])