/* global cy, Cypress */

function defaultViolationLogger ({ violations }) {
  if (violations.length) {
    cy.wrap(violations, { log: false }).each(v => {
      Cypress.log({
        name: 'a11y error!',
        consoleProps: () => v,
        message: `${v.id} on ${v.nodes.length} Node${v.nodes.length === 1 ? '' : 's'}`
      })
    })
  }

  return cy.wrap(violations, { log: false })
}

exports.defaultViolationLogger = defaultViolationLogger
