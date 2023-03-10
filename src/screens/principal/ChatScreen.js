import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import FormInput from "../../components/FormInput";
import ChatCard from "../../components/ChatCard";

function ChatScreen({ bgColor, user }) {
    const [buscar, setBuscar] = useState("");

    return (
        <View style={styles.container}>
            {/* Barra Búsqueda */}
            <FormInput
                placeholder={"Búsqueda"}
                value={buscar}
                containerStyle={{
                    width: "90%",
                }}
                inputStyle={{ paddingHorizontal: 5 }}
                onChange={(value) => {
                    setBuscar(value);
                }}
                appendComponent={
                    <View
                        style={{
                            justifyContent: "center",
                            marginRight: 10,
                        }}
                    >
                        <Ionicons
                            name="ios-search-sharp"
                            size={24}
                            color="gray"
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </View>
                }
            />

            {/* Lista de Chats */}
            <ChatCard />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F6F6",
        alignItems: "center",
        // justifyContent: "center",
    },
});

export default ChatScreen;
