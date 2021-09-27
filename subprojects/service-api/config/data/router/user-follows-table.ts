import { EUserUid } from "@config/data/typings"
import { User } from "@feed/data/database"

const { /*JAMES,*/ MICHAEL, JENNY, TOM, JACKY, MARK, ETHAN, MIA } = EUserUid

export const userFollowsTable: Map<EUserUid, Partial<User>> = new Map([
	[MICHAEL, {
    "uuid": MICHAEL,
    "name": "Michael",
		"leaders": [JENNY, TOM],
		"followers": [JENNY, TOM]
	}],
	[JENNY,{
    "uuid": JENNY,
    "name": "Jenny",
		"leaders": [MICHAEL, TOM],
		"followers": [MICHAEL, TOM]
	}],
	[TOM, {
    "uuid": TOM,
    "name": "Tom",
		"leaders": [MICHAEL, JENNY],
		"followers": [MICHAEL, JENNY]
	}],
	[JACKY, {
    "uuid": JACKY,
    "name": "Jacky",
		"leaders": [MIA, MARK, ETHAN ],
		"followers": [MIA, MARK, ETHAN ]
	}],
	[MIA, {
    "uuid": MIA,
    "name": "Mia",
		"leaders": [ETHAN, JACKY, MARK],
		"followers": [ETHAN, JACKY, MARK]
	}],
	[ETHAN, {
    "uuid": ETHAN,
    "name": "Ethan",
		"leaders": [MIA, JACKY, MARK],
		"followers": [MIA, JACKY, MARK]
	}],
	[MARK,{
    "uuid": MARK,
    "name": "Mark",
		"leaders": [ETHAN, MIA, JACKY],
		"followers": [ETHAN, MIA, JACKY]
	}],
	// [JAMES,{
  //   "uuid": JAMES,
  //   "name": "James",
	// 	"leaders": [JACKY, TOM],
	// 	"followers": [MIA, ETHAN]
	// }]
])