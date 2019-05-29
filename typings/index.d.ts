import '@types/cypress-axe';
import { ElementContext, RunOptions } from 'axe-core';

interface ViolationHandlers {
  logger?(violation: any): any;
  asserter?(violation: any): any;
}

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            checkA11y(context?: ElementContext, options?: RunOptions, violationHandlers?: ViolationHandlers): void;
        }
    }
}
