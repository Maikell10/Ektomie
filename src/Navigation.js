import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import RegisterDocScreen from "./screens/RegisterDoc";
import HomeScreen from "./screens/Home";
import Perfil from "./screens/Perfil";

import { TouchableOpacity, Text } from "react-native";
import ProfileOptions from "./screens/Modal/ProfileOptions";
import ProfileData from "./screens/Perfil/ProfileData";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
    // function DrawerNavigator() {
    //     return (
    //         <Drawer.Navigator>
    //             <Drawer.Screen
    //                 name="HomeDrawer"
    //                 component={HomeScreen}
    //                 options={{ headerShown: false, title: "Inicio" }}
    //             />
    //             <Drawer.Screen
    //                 name="Perfil"
    //                 component={Perfil}
    //                 options={{ headerShown: false }}
    //             />
    //         </Drawer.Navigator>
    //     );
    // }
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterDoc"
                component={RegisterDocScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            {/* Perfil */}
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="ProfileData"
                component={ProfileData}
                options={{ headerShown: true }}
            /> */}
            <Stack.Screen
                name="ProfileOptions"
                component={ProfileOptions}
                options={{
                    headerShown: false,
                    presentation: "modal",
                    contentStyle: {
                        marginTop: 50,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    },
                }}
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
