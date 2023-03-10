import React, { useState, useEffect } from "react";
import { View, Text, Platform, TextInput } from "react-native";
import FormInput from "../../components/FormInput";

import MyHeader from "../../components/MyHeader";

const ProfileData = ({ navigation }) => {
    console.log(navigation.getState());
    const user = navigation.getState().routes[5].params.usuario;
    const onPress = navigation.getState().routes[5].params.logout;

    const [nameUser, setNameUser] = useState("");
    const [especialidad, setEspecialidad] = useState("");

    useEffect(() => {
        setNameUser(user.nameUser);
    }, []);

    return (
        <View
            style={[
                Platform.OS !== "android" ? { marginTop: 40 } : "",
                { flex: 1 },
            ]}
        >
            <MyHeader
                menu
                onPressMenu={() => navigation.navigate("Perfil")}
                title={"Datos de Perfil"}
                right="more-vertical"
                onRightPress={() =>
                    navigation.navigate("ProfileOptions", {
                        usuario: user,
                        logout: onPress,
                    })
                }
            />

            <View style={{ alignItems: "center" }}>
                <FormInput
                    label={"Nombre Completo"}
                    value={nameUser}
                    containerStyle={{
                        marginTop: 25,
                        width: "80%",
                    }}
                    onChange={(value) => {
                        setNameUser(value);
                    }}
                />

                {user.medico && (
                    <FormInput
                        label={"Especialidad"}
                        value={especialidad}
                        containerStyle={{
                            marginTop: 25,
                            width: "80%",
                        }}
                        onChange={(value) => {
                            setEspecialidad(value);
                        }}
                    />
                )}
            </View>
        </View>
    );
};

export default ProfileData;
