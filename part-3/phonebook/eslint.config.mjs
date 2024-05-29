import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin-js';


export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  { plugins: { '@stylistic/js': stylisticPlugin } },
  {
    ignores: ['dist']
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'arrow-spacing': [
        'error',
        { 'before': true, 'after': true }
      ],
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'always'
      ],
      'no-console': 0
    }
  }
];
