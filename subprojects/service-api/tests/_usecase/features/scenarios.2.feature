Feature: 피드 수신 및 확인

    # Scenario: 1. 로그인 유저 친구목록 추가
    #     Given 친구로 등록 가능한 사용자 목록 확인
    #     When 사용자 프로필 확인 후 친구 등록
    #     Then 로그인 유저에 새로운 친구 추가됨

    Scenario: 2. 친구로부터 피드 수신
        Given 시나리오 1 실행
        When 친구로 등록한 사용자가 새 게시글 작성
        Then 로그인 유저의 읽지 않은 피드 증가

    # Scenario: 3. 수신한 피드 확인
    #     Given 시나리오 1 및 2 실행
    #     When 수신한 피드 확인
    #     Then 읽지 않은 피드 개수 감소

    # Scenario: 4. 친구로부터 피드 수신
    #     Given 시나리오 1 실행
    #     And 친구로 등록한 사용자가 새 게시글 작성
    #     Then 읽지 않은 피드 증가


