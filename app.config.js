import 'dotenv/config';

export default {
	name: process.env.NAME,
	slug: process.env.NAME,
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	scheme: process.env.SCHEME,
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff"
	},
	updates: {
		fallbackToCacheTimeout: 0
	},
	assetBundlePatterns: [
		"**/*"
	],
	ios: {
		bundleIdentifier: process.env.PACKAGE_NAME,
		buildNumber: "1.0.0",
		supportsTablet: false,
		config: {
			googleMapsApiKey: process.env.IOS_GOOGLE_MAPS_API_KEY
		}
	},
	android: {
		package: process.env.PACKAGE_NAME,
		versionCode: 1,
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#FFFFFF"
		},
		config: {
			googleMaps: {
				apiKey: process.env.ANDROID_GOOGLE_MAPS_API_KEY
			}
		}
	},
	web: {
		favicon: "./assets/favicon.png"
	}
};