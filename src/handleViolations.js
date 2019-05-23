/* global assert */

const handleViolations = violations => {
  assert.strictEqual(violations.length, 0, `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${violations.length === 1 ? 'was' : 'were'} detected`)
}

exports.handleViolations = handleViolations
