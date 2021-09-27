import { IUserController } from '@gateway/controllers'
import { IAuthController } from '@gateway/controllers'
import { IFeedController } from '@gateway/controllers'

export const stubUserController: IUserController
    = {
    getUser: () => (new Promise(res => setTimeout(res, 0))),
    getUsers: () => (new Promise(res => setTimeout(res, 0))),
    putUser: () => (new Promise(res => setTimeout(res, 0))),
}

export const stubAuthController: IAuthController
    = {
    status: () => (new Promise(res => setTimeout(res, 0))),
    login: () => (new Promise(res => setTimeout(res, 0))),
    logout: () => (new Promise(res => setTimeout(res, 0))),
}

export const stubFeedController: IFeedController
    = {
    getFeeds: () => (new Promise(res => setTimeout(res, 0))),
    postFeed: () => (new Promise(res => setTimeout(res, 0))),
}
