beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
<<<<<<< HEA
=======
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
>>>>>>> f7e56ef76030d4e2151ff9ea3435b7d52f238d71
    * email format
 */
describe('Section 1: Visual tests', () => {

    it('Check that the logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')

        // Get element and check its parameter height
        cy.get('img').invoke('height').should('be.lessThan', 167)
            .and('be.greaterThan', 165)

        // Get element and check its parameter width
        cy.get('img').invoke('width').should('be.lessThan', 179)
            .and('be.greaterThan', 177)
    })

    it('Check the radio button content and functionality', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

        // Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check the dropdown selection and its dependencies', () => {
        cy.get('#country').find('option').should('have.length', 4)

        // The elements of country Spain and its city lists are correct and dependant on each other
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').select('Spain')
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

        // The elements of country Estonia and its city lists are correct and dependant on each other
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').select('Estonia')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

        // The elements of country Austria and its city lists are correct and dependant on each other
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
        cy.get('#country').select('Austria')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
    })

    it('Check that the previously chosen city gets removed after changing the country', () => {
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').select('Spain')
        cy.get('#city').children().should('have.length', 5)
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#country').select('Estonia')
        cy.get('#city').find('option').eq(2).should('not.be.checked')
    })

    it('Check the e-mail format', () => {
        // Check that the email requires valid format
        cy.get('.email')
        cy.get('.email').type('invalid.com')
        cy.get('#emailAlert').should('be.visible')
    })

    it('Check the checkboxes, their content and links', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').parent().should('contain', 'Accept our privacy policy')
        cy.get('input[type="checkbox"]').parent().get('a[href]').should('contain', 'Accept our cookie policy')
    })
})


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

// Variables

import { faker } from '@faker-js/faker';

const randomFullname = faker.person.fullName()
const randomEmail = faker.internet.email()

describe('Section 2: Functional tests', () => {

    it('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields
        cy.get('#name').type(randomFullname)
        cy.get('.email').type(randomEmail)
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tartu')
        cy.contains('Date of registration').next().type('2024-07-05').should('have.value', '2024-07-05')
        cy.get('[type="radio"]').check('Daily')
        cy.get('#birthday').first().type('1991-01-06').should('have.value', '1991-01-06')
        cy.get('input[type="checkbox"]').should('have.length', 2)
        cy.get('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="checkbox"]').eq(1).click()

        // Assert that submit button is enabled
        cy.get('input[type="submit"]').should('be.enabled')

        // Assert that after submitting the form system shows successful message
        cy.get('input[type="submit"]').click()
        cy.get('h1').should('have.text', 'Submission received')
        cy.url().should('contain', '/cypress/fixtures/upload_file.html?')

    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        // Filling all the mandatory fields
        fillMandatoryFields()
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tartu')
        // Assert that submit button is enabled
        cy.get('input[type="submit"]').should('be.enabled')

        // Assert that after submitting the form system shows successful message
        cy.get('input[type="submit"]').click()
        cy.get('h1').should('have.text', 'Submission received')
        cy.url().should('contain', '/cypress/fixtures/upload_file.html?')
})

    it('User cannot submit form with unfilled mandatory field', () => {
        // Function for filling all the mandatory fields
        fillMandatoryFields()
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tartu')
        // Clear the mandatory e-mail field
        cy.get('.email').clear()

        // Assert that the submit button is disabled and the error message is visible
        cy.get('input[type="submit"]').should('not.be.enabled')
    });
})

function fillMandatoryFields() {
    cy.get('#name').type(randomFullname)
    cy.get('[name="email"]').type(randomEmail)
    cy.get('input[type="checkbox"]').eq(0).click()
}
