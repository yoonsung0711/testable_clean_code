/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Post e2e', () => {
    beforeEach(() => {
        cy.intercept('POST', 'http://localhost:3010/api/auth/login', {
            statusCode: 401,
            body: {
                message: 'not authorized'
            }
        }).as('login')

        cy.intercept('GET', 'http://localhost:3010/api/users', {
            statusCode: 200,
            fixture: 'users.json'
        }).as('getUsers')

        cy.visit('http://localhost:3333/')

        cy.wait('@login')
            .its('response.statusCode')
            .should('be.oneOf', [401])

        cy.wait(300)

        cy.wait('@getUsers')
            .its('response.statusCode')
            .should('be.oneOf', [200])

        cy.wait(300)


        cy.get('ul.nav > li')
            .click()

        cy.wait(300)

        cy.intercept('POST', 'http://localhost:3010/api/auth/login', {
            statusCode: 200,
            body: {
                logginUser: {
                    "feedCursor": 0, 
                    "feeds": [], 
                    "followers": [], 
                    "leaders": [], 
                    "name": "Michael", 
                    "posts": [], 
                    "userDetail": {
                        "device": "Mobile", 
                        "deviceIcon": "fa-mobile-alt", 
                        "img": "avatar2", 
                        "userDetailId": "91cf4aa9", 
                        "uuid": "4fae"
                    }, "userId": "b4125da5", 
                    "uuid": "4fae"}
            }
        }).as('login')

        cy.intercept('GET', 'http://localhost:3010/api/feeds?target=login_user&query=unread', {
            statusCode: 200,
            fixture: 'james-feed.json'
        }).as('feeds')

        cy.get('div[data-user-index="0"] form.form-signin > button')
            .click()

        cy.wait(300)
    })

    context('Navbar', () => {
        it('login modal disappear on [close button on modal] clicked', () => {
            cy.intercept('GET', 'http://localhost:3010/api/feeds?target=login_user&query=recent', {
                statusCode: 200, 
                fixture: 'james-post.json'
            })

            cy.get('ul.nav > li#postNav')
                .click()

            // cy.wait(500)

            // cy.get('div.modal-footer > button[data-dismiss="modal"]')
            //     .click()

            // cy.wait(500)

            // cy.get('div.modal')
            //     .should('not.be.visible')
            //     .should('have.class', 'fade')
            //     .should('not.have.class', 'in')
        })
    })
})
