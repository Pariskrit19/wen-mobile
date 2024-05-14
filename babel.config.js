module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            tests: ['./tests/'],
            '@components/*': ['src/components/*'],
            '@helpers/*': ['src/helpers/*'],
            '@screens/*': ['src/screens/*'],
            '@assets/*': ['src/assets/*'],
            '@styles/*': ['src/styles/*'],
            '@services/*': ['src/services/*'],
            '@interfaces/*': ['src/ts/interfaces/*'],
            '@utils/*': ['src/utils/*'],
            '@types/*': ['src/ts/types*'],
            '@redux/*': ['src/redux/*'],
          },
        },
      ],
    ],
  }
}
