const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Start with the default config
const config = getDefaultConfig(__dirname);

// Add SVG transformer config
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
};

config.resolver = {
  ...config.resolver,
   assetExts: [
    ...config.resolver.assetExts.filter((ext) => ext !== 'svg'),
    'png', 'jpg', 'jpeg'
  ],
  sourceExts: [...config.resolver.sourceExts, 'svg', 'cjs'],
};

// Export with NativeWind applied
module.exports = withNativeWind(config, { input: './global.css' });