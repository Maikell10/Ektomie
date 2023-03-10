import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import ActivityIndicator from "../components/ActivityIndicator";

import "expo-dev-client";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithCredential,
} from "firebase/auth";
import {
    collection,
    addDoc,
    Timestamp,
    getDocs,
    query,
} from "firebase/firestore/lite";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

const logoEk = require("../../assets/icons/logo-ek.jpg");
const logoGoogle = require("../../assets/icons/icons8-logo-de-google-96.png");
const uri =
    "https://clinicadrrull.com/wp-content/uploads/2021/02/Ozono-terapia.jpg";

import { store, setUser, auth, resetPassword, db } from "../context/redux";

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.manifest.extra.authGoogle.androidClientId,
        iosClientId: Constants.manifest.extra.authGoogle.iosClientId,
        expoClientId: Constants.manifest.extra.authGoogle.expoClientId,
    });
    const [authGoogle, setAuthGoogle] = useState();
    const [userInfo, setUserInfo] = useState();

    const handleSignIn = () => {
        if (email === null || email === undefined || email === "") {
            Alert.alert("Coloque un email");
            return;
        }
        if (password === null || password === undefined || password === "") {
            Alert.alert("Coloque su contraseña");
            return;
        }
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (data) => {
                const user = data.user;

                await AsyncStorage.setItem(
                    "auth",
                    JSON.stringify(user.providerData[0])
                );

                //TODO
                user.providerData[0].cliente = false;
                user.providerData[0].medico = true;
                user.providerData[0].completado = false;
                user.providerData[0].nameUser = "Usuario Ektomie";
                store.dispatch(setUser(user.providerData[0]));
                setLoading(false);
                navigation.replace("Home");
            })
            .catch((e) => {
                setLoading(false);
                if (e.message === "Firebase: Error (auth/wrong-password).") {
                    Alert.alert("Contraseña incorrecta");
                } else if (
                    e.message === "Firebase: Error (auth/user-not-found)."
                ) {
                    Alert.alert("El email no se encuentra registrado");
                } else if (
                    e.message ===
                    "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
                ) {
                    Alert.alert(
                        "Cuenta bloqueada por intentos fallidos, póngase en contacto con soporte."
                    );
                } else {
                    console.log(e);
                    //Alert.alert(e.message);
                    Alert.alert("Intente de nuevo por favor");
                }
            });
    };

    useEffect(() => {
        setLoading(true);
        if (response?.type === "success") {
            setAuthGoogle(response.authentication);
            getUserData(response.authentication);

            const persistAuth = async () => {
                await AsyncStorage.setItem(
                    "auth",
                    JSON.stringify(response.authentication)
                );
            };
            persistAuth();
        } else {
            setLoading(false);
        }
    }, [response]);

    useEffect(() => {
        setLoading(true);
        const getPersistedAuth = async () => {
            setLoading(false);
            const jsonValue = await AsyncStorage.getItem("auth");
            if (jsonValue != null) {
                const authFromJson = JSON.parse(jsonValue);
                setAuthGoogle(authFromJson);
                //console.log(authFromJson);

                navigation.replace("Home");
            }

            console.log(store.getState());
            if (store.getState().user != null) {
                if (store.getState().user.payload != null) {
                    navigation.replace("Home");
                }
            }
        };
        getPersistedAuth();
    }, []);

    const getUserData = async (resp) => {
        let userInfoResponse = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers: { Authorization: `Bearer ${resp.accessToken}` },
            }
        );

        const googleProvider = new GoogleAuthProvider();

        var credential = GoogleAuthProvider.credential(
            auth.apiKey,
            resp.accessToken
        );
        signInWithCredential(auth, credential).then(async (data) => {
            let size = 0;
            let userFirebase = null;
            const colRef = collection(db, "usuarios");
            const result = await getDocs(query(colRef));
            result.forEach((doc) => {
                if (doc.data().id === data.user.uid) {
                    size = 1;
                    userFirebase = doc.data();
                }
            });

            const crearUsuario = async () => {
                if (size === 0) {
                    try {
                        userFirebase = {
                            id: data.user.uid,
                            nameUser: data.user.displayName,
                            email: data.user.email,
                            cliente: true,
                            completado: false,
                            picture: data.user.photoURL,
                            created: Timestamp.now(),
                        };
                        await addDoc(collection(db, "usuarios"), userFirebase);
                    } catch (err) {
                        console.log(err);
                        setLoading(false);
                        Alert.alert(err);
                        return;
                    }
                }

                userInfoResponse.json().then((data) => {
                    data.cliente = userFirebase.cliente;
                    data.medico = userFirebase.medico;
                    data.completado = userFirebase.completado;
                    data.fotoPerfil = userFirebase.picture;
                    data.nameUser = userFirebase.nameUser;
                    setUserInfo(data);

                    store.dispatch(setUser(data));
                    setLoading(false);
                    navigation.replace("Home");
                });
            };

            await crearUsuario();
        });
    };

    const handleGoogleSignin = async () => {
        setLoading(true);
        await promptAsync({ useProxy: true, showInRecents: true });
    };

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert("Escribe un email para reestablecer tu contraseña");
            return;
        }
        try {
            await resetPassword(email);
            Alert.alert("Te enviamos un email. Revisa tu inbox");
        } catch (error) {
            if (error.message === "Firebase: Error (auth/user-not-found).") {
                Alert.alert("No se encuentra registrado en Ektomie");
            } else {
                Alert.alert(error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* <Image
                source={{ uri }}
                style={[styles.image, StyleSheet.absoluteFill]}
            /> */}
            {/* <View
                style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "green",
                    position: "absolute",
                    borderRadius: 25,
                    transform: [{ rotate: "50deg" }],
                }}
            ></View>
            <View
                style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "#00ddff",
                    position: "absolute",
                    borderRadius: 25,
                    bottom: 140,
                    transform: [{ rotate: "50deg" }],
                }}
            ></View> */}

            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <BlurView intensity={90} tint="light">
                    <View style={styles.login}>
                        <Image source={logoEk} style={styles.profilePicture} />

                        {loading ? (
                            <ActivityIndicator />
                        ) : (
                            <>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: "400",
                                            color: "green",
                                            marginLeft: 5,
                                        }}
                                    >
                                        Email
                                    </Text>
                                    <TextInput
                                        onChangeText={(text) => setEmail(text)}
                                        value={email}
                                        keyboardType={"email-address"}
                                        style={styles.input}
                                        placeholder="ektomie@correo.com"
                                    />
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: "400",
                                            color: "green",
                                            marginLeft: 5,
                                        }}
                                    >
                                        Contraseña
                                    </Text>
                                    <TextInput
                                        onChangeText={(text) =>
                                            setPassword(text)
                                        }
                                        value={password}
                                        style={styles.input}
                                        placeholder="contraseña"
                                        secureTextEntry={true}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleSignIn()}
                                    style={styles.button}
                                >
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            fontWeight: "700",
                                            color: "white",
                                        }}
                                    >
                                        Inicia Sesión
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleGoogleSignin()}
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: "#ffffff",
                                            borderColor: "green",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "row",
                                            marginVertical: 10,
                                        },
                                    ]}
                                >
                                    <Image
                                        source={logoGoogle}
                                        style={styles.logoGoogle}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            fontWeight: "400",
                                            color: "gray",
                                            marginLeft: 7,
                                        }}
                                    >
                                        Inicia con Google
                                    </Text>
                                </TouchableOpacity>

                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text>¿No tienes cuenta aún?</Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("Register")
                                        }
                                        style={styles.buttonRegister}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 17,
                                                fontWeight: "400",
                                                color: "#4287ff",
                                            }}
                                        >
                                            Registrate
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={() => handleResetPassword()}
                                >
                                    <Text>Olvidaste tu contraseña?</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </BlurView>
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    login: {
        width: 350,
        height: 500,
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
        alignItems: "center",
        padding: 10,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: 1,
        marginVertical: 10,
    },
    logoGoogle: { width: 35, height: 35 },
    input: {
        width: 250,
        height: 40,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#ffffff90",
        marginBottom: 10,
    },
    button: {
        width: 250,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#37fa5a",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        borderColor: "white",
        borderWidth: 1,
    },
    buttonRegister: {
        marginLeft: 10,
    },
});
