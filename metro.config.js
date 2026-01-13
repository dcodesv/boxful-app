const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

// 1. Obtener la configuración base
const config = getDefaultConfig(__dirname);

// 2. Destructurar para acceder al transformer y resolver
const { transformer, resolver } = config;

// 3. Configurar el transformer para que use react-native-svg-transformer
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// 4. Modificar el resolver para mover 'svg' de assetExts a sourceExts
config.resolver = {
  ...resolver,
  // Excluimos 'svg' de la lista de assets (para que no lo trate como imagen estática)
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  // Lo añadimos a sourceExts (para que lo trate como código/componente)
  sourceExts: [...resolver.sourceExts, "svg"],
};

// 5. Exportar envolviendo la config modificada con NativeWind
module.exports = withNativeWind(config, { input: './global.css' });