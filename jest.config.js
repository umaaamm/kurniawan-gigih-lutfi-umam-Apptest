const config = {
    verbose: true,
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
      'node_modules/(?!(react-native' +
        '|@react-native' +
        '|@react-native-community' +
        '|@react-navigation' +
        '|react-navigation-tabs' +
        '|react-native-splash-screen' +
        '|react-native-screens' +
        '|react-native-reanimated' +
        '|axios'+
        '|react-native-toast-message'+
        '|react-native-image-picker'+
        '|react-redux'+
        '|react-native-gesture-handler'+
        ')/)',
    ],
  }
  
  module.exports = config