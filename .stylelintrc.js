const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  "rules": {
    "selector-pseudo-class-no-unknown": null,
    "shorthand-property-no-redundant-values": null,
    "at-rule-empty-line-before": null,
    "at-rule-name-space-after": null,
    "comment-empty-line-before": null,
    "declaration-bang-space-before": null,
    "declaration-empty-line-before": null,
    "function-comma-newline-after": null,
    "function-name-case": null,
    "function-parentheses-newline-inside": null,
    "function-max-empty-lines": null,
    "function-whitespace-after": null,
    "number-leading-zero": null,
    "number-no-trailing-zeros": null,
    "rule-empty-line-before": null,
    "selector-combinator-space-after": null,
    "selector-list-comma-newline-after": null,
    "selector-pseudo-element-colon-notation": null,
    "unit-no-unknown": null,
    "no-descending-specificity": null,
    "value-list-max-empty-lines": null,
    "indentation": 2,
    "color-hex-case": "upper",
    "no-duplicate-selectors": null,
    'font-family-no-missing-generic-family-keyword': null,
    "value-keyword-case": null,
}
};