import { User } from '@feed/data/database'
import { EUserUid } from '@config/data/typings'

import { Connection } from 'typeorm'
import { UpdateUserFollows } from './impl/update-user-follows'
import { UpdateUserPosts } from './impl/update-user-posts'
import { UpdateUserFeeds } from './impl/update-user-feeds'
import { UpdateThreadedComment } from './impl/update-threaded-comment'

export interface IUpdater {
	updateUserFollows: (userFollowUpdates: Partial<User>[]) => Promise<string>
	updateUserFeeds: (userTable: Map<EUserUid, string>) => (userSelection: (EUserUid| EUserUid[])) => Promise<string>
	updateUserPosts: (userTable: Map<EUserUid, string>) => (userSelection: (EUserUid| EUserUid[])) => Promise<string>
	updateThreadedComment: (userTable: Map<EUserUid, string>) => (userSelection: (EUserUid | EUserUid[])) => Promise<string>
}

const Updater = (conn: Connection): IUpdater => {
	const updateUserFollows = UpdateUserFollows(conn)
	const updateUserPosts = UpdateUserPosts(conn)
	const updateUserFeeds = UpdateUserFeeds(conn)
	const updateThreadedComment = UpdateThreadedComment(conn)

	return {
		updateUserFollows,
		updateUserFeeds,
		updateUserPosts,
		updateThreadedComment,
	}
}

export default Updater