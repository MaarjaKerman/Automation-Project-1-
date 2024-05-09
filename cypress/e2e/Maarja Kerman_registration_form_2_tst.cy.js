beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Variables
import { faker } from '@faker-js/faker';
const randomUsername = faker.internet.userName()
const randomEmail = faker.internet.email()
const randomFirstname = faker.person.firstName()
const randomLastName = faker.person.lastName()
const randomPhone = faker.phone.number()
let randomPassword = faker.internet.password()

// Function
function inputMandatoryData() {
cy.log('Username will be filled')
cy.get('input[data-testid="user"]').type(randomUsername)
cy.get('#email').type(randomEmail)
cy.get('[data-cy="name"]').type(randomFirstname)
cy.get('#lastName').type(randomLastName)
cy.get('[data-testid="phoneNumberTestId"]').type(randomPhone)
cy.get('#password').type(randomPassword)
cy.get('#confirm').type(randomPassword)
cy.get('h2').contains('Password').click()
}

/*
Assignement 4: add content to the following tests
*/
describe('Section 1: Functional tests', () => {
    
    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type(randomUsername)
        cy.get('input[name="email"]').type(randomEmail)
        cy.get('input[name="name"]').type(randomFirstname)
        cy.get('input[name="lastName"]').type(randomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(randomPhone)

        cy.get('input[name="password"]').type(randomPassword)
        cy.get('[name="confirm"]').type('SecurePW001')
        cy.get('.submit_button').should('not.be.enabled')
        cy.contains('Password section').click()
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')

        cy.get('[name="confirm"]').clear('').type(randomPassword)
        cy.contains('Password section').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible')
    })
    
    it('User can submit form with all fields added', () => {
        cy.get('#username').type(randomUsername)
        cy.get('input[name="email"]').type(randomEmail)
        cy.get('input[name="name"]').type(randomFirstname)
        cy.get('input[name="lastName"]').type(randomLastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(randomPhone)
        cy.get('[type="radio"]').check('JavaScript')
        cy.get('[type="checkbox"]').check('Bike')
        cy.get('#cars').select('saab')
        cy.get('#animal').select('cat')
        cy.get('input[name="password"]').type(randomPassword)
        cy.get('[name="confirm"]').type(randomPassword)

        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')
    })
    
    it('User can submit form with valid data and only mandatory fields added', () => {
        inputMandatoryData()
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should('be.enabled').click()
        cy.contains('#success_message', 'User successfully submitted registration').should('be.visible')
    })

    it('User cannot submit form without mandatory email field filled', () => {
        inputMandatoryData()
        cy.get('#email').clear()
        cy.get('.submit_button').click().should('not.be.enabled')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
    })
})

/*
Assignement 5: create more visual tests
*/
describe('Section 2: Visual tests', () => {

    it('Check that the Cerebrum Hub logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check that the Cypress logo is correct and has the correct size', () => {
        cy.log('Will check second logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.greaterThan', 115).and('be.lessThan', 117)
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.greaterThan', 87).and('be.lessThan', 89)
    })

    it('Navigation part 1', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Navigation part 2', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')
        
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')
        
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
        
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
    })
    
    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
    })

    it('Animal dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').next().eq(0).should('have.text', 'Dog')
        cy.get('#animal').next().eq(1).should('have.text', 'Cat')
        cy.get('#animal').next().eq(2).should('have.text', 'Snake')
        cy.get('#animal').next().eq(3).should('have.text', 'Hippo')
        cy.get('#animal').next().eq(3).should('have.text', 'Cow')
        cy.get('#animal').next().eq(3).should('have.text', 'Mouse')
        
        cy.get('#animal').select(1).should('have.value', 'cat')
        cy.get('#animal').select(4).should('have.value', 'cow')
        cy.get("#animal").select(1).should('not.be.selected')
    })
})
})