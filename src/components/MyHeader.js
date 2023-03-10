import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Badge, Surface, Text, Title } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const IconSize = 24;

const logoEk = require("../../assets/icons/logo-ek.jpg");

const AppHeader = ({
    style,
    menu,
    onPressMenu,
    back,
    onPressBack,
    title,
    right,
    rightComponent,
    onRightPress,
    optionalBtn,
    optionalBtnPress,
    headerBg = "transparent",
    iconColor = "black",
    titleAlight,
    optionalBadge,
}) => {
    const LeftView = () => (
        <View style={styles.view}>
            {menu && (
                <TouchableOpacity onPress={onPressMenu}>
                    <Ionicons
                        name="chevron-back"
                        size={IconSize}
                        color={iconColor}
                    />
                </TouchableOpacity>
            )}
            {back && (
                <TouchableOpacity onPress={onPressBack}>
                    <Feather
                        name="arrow-left"
                        size={IconSize}
                        color={iconColor}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
    const RightView = () =>
        rightComponent ? (
            rightComponent
        ) : (
            <View style={[styles.view, styles.rightView]}>
                {optionalBtn && (
                    <TouchableOpacity
                        style={styles.rowView}
                        onPress={optionalBtnPress}
                    >
                        <Feather
                            name={optionalBtn}
                            size={IconSize}
                            color={iconColor}
                        />
                        {optionalBadge && (
                            <Badge
                                style={{
                                    position: "absolute",
                                    top: -5,
                                    right: -10,
                                }}
                            >
                                {optionalBadge}
                            </Badge>
                        )}
                    </TouchableOpacity>
                )}
                {right !== "" && (
                    <TouchableOpacity onPress={onRightPress}>
                        <Feather
                            name={right}
                            size={IconSize}
                            color={iconColor}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );

    if (title === "Inicio") {
        title = "Ektomie";
    }
    const TitleView = () => (
        <View style={styles.titleView}>
            <Image source={logoEk} style={styles.profilePicture} />
            <Title style={{ color: iconColor, textAlign: titleAlight }}>
                {title}
            </Title>
        </View>
    );
    return (
        <Surface style={[styles.header, style, { backgroundColor: headerBg }]}>
            <LeftView />
            <TitleView />
            <RightView />
        </Surface>
    );
};

export default AppHeader;

const styles = StyleSheet.create({
    header: {
        height: 50,
        elevation: 4,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    view: {
        marginHorizontal: 16,
        alignItems: "center",
        flexDirection: "row",
    },
    titleView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    rightView: {
        justifyContent: "flex-end",
    },
    rowView: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 10,
    },
});
