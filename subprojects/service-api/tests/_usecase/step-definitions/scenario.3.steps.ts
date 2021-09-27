import { loadFeature, defineFeature } from "jest-cucumber"
import { scenario_1_2 } from './shared_steps'
import { Connection, getConnection } from 'typeorm';
import { User } from "@feed/data/database";
import { IFeedCmdService, IFeedQueryService, IUserCmdService, IUserQueryService } from "@feed/services";
import { createFeedTestService, createUserTestService } from "@tests/helpers/services";

const feature = loadFeature("./tests/_usecase/features/scenarios.3.feature");

defineFeature(feature, (test) => {
    let friendsCandidates: User[]
    let friendSelected: User

    let conn: Connection
    let feedCmdService: IFeedCmdService
    let feedQueryService: IFeedQueryService
    let userQueryService: IUserQueryService
    let userCmdService: IUserCmdService

    test("3. 수신한 피드 확인", ({ given, when, then }) => {

        scenario_1_2(given)
        let user: User

        when(/^수신한 피드 확인$/, async() => {
            conn = getConnection();
            [userQueryService, userCmdService] = createUserTestService(conn);
            [feedQueryService, feedCmdService] = createFeedTestService(conn);

            user = await userQueryService.fetchLoginUserInfo('4fae')
            expect(user.feeds.length - user.feedCursor).toBe(1)
            await feedQueryService.readUnreadFeeds({ loginUserUid: '4fae', batchSize: 10 })

        })
        then(/^읽지 않은 피드 개수 감소$/, async() => {
            expect(user.feeds.length - user.feedCursor).toBe(0)
        })
    })
})