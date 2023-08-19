
module.exports = {
    "jest": {
        "globals": {
        "__DEV__": true
        }
     },
    "transformIgnorePatterns": [
        "node_modules/(?!(jest-)?react-native)",
        "node_modules/?!(react-navigation)"
    ]
}