# Better Cypress-Axe

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

---

![Accessibility](https://i.giphy.com/ZNBkgQnQ7vWNuO8FRM.gif)

This package extends the existing and already awesome [cypress-axe] package. This package bundles the required [axe-core] dependencies, which is the reason why I felt it should be a separate package to [cypress-axe].

## Who is this for?

- You're battling with a [Webpack setup issue].
- You want custom logging in the cypress console.
- You don't want the a11y issues failing the entire e2e tests - this can be an issue if you're adding this to a existing project.

## Installation

Assuming you already have [cypress] installed and setup.

```sh
npm i -D better-cypress-axe
```

**NOTE:** There is no need to add [axe-core] or [cypress-axe] as they're already bundled into this package to get around the issues mentioned above.

Then follow the steps from [cypress-axe setup]...

1. Import `better-cypress-axe` by adding to `cypress/support/index.js`

    ```js
    import "better-cypress-axe"
    ```

1. [injectAxe](https://github.com/avanslaars/cypress-axe#cyinjectaxe)
1. [configureAxe](https://github.com/avanslaars/cypress-axe#cyconfigureaxe)
1. [checkA11y](https://github.com/avanslaars/cypress-axe#cychecka11y)

## Custom Logging and Reporting

You can define a custom cypress loggers and violation handing by passing in an object to the `checkAlly` command.

This is useful for ensuring the logging follows a certain format, or that the final report doesn't fail a build.

You'll need to add a [cypress task] to log to the terminal console.

```js
const customViolationLogger = violation => cy.task("log", violation)
const customViolationHandler = violation => cy.task("log", violation)

cy.checkA11y(
    context, // can use null
    options, // can use null
    {
        logger: customViolationLogger,
        asserter: customViolationHandler
    }
)
```

## Development

```sh
# Use nvm or node version as per .nvmrc
nvm use

# Install Dependencies
npm i

# Build for deploy
npm run build
```

## Contributing

Contributions and PR's welcome

<!-- MARKDOWN REFERENCES -->

[axe-core]: https://github.com/dequelabs/axe-core
[cypress]: https://www.cypress.io/
[cypress-axe]: https://github.com/avanslaars/cypress-axe
[cypress-axe setup]: https://github.com/avanslaars/cypress-axe#include-the-commands
[cypress task]: https://docs.cypress.io/api/commands/task.html#Usage
[webpack setup issue]: https://github.com/avanslaars/cypress-axe/issues/7
