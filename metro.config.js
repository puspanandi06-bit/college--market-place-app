// Basic metro config to work well with Expo & Firebase
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = config;

