import { User } from "@feed/data/database";
import { IFeedCmdService, IUserCmdService, IUserQueryService } from "@feed/services"
import { createFeedTestService, createUserTestService } from "@tests/helpers/services"
import { Connection, getConnection } from 'typeorm'
import { loadFeature, defineFeature } from "jest-cucumber"

const feature = loadFeature("./tests/_usecase/features/scenarios.2.feature")

//To share steps within the same feature file
// const thisIsASharedStep = (given: (regex: RegExp, params: () => void) => void) => {
//     given(/This is a Shared Step/, () => {
//         console.log("This is an example of a shared step.....");
//     })
// }

defineFeature(feature, (test) => {
    test("2. 친구로부터 피드 수신", ({ given, when, then }) => {
        let loginUser: User
        let friendsCandidates: User[]
        let friendSelected: User
        let publishedFeedUid: string

        let conn: Connection
        let feedCmdService: IFeedCmdService
        let userQueryService: IUserQueryService
        let userCmdService: IUserCmdService

        given(/^시나리오 1 실행$/, async () => {
            conn = getConnection();
            [userQueryService, userCmdService] = createUserTestService(conn);
            [,feedCmdService] = createFeedTestService(conn);
            friendsCandidates = await userQueryService.fetchAll()
            friendSelected = friendsCandidates.find(f => f.name = 'Jenny')
            await userCmdService.toggleFollow({
                friendUid: friendSelected.uuid,
                loginUserUid: '4fae',
            })
            loginUser = await userQueryService.fetchUserInfo('4fae')
            expect(loginUser.leaders).toEqual(['3c07'])
        })
        when(/^친구로 등록한 사용자가 새 게시글 작성$/, async() => {
            publishedFeedUid = await feedCmdService.publishPost({
                parentUid: '0',
                writerUid: '3c07',
                msg: 'this is new message'
            })
            await userCmdService.addUserPostToList({ loginUserUid: loginUser.uuid, postUid: publishedFeedUid })
            await userCmdService.addUserFeedToList({ subscriberUid: loginUser.uuid, feedUid: publishedFeedUid })
        })
        then(/^로그인 유저의 읽지 않은 피드 증가$/, async() => {
            loginUser = await userQueryService.fetchLoginUserInfo('4fae')
            expect(loginUser.posts).toEqual([ publishedFeedUid ])
        })
    })
})