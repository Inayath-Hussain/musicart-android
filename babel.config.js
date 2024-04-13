module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.ts', '.android.ts', '.ios.tsx', '.android.tsx', '.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
          '@src': './src/'
        },
      }
    ],
    'react-native-reanimated/plugin',
  ]
};
