'use strict'

const testRule = require('stylelint-test-rule-tape')
const useRem = require('..')

const defaultTest = {
  ruleName: useRem.ruleName,

  config: [true, {ignore: ['1px']}],

  skipBasicChecks: true,

  accept: [
    { code: '.foo { border-left: 1px solid #333; }' },
    { code: '.foo { border-left: 0px solid #333; }' },
    { code: '.foo { width: 1px; }' },
    { code: '.foo { color: moccasin; }' },
  ],

  reject: [
    { line: 1, column: 8, code: '.foo { font-size: 15in; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15q; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15mm; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15cm; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15pt; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15pc; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15em; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15ex; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15ch; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15vw; }', },
    { line: 1, column: 8, code: '.foo { font-size: 15vh; }', },
    { line: 1, column: 8, code: '.foo { font-size: ~\'@{width}in\'; }', },
    // { line: 1, column: 8, code: '.foo { font-size: ~\'@{width}in solid\'; }', },
    {
      code: '.foo { font-size: 15px; }',
      line: 1,
      column: 8,
    },
    {
      code: '.foo { margin-left: -10px; }',
      line: 1,
      column: 8,
    },
    {
      code: '.foo { margin-left: +10px; }',
      line: 1,
      column: 8,
    },
    {
      code: '@width: 1;\n.foo { border-width: ~\'@{width}px solid #333\'; }',
      line: 2,
      column: 8,
    },
    {
      code: '@width: 10px;\n.foo { border-width: @width * 2 solid #333; }',
      line: 1,
      column: 1,
    },
  ],
}

// border && 1px
testRule(useRem.rule, defaultTest)

// border && 1px
testRule(useRem.rule, Object.assign({}, defaultTest, {
  config: true,
}))

// all
testRule(useRem.rule, {
  ruleName: useRem.ruleName,

  config: [true, {ignore: []}],

  skipBasicChecks: true,

  accept: [
  ],

  reject: [
    {
      code: '.foo { border-left: 1px solid #333; }',
      line: 1,
      column: 8,
    },
    {
      code: '@width: 1;\n.foo { border-width: ~\'@{width}px solid #333\'; }',
      line: 2,
      column: 8,
    },
    {
      code: '@width: 10px;\n.foo { border-width: @width * 2 solid #333; }',
      line: 1,
      column: 1,
    },
  ],
})

// font || 1px
testRule(useRem.rule, {
  ruleName: useRem.ruleName,

  config: [true, {ignore: ['1px', 'font']}],

  skipBasicChecks: true,

  accept: [
    { code: '.foo { border-left: 1px solid #333; }' },
    { code: '.foo { font-size: 15px; }' },
    { code: '.foo { font-size: 1px; }' },
  ],

  reject: [
    {
      code: '@width: 1;\n.foo { border-width: ~\'@{width}px solid #333\'; }',
      line: 2,
      column: 8,
    },
    {
      code: '@width: 10px;\n.foo { border-width: @width * 2 solid #333; }',
      line: 1,
      column: 1,
    },
  ],
})

// font
testRule(useRem.rule, {
  ruleName: useRem.ruleName,

  config: [true, {ignore: ['font']}],

  skipBasicChecks: true,

  accept: [
    { code: '.foo { font-size: 15px; }' },
    { code: '.foo { font-size: 1px; }' },
  ],

  reject: [
    {
      code: '.foo { border-left: 1px solid #333; }',
      line: 1,
      column: 8,
    },
    {
      code: '@width: 1;\n.foo { border-width: ~\'@{width}px solid #333\'; }',
      line: 2,
      column: 8,
    },
    {
      code: '@width: 10px;\n.foo { border-width: @width * 2 solid #333; }',
      line: 1,
      column: 1,
    },
  ],
})

// disabled
testRule(useRem.rule, {
  ruleName: useRem.ruleName,

  config: false,

  skipBasicChecks: true,

  accept: [
    {
      code: '.foo { padding: 20px; }',
      line: 2,
      column: 8,
    },
    {
      code: '@width: 10px;\n.foo { border-width: @width * 2 solid #333; }',
      line: 1,
      column: 1,
    },
  ],
})

// ignoreFunctions
testRule(useRem.rule, {
  ruleName: useRem.ruleName,

  config: [true, {ignoreFunctions: ['rem', 'rem-calc']}],

  skipBasicChecks: true,

  accept: [
    { code: '.foo { font-size: rem(15px); border-left: rem-calc(12px) solid #333; }' },
  ],

  reject: [
    {
      code: '.foo { width: calc(100% - 12px); }',
      line: 1,
      column: 8,
    },
  ],
})
