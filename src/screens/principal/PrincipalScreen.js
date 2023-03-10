import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../context/redux";

import PathologyCard from "../../components/PathologyCard";
import FormInput from "../../components/FormInput";

import { constants } from "../../constants";

function PrincipalScreen({ bgColor, user, navigation }) {
    const [buscar, setBuscar] = useState("");

    const [pathologies, setPathologies] = useState([]);

    useEffect(() => {
        getPathologies();
    }, []);

    const getPathologies = async () => {
        const colRef = collection(db, "pathology_ek");
        const result = await getDocs(colRef);

        let pathologies = [];
        result.forEach((doc, index) => {
            pathologies[index] = { id: doc.id, ...doc.data() };
        });

        setPathologies(pathologies);
    };

    function renderSearch() {
        return (
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
        );
    }

    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "First Item",
        },
        {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "Second Item",
        },
        {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: "Third Item",
        },
    ];

    function renderEspecialidades() {
        return (
            <View
                style={{
                    height: 75,
                }}
            >
                <FlatList
                    data={constants.especialidades}
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    contentContainerStyle={{
                        marginBottom: 5,
                    }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                height: 55,
                                marginTop: 10,
                                marginLeft: 20,
                                marginRight:
                                    index == constants.especialidades.length - 1
                                        ? 20
                                        : 0,
                                paddingHorizontal: 8,
                                borderRadius: 15,
                                backgroundColor: "#16D8EB",
                                // backgroundColor:
                                //     selectedCategoryId == item.id
                                //         ? COLORS.primary
                                //         : COLORS.lightGray2,
                            }}
                            // onPress={() => {
                            //     setSelectedCategoryId(item.id);
                            //     handleChangeCategory(item.id, selectedMenuType);
                            // }}
                        >
                            <Image
                                source={item.icon}
                                style={{ marginTop: 5, height: 40, width: 40 }}
                            />

                            <Text
                                style={{
                                    alignSelf: "center",
                                    marginRight: 5,
                                    // color:
                                    //     selectedCategoryId == item.id
                                    //         ? "white"
                                    //         : COLORS.darkGray,
                                    fontSize: 15,
                                    fontWeight: "500",
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }

    function renderPathology(item) {
        return (
            <PathologyCard
                containerStyle={{
                    height: 120,
                    width: 350,
                    marginLeft: 10,
                    marginRight: 10,
                    alignItems: "center",
                    marginBottom: 10,
                }}
                imageStyle={{
                    height: 90,
                    width: 90,
                    marginLeft: 10,
                    borderRadius: 10,
                }}
                item={item}
                onPress={() => console.log("PathologyCard")}
            />
        );
    }

    return (
        <View style={styles.container}>
            {/* Barra Búsqueda */}
            {renderSearch()}

            {/* Lista de Especialidades */}
            {renderEspecialidades()}

            {/* Lista de Patologias */}
            <FlatList
                data={pathologies}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Inicio")}
                    >
                        {renderPathology(item)}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F6F6",
        alignItems: "center",
        //justifyContent: "center",
    },
});

export default PrincipalScreen;
