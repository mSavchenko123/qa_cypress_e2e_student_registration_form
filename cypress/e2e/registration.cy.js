/// <reference types='cypress' />
import { faker } from '@faker-js/faker';

describe('Student Registration page', () => {
  let userData;

  beforeEach(() => {
    const generateMobile = () => {
      let number = '';
      for (let i = 0; i < 10; i++) {
        number += faker.string.numeric(1);
      }
      return number;
    };

    userData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      mobile: generateMobile(),
      currentAddress: faker.location.streetAddress()
    };
      userData.email = userData.firstName;
    
    cy.visit('https://demoqa.com/automation-practice-form');
  });


  it('Fills out the form and verifies the submitted data in the modal window', () => {
    cy.get('#firstName').type(userData.firstName);
    cy.get('#lastName').type(userData.lastName);
    cy.get('.custom-control-label[for="gender-radio-1"]').click();
    cy.get('#userEmail').type(userData.email);
    cy.get('#userNumber').type(userData.mobile);
    cy.get('.subjects-auto-complete__value-container').type('English{enter}');
    cy.get('[for="hobbies-checkbox-1"]').click();
    cy.get('[for="hobbies-checkbox-2"]').click();
    cy.get('[for="hobbies-checkbox-3"]').click();
    cy.get('#currentAddress').type(userData.currentAddress);
    cy.get('#state').click();
    cy.get('#react-select-3-option-1').click();
    cy.get('#city').click();
    cy.get('#react-select-4-option-2').click();
    cy.get('#submit').click();


    cy.contains('td', 'Student Name')
      .next('td')
      .should('contain', `${userData.firstName} ${userData.lastName}`);

    cy.contains('td', 'Student Email')
    .next('td')
    .should('contain', `${userData.firstName}@gmail.com`);

    cy.contains('td', 'Gender')
      .next('td')
      .should('have.text', 'Male');

    cy.contains('td', 'Mobile')
      .next('td')
      .should('contain', userData.mobile);

    cy.contains('td', 'Date of Birth')
      .next('td')
      .should('have.text', '10 May,2025');

    cy.contains('td', 'Subjects')
      .next('td')
      .should('have.text', 'English');

    cy.contains('td', 'Hobbies')
      .next('td')
      .should('have.text', 'Sports, Reading, Music');

    cy.contains('td', 'Picture')
      .next('td')
      .should('be.empty');

    cy.contains('td', 'Address')
      .next('td')
      .should('contain', userData.currentAddress);

    cy.contains('td', 'State and City')
      .next('td')
      .should('have.text', 'Uttar Pradesh Merrut');
  });
});
