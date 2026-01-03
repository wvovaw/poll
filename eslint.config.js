import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  stylistic: {
    semi: false,
    quotes: 'single',
    indent: 2,
  },
  javascript: {
    overrides: {
      'no-console': 'warn',
    },
  },
})
