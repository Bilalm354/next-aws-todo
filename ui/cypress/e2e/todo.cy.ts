/// <reference types="cypress" />

import { Todo } from '../../../common/types/Todo';

const defaultTodos: Todo[] = [
  { id: 1, text: 'Pay electric bill', isChecked: false },
  { id: 2, text: 'Walk the dog', isChecked: false },
];


describe('to-do app', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('GET', 'https://s7geuw06y9.execute-api.us-east-1.amazonaws.com/prod/todo', { todos: defaultTodos })
  })

  it('displays two todo items by default', () => {
    cy.get('.todo-list li').should('have.length', 2)
    cy.get('.todo-list li div span').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li div span').last().should('have.text', 'Walk the dog')
  })

  it('can add new todo items', () => {
    const newItem = 'Feed the cat'

    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)
    cy.get('.todo-list li div span')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem)
  })

  it('can check off an item as completed', () => {
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check()

    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed')
  })

  context('with a checked task', () => {
    beforeEach(() => {
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    it('can filter for uncompleted tasks', () => {
      cy.contains('Active').click()

      cy.get('.todo-list li div span')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog')

      cy.contains('Pay electric bill').should('not.exist')
    })

    it('can filter for completed tasks', () => {
      cy.contains('Completed').click()

      cy.get('.todo-list li div span')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill')

      cy.contains('Walk the dog').should('not.exist')
    })

    it('can delete all completed tasks', () => {
      cy.contains('Clear Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')

      cy.contains('Clear completed').should('not.exist')
    })
  })

  it('can update the text of a todo', () => {
    cy.contains('Pay electric bill')
      .parent()
      .parent()
      .contains('Edit')
      .click()
    
    const newItemText = 'Pay the electric bill'
    
    cy.get('[data-test=new-todo]').clear().type(`${newItemText}{enter}`);
    cy.contains('Pay the electric bill').should('exist');
    cy.contains('Pay electric bill').should('not.exist');
  })

  it('clears the todo input after adding a todo', () => {
    const itemText = 'Feed the cat'

    cy.get('[data-test=new-todo]').type(`${itemText}{enter}`).should('have.value', '')
  })

  it('does not allow empty todo items', () => {
    cy.get('[data-test=new-todo]').type('{enter}')

    cy.get('.todo-list li').should('have.length', 2)
  })

  it.skip('can delete a todo item', () => {

  })

  it.skip('can delete all todo items', () => {})
})