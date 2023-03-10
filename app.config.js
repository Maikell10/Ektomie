import "dotenv/config";

export default {
    expo: {
        //originalFullName: "Ektomie App",
        name: "ektomie",
        slug: "ektomie",
        version: "1.2.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        scheme: "com.ektomie.ektomie",
        splash: {
            image: "./assets/splashh.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.ektomie.ektomie",
            buildNumber: "1.2.0",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF",
            },
            package: "com.ektomie.ektomie",
            versionCode: 3,
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        extra: {
            apiKey: process.env.APY_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASSUREMENT_ID,
            eas: {
                projectId: "b648456a-9e2a-4988-a58f-de8d52078c56",
            },
            authGoogle: {
                androidClientId:
                    "153495515930-5d0du55pn4ovig13up9r4sb6th85pili.apps.googleusercontent.com",
                iosClientId:
                    "153495515930-l93evaes0bvkp8ajgv8lbolf16miiqv5.apps.googleusercontent.com",
                expoClientId:
                    "153495515930-q9akjbd4la446antd0idnggs4kbkd9ds.apps.googleusercontent.com",
            },
        },
    },
};
