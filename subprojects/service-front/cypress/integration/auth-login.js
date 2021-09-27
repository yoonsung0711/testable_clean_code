/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Auth e2e', () => {
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

        cy.intercept('GET', 'http://localhost:3010/api/feeds?target=login_user&query=unread', {
            statusCode: 200,
            fixture: 'james-feed.json'
        }).as('feeds')

        cy.wait(300)
    })

    context('Navbar', () => {
        it('has login menu', () => {
            cy.get('ul.nav > li')
                .find('a')
                .eq(0)
                .as('login')

            cy.wait(500)

            cy.get('@login')
                .should('contain', 'login')
        })

        it('login modal pops up on [login navbar menu] clicked', () => {
            cy.get('ul.nav > li')
                .click()

            cy.wait(500)

            cy.get('div.modal')
                .should('be.visible')
                .should('have.class', 'fade')
                .should('have.class', 'in')
        })

        it('login modal pops on && ["next" control on modal] clicked', () => {
            cy.get('ul.nav > li')
                .click()
            
            cy.wait(500)

            cy.get('div.right.carousel-control')
                .click()

            cy.wait(500)

            cy.get('div.right.carousel-control')
                .click()

            cy.wait(500)

            cy.get('div[data-user-index="2"]')
                .should('be.visible')
                .should('not.have.css', 'display', 'none')
                .should('contain', 'Jenny')
        })

        it('login modal disappear on [close button on modal] clicked', () => {
            cy.get('ul.nav > li')
                .click()

            cy.wait(500)

            cy.get('div.modal-footer > button[data-dismiss="modal"]')
                .click()

            cy.wait(500)

            cy.get('div.modal')
                .should('not.be.visible')
                .should('have.class', 'fade')
                .should('not.have.class', 'in')
        })

        it('process login when [ sign-in button on modal] clicked', () => {
            cy.get('ul.nav > li')
                .click()

            cy.wait(500)

            cy.intercept('POST', 'http://localhost:3010/api/auth/login', {
                statusCode: 200,
                body: {
                    logginUser: {
                        "feedCursor": 0, 
                        "feeds": [], "followers": [], "leaders": [], "name": "Michael", "posts": [], "userDetail": {"device": "Mobile", "deviceIcon": "fa-mobile-alt", "img": "avatar2", "userDetailId": "91cf4aa9", "uuid": "4fae"}, "userId": "b4125da5", "uuid": "4fae"}
                }
            }).as('login')


            cy.get('div[data-user-index="0"] form.form-signin > button')
                .click()

            cy.wait(500)

        })

        it('process logout when [ log-out button on modal] clicked', () => {
            cy.get('ul.nav > li')
                .click()

            cy.wait(500)

            cy.intercept('POST', 'http://localhost:3010/api/auth/login', {
                statusCode: 200,
                body: {
                    logginUser: {
                        "feedCursor": 0, 
                        "feeds": [], "followers": [], "leaders": [], "name": "Michael", "posts": [], "userDetail": {"device": "Mobile", "deviceIcon": "fa-mobile-alt", "img": "avatar2", "userDetailId": "91cf4aa9", "uuid": "4fae"}, "userId": "b4125da5", "uuid": "4fae"}
                }
            }).as('login')


            cy.get('div[data-user-index="0"] form.form-signin > button')
                .click()

            cy.wait(300)

            cy.get('ul.nav > li#logoutNav')
                .click()
                
            cy.wait(300)

            cy.intercept('POST', 'http://localhost:3010/api/auth/logout', {
                statusCode: 200,
                body: {
                    logginUser: undefined
                }
            }).as('login')

            cy.get('a#logout')
                .click()
        })
    })

})
