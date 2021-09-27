import { User } from "@feed/data/database"

import { IFeedCmdService } from "@feed/services"
import { IUserCmdService } from "@feed/services"
import { IUserQueryService } from "@feed/services"

import { loadFeature, defineFeature } from "jest-cucumber"
import { Connection, getConnection } from 'typeorm'
import { createFeedTestService } from '../../helpers/services'
import { createUserTestService } from '../../helpers/services'

const feature = loadFeature("./tests/_usecase/features/scenarios.1.feature")

defineFeature(feature, (test) => {
    test("1. 로그인 유저 친구목록 추가", ({ given, when, then }) => {
        let friendsCandidates: User[]
        let friendSelected: User
        let loginUser: User

        let conn: Connection
        let feedCmdService: IFeedCmdService
        let userQueryService: IUserQueryService
        let userCmdService: IUserCmdService

        given(/^친구로 등록 가능한 사용자 목록 확인$/, async () => {
            conn = getConnection();
            [userQueryService, userCmdService] = createUserTestService(conn);
            [,feedCmdService] = createFeedTestService(conn);
            friendsCandidates = await userQueryService.fetchAll()
            expect(friendsCandidates.length).toEqual(7)
        })
        when(/^사용자 프로필 확인 후 친구 등록$/, async() => {
            friendSelected = friendsCandidates.find(f => f.name = 'Jenny')
            await userCmdService.toggleFollow({
                friendUid: friendSelected.uuid,
                loginUserUid: '4fae',
            })
        })
        then(/^로그인 유저에 새로운 친구 추가됨$/, async() => {
            loginUser = await userQueryService.fetchUserInfo('4fae')
            expect(loginUser.leaders).toEqual(['3c07'])
        })
    })
})