module.exports = {
  appId: 'io.ionic.starter',
  appName: 'zakimobile',
  webDir: 'dist', // ← très important !
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      android: {
        requestPermissions: true,
        saveToGallery: true,
      },
      ios: {
        saveToGallery: true,
      },
    },
  },
};
