/* global cy, assert, Cypress */

const fs = require('fs')
require('cypress-axe')

const UT8 = 'utf8'
const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', UT8)

const anyError = () => error => {
  console.trace(error)

  throw new Error(error)
}

const setupAxe = (context, options) => _window => {
  if (isEmptyObjectorNull(context)) context = undefined
  if (isEmptyObjectorNull(options)) options = undefined

  return _window.axe.run(context || _window.document, options)
}

const assertViolations = violations => {
  assert.strictEqual(
    violations.length,
    0,
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
}

const cypressLogViolations = ({ violations }) => {
  if (violations.length) {
    cy.wrap(violations, { log: false }).each(v => {
      Cypress.log({
        name: 'a11y error!',
        consoleProps: () => v,
        message: `${v.id} on ${v.nodes.length} Node${
          v.nodes.length === 1 ? '' : 's'
        }`
      })
    })
  }

  return cy.wrap(violations, { log: false })
}

Cypress.Commands.add('injectAxe', () => {
  cy.window({ log: false }).then(_window => {
    _window.eval(axe)
  })
})

Cypress.Commands.add('checkA11y', (context, options, finalTask) => {
  cy.window({ log: false })
    .then(setupAxe(context, options))
    .then(cypressLogViolations)
    .then(finalTask || assertViolations)
    .catch(anyError)
})

function isEmptyObjectorNull (value) {
  if (value == null) return true
  return Object.entries(value).length === 0 && value.constructor === Object
}
