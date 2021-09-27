Feature: Demo Feature

    # Scenario: 1. 로그인 유저 친구목록 추가
    #     Given 친구로 등록 가능한 사용자 목록 확인
    #     When 사용자 프로필 확인
    #     Then 친구 등록

    # Scenario: 2. 친구로부터 피드 수신
    #     Given 시나리오 1 실행
    #     And 친구로 등록한 사용자가 새 게시글 작성
    #     Then 읽지 않은 피드 증가

    # Scenario: 3. 수신한 피드 확인
    #     Given 시나리오 1 및 2 실행
    #     When 수신한 피드 확인
    #     Then 읽지 않은 피드 개수 감소

    Scenario: 4. 새로운 게시글 작성
        Given 다른 사용자가 로그인 유저를 친구로 등록함
        When 로그인 유저가 새로운 게시글을 작성함
        Then 로그인 유저의 작성글 목록에 새로운 게시글이 추가됨
        And 다른 사용자의 피드에 로그인 유저의 새 게시글이 추가됨

