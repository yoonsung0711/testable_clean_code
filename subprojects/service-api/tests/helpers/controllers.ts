import { IUserController } from '@feed/controllers'
import { IFeedController } from '@feed/controllers'

export const stubUserController: IUserController
    = {
    getUser: () => (new Promise(res => setTimeout(res, 0))),
    getUsers: () => (new Promise(res => setTimeout(res, 0))),
    putUser: () => (new Promise(res => setTimeout(res, 0))),
}

export const stubFeedController: IFeedController
    = {
    getFeeds: () => (new Promise(res => setTimeout(res, 0))),
    postFeed: () => (new Promise(res => setTimeout(res, 0))),
}