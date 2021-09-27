import { User } from "@feed/data/database";
import { IFeedCmdService, IUserCmdService, IUserQueryService } from "@feed/services";
import { createFeedTestService, createUserTestService } from "@tests/helpers/services";
import { Connection, getConnection } from 'typeorm';

//To share the steps among multiple feature files
export const anotherSharedStepWithParameter = (when: (regex: RegExp, params: (p: string) => void) => void) => {
    when(/^Another shared step with parameter '(.*)'$/, (text: string) => {
        console.log(`Shared Step Example : Text - ${text}`);
    })
}


export const scenario_1_2 = (given: (regex: RegExp, params: () => void) => void) => {
    let loginUser: User
    let friendsCandidates: User[]
    let friendSelected: User
    let publishedFeedUid: string

    let conn: Connection
    let feedCmdService: IFeedCmdService
    let userQueryService: IUserQueryService
    let userCmdService: IUserCmdService

    given(/시나리오 1 및 2 실행/, async() => {
        conn = getConnection();
        [userQueryService ,userCmdService] = createUserTestService(conn);
        [,feedCmdService] = createFeedTestService(conn);
        friendsCandidates = await userQueryService.fetchAll()
        friendSelected = friendsCandidates.find(f => f.name = 'Jenny')

        await userCmdService.toggleFollow({
            friendUid: friendSelected.uuid,
            loginUserUid: '4fae',
        })

        loginUser = await userQueryService.fetchUserInfo('4fae')
        publishedFeedUid = await feedCmdService.publishPost({
            parentUid: '0',
            writerUid: '3c07',
            msg: 'this is new message'
        })
        await userCmdService.addUserPostToList({ loginUserUid: '3c07', postUid: publishedFeedUid })
        await userCmdService.addUserFeedToList({ loginUserUid: '3c07', feedUid: publishedFeedUid })
    })
}
