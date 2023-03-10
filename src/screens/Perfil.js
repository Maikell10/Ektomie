import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Button,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MyHeader from "../components/MyHeader";

import { store, logOut, setUser } from "../context/redux";

const Perfil = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    console.log("PANTALLA PERFIL => ", store.getState());

    const user = store.getState().user?.payload;
    const value = store.getState().value?.payload;
    console.log(value);

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
            store.dispatch(setUser(null));
            await AsyncStorage.removeItem("auth");
            setLoading(false);

            navigation.replace("Login");
        }
    };

    return (
        <View
            style={[
                Platform.OS !== "android" ? { marginTop: 40 } : "",
                { flex: 1 },
            ]}
        >
            <MyHeader
                //menu
                //onPressMenu={() => navigation.goBack()}
                title={"Perfil"}
                right="more-vertical"
                onRightPress={() =>
                    navigation.navigate("ProfileOptions", {
                        usuario: user,
                        logout: logout,
                    })
                }
            />

            {user ? (
                <View
                    style={{
                        backgroundColor: "#F6F6F6",
                        flex: 1,
                        padding: 10,
                    }}
                >
                    {user.completado ? (
                        ""
                    ) : (
                        <Text style={styles.textCompleteAlert}>
                            Debe completar su perfil
                        </Text>
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 7,
                        }}
                    >
                        {user.picture ? (
                            <Image
                                style={styles.logo}
                                source={{ uri: user.picture }}
                            />
                        ) : (
                            <View
                                style={[
                                    styles.logo,
                                    {
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 1,
                                        borderColor: "lightgrey",
                                        shadowColor: "#171717",
                                        shadowOffset: { width: -2, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 3,
                                    },
                                ]}
                            >
                                {(user.cliente == false ||
                                    user.medico == true) && (
                                    <FontAwesome
                                        name="user-md"
                                        size={48}
                                        color="black"
                                    />
                                )}

                                {(user.cliente == true ||
                                    user.medico == false) && (
                                    <FontAwesome
                                        name="user"
                                        size={48}
                                        color="black"
                                    />
                                )}
                            </View>
                        )}

                        <TouchableOpacity style={{ alignItems: "center" }}>
                            <Text>10</Text>
                            <Text>Calificaciones</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: "center" }}>
                            <Text>10</Text>
                            <Text>Seguidos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: "center" }}>
                            <Text>10</Text>
                            <Text>Siguiendo</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.textProfile}>
                            {user?.name ? user?.name : user?.nameUser}
                        </Text>
                        <Text style={styles.textProfile}>{user.email}</Text>
                    </View>

                    <View
                        style={{
                            borderColor: "#DCDCDC",
                            borderWidth: 1,
                            marginVertical: 5,
                        }}
                    />

                    <Text style={styles.text}>
                        Tipo usuario: {user.cliente ? "Paciente" : ""}{" "}
                        {user.medico ? "Médico" : ""}
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate("ProfileData", {
                                usuario: user,
                                logout: logout,
                            })
                        }
                    >
                        <Text style={styles.buttonText}>Editar perfil</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
};

export default Perfil;

const styles = StyleSheet.create({
    textCompleteAlert: {
        fontSize: 17,
        marginVertical: 7,
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
    },
    textTitle: {
        fontSize: 17,
        marginVertical: 7,
        marginLeft: 10,
        fontWeight: "bold",
    },
    textProfile: {
        fontSize: 17,
        marginVertical: 2,
        fontSize: 14,
        fontWeight: "500",
    },
    text: {
        fontSize: 17,
        marginVertical: 7,
        fontWeight: "600",
        textAlign: "center",
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    button: {
        marginTop: 8,
        width: "100%",
        height: 30,
        backgroundColor: "rgba(96, 197, 168, 0.8)",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
