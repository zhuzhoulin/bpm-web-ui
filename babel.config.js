module.exports = {
  presets: [
    '@vue/app'
  ],
  sourceType: 'unambiguous'
}
// module.exports = (api) => {
//   const presets = [
//     [
//       '@babel/preset-env', {
//         'targets': {
//           'ie': '9'
//         },
//         'useBuiltIns': 'usage'
//       }
//     ]
//   ]
//   api.cache(false)

//   const plugins = [
//     '@babel/plugin-transform-react-jsx',
//     '@babel/plugin-transform-modules-commonjs'
//   ]
//   return { presets, plugins }
// }

// module.exports = {
//   presets: [
//     '@vue/app', {

//       // polyfills: [
//       //   'es6.promise',
//       //   'es6.symbol'
//       // ]
//     }],
//     plugins:[],
//   sourceType: 'unambiguous'
// }
// plugins: [
//   [
//     'import',
//     { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
//   ]
// ]
// }
