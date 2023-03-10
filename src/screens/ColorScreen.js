import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Platform,
    ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Styles from "../common/Styles";
import Colors from "../constants/Colors";
import MyHeader from "../components/MyHeader";

import { store, setValue, auth, logOut, setUser } from "../context/redux";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrincipalScreen from "./principal/PrincipalScreen";
import GuardadoScreen from "./principal/GuardadoScreen";
import HistorialScreen from "./principal/HistorialScreen";
import ChatScreen from "./principal/ChatScreen";

export default function ColorScreen({ route, navigation }) {
    const [loading, setLoading] = useState(false);
    const [user, setUserState] = useState(null);

    const viewRef = React.useRef(null);
    const [bgColor, setBgColor] = useState();

    useEffect(() => {
        setUserState(store.getState().user?.payload);
        store.dispatch(setValue(40));

        switch (route.name) {
            case "Inicio": {
                setBgColor(Colors.white);
                break;
            }
            case "Guardado": {
                setBgColor(Colors.gold);
                break;
            }
            case "Historial": {
                setBgColor(Colors.red);
                break;
            }
            case "Chat": {
                setBgColor(Colors.purple);
                break;
            }
            case "Like": {
                setBgColor(Colors.yellow);
                break;
            }
            default:
                setBgColor(Colors.white);
        }
    }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            viewRef.current.animate({ 0: { opacity: 0.5 }, 1: { opacity: 1 } });
        });
        return () => unsubscribe;
    }, [navigation]);

    const logout = async () => {
        setLoading(true);
        const jsonValue = await AsyncStorage.getItem("auth");
        //console.log("valor", jsonValue);
        logOut;
        //store.dispatch(setUser(null));
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
            store.dispatch(setUser(null));
            await AsyncStorage.removeItem("auth");
            setLoading(false);

            navigation.replace("Login");
        }
    };

    function renderPrincipalScreen() {
        return <PrincipalScreen bgColor={bgColor} user={user} />;
    }

    function renderGuardadoScreen() {
        return <GuardadoScreen bgColor={bgColor} user={user} />;
    }

    function renderHistorialScreen() {
        return <HistorialScreen bgColor={bgColor} user={user} />;
    }

    function renderChatScreen() {
        return <ChatScreen bgColor={bgColor} user={user} />;
    }

    return (
        <View
            style={[
                Styles.container,
                Platform.OS !== "android" ? { marginTop: 40 } : "",
            ]}
        >
            <MyHeader
                //menu
                //onPressMenu={() => navigation.openDrawer()}
                title={route.name}
                right="more-vertical"
                onRightPress={() => console.log("right")}
            />
            <Animatable.View
                ref={viewRef}
                easing={"ease-in-out"}
                style={Styles.container}
            >
                {/* Ventana Home */}
                {route.name == "Inicio" && renderPrincipalScreen()}

                {/* Ventana Guardado */}
                {route.name == "Guardado" && renderGuardadoScreen()}

                {/* Ventana Historial */}
                {route.name == "Historial" && renderHistorialScreen()}

                {/* Ventana Chat */}
                {route.name == "Chat" && renderChatScreen()}
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
