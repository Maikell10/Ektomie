import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ActivityIndicator from "../components/ActivityIndicator";
import { store, setValue, logOut } from "../context/redux";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon, { Icons } from "../components/Icons";
import ColorScreen from "./ColorScreen";
import Perfil from "./Perfil";

import * as Animatable from "react-native-animatable";
import Colors from "../constants/Colors";
import ProfileData from "./Perfil/ProfileData";
import FirstScreen from "./principal/Home/FirstScreen";

const TabArr = [
    {
        route: "Inicio",
        label: "Inicio",
        type: Icons.Ionicons,
        activeIcon: "ios-home",
        inActiveIcon: "ios-home-outline",
        component: ColorScreen,
    },
    {
        route: "Guardado",
        label: "Guardado",
        type: Icons.MaterialCommunityIcons,
        activeIcon: "heart-pulse",
        inActiveIcon: "heart-outline",
        component: ColorScreen,
    },
    {
        route: "Historial",
        label: "Historial",
        type: Icons.MaterialCommunityIcons,
        activeIcon: "clipboard-account",
        inActiveIcon: "clipboard-account-outline",
        component: ColorScreen,
    },
    {
        route: "Chat",
        label: "Chat",
        type: Icons.Ionicons,
        activeIcon: "ios-chatbubbles",
        inActiveIcon: "ios-chatbubbles-outline",
        component: ColorScreen,
    },
    {
        route: "Perfil",
        label: "Perfil",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: Perfil,
    },

    {
        route: "ProfileData",
        label: "Perfil",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: ProfileData,
    },
    {
        route: "FirstScreen",
        label: "FirstScreen",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: FirstScreen,
    },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const { item, onPress, accessibilityState, index } = props;

    if (index < 5) {
        const focused = accessibilityState.selected;
        const viewRef = useRef(null);

        useEffect(() => {
            if (focused) {
                viewRef.current.animate({
                    0: { scale: 0.5, rotate: "0deg" },
                    1: { scale: 1.5, rotate: "360deg" },
                });
            } else {
                viewRef.current.animate({
                    0: { scale: 1.5, rotate: "360deg" },
                    1: { scale: 1, rotate: "0deg" },
                });
            }
        }, [focused]);

        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={1}
                style={styles.container}
            >
                <Animatable.View
                    ref={viewRef}
                    duration={1000}
                    style={styles.container}
                >
                    {index < 5 && (
                        <Icon
                            type={item.type}
                            name={focused ? item.activeIcon : item.inActiveIcon}
                            color={focused ? Colors.green : Colors.green2}
                        />
                    )}
                </Animatable.View>
            </TouchableOpacity>
        );
    }
};

function HomeScreen() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    //const auth = getAuth(app);

    const navigation = useNavigation();

    const logout = async () => {
        setLoading(true);
        const jsonValue = await AsyncStorage.getItem("auth");
        //console.log("valor", jsonValue);
        logOut;
        if (jsonValue != null) {
            const authFromJson = JSON.parse(jsonValue);
            if (authFromJson.accessToken) {
                await AuthSession.revokeAsync(
                    {
                        token: authFromJson.accessToken,
                    },
                    {
                        revocationEndpoint:
                            "https://oauth2.googleapis.com/revoke",
                    }
                );
            }

            // setAuthGoogle(undefined);
            // setUserInfo(undefined);
            await AsyncStorage.removeItem("auth");
            setLoading(false);

            navigation.replace("Login");
        }
    };

    useEffect(() => {
        //console.log("aca es => ", store.getState().user);
        setUser(store.getState().user?.payload);
        store.dispatch(setValue(40));

        if (!store.getState().user) {
            console.log("cerrar sesion");
            logout();
        }
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    left: 16,
                    borderRadius: 16,
                },
                tabBarItemStyle: {
                    height: 60,
                },
            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={item.route}
                        component={item.component}
                        options={{
                            tabBarButton: (props) => (
                                <TabButton
                                    {...props}
                                    item={item}
                                    index={index}
                                />
                            ),
                        }}
                    />
                );
            })}
        </Tab.Navigator>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
});
