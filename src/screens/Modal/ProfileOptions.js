import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import MyHeader from "../../components/MyHeader";

const ProfileOptions = ({ navigation }) => {
    const user = navigation.getState().routes[1].params.usuario;
    const onPress = navigation.getState().routes[1].params.logout;

    const cerrarSesion = () => {
        onPress();
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1 }}>
            <MyHeader
                // menu
                // onPressMenu={() => navigation.goBack()}
                title={user.nameUser}
                headerBg="rgba(0, 147, 255, 0.5 )"
                style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
            />

            <View style={{ alignItems: "center", marginTop: 25 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("ProfileData", {
                            usuario: user,
                            logout: onPress,
                        })
                    }
                >
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                    <Feather name="edit" size={32} color="white" />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <TouchableOpacity
                    onPress={cerrarSesion}
                    style={[
                        styles.button,
                        { backgroundColor: "rgba(132, 132, 132, 0.8)" },
                    ]}
                >
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                    <Feather name="log-out" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        marginTop: 8,
        width: "80%",
        height: 50,
        backgroundColor: "rgba(96, 197, 168, 1)",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginRight: 5,
    },
});

export default ProfileOptions;
