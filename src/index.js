/* global cy, Cypress */

const fs = require('fs')

require('cypress-axe')

const { configureAxe } = require('./configureAxe')
const { cypressLogViolations } = require('./cypressLogViolations')
const { handleViolations } = require('./handleViolations')

const UT8 = 'utf8'

const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', UT8)

Cypress.Commands.add('injectAxe', () => {
  cy.window({ log: false }).then(_window => {
    _window.eval(axe)
  })
})

Cypress.Commands.add('checkA11y', (context, options, violationCallback = handleViolations) => {
  cy.window({ log: false })
    .then(configureAxe(context, options))
    .then(cypressLogViolations)
    .then(violationCallback)
})
