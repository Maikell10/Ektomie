import React from "react";
import { View, Platform } from "react-native";

import MyHeader from "../../../components/MyHeader";

const FirstScreen = () => {
    return (
        <View
            style={[
                Platform.OS !== "android" ? { marginTop: 40 } : "",
                { flex: 1 },
            ]}
        >
            <MyHeader
                menu
                onPressMenu={() => navigation.navigate("Inicio")}
                title={"Detalle"}
            />
        </View>
    );
};

export default FirstScreen;
