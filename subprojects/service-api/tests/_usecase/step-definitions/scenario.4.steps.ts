import { loadFeature, defineFeature } from "jest-cucumber"

const feature = loadFeature("./tests/_usecase/features/scenarios.4.feature");

//To share steps within the same feature file
// const thisIsASharedStep = (given: (regex: RegExp, params: () => void) => void) => {
//     given(/This is a Shared Step/, () => {
//         console.log("This is an example of a shared step.....");
//     })
// }

defineFeature(feature, (test) => {
    test("4. 새로운 게시글 작성", ({ given, when, then, and }) => {
        given(/^다른 사용자가 로그인 유저를 친구로 등록함$/, () => {
            console.log("given step is executed...");
        })
        when(/^로그인 유저가 새로운 게시글을 작성함$/, () => {
            console.log("given step is executed...");
        })
        then(/^로그인 유저의 작성글 목록에 새로운 게시글이 추가됨$/, () => {
            console.log("then step is executed...");
        })
        and(/^다른 사용자의 피드에 로그인 유저의 새 게시글이 추가됨$/, () => {
            console.log("then step is executed...");
        })
    })
})