module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // react-native-worklets/plugin MUST stay last (Reanimated 4 requirement).
    plugins: ['react-native-worklets/plugin'],
  };
};
