import React from "react";
import { View, Text, TextInput } from "react-native";

const FormInput = ({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType = "off",
    autoCapitalize = "none",
    errorMsg = "",
    maxLength,
    value = "",
    input2Style,
}) => {
    return (
        <View style={{ ...containerStyle }}>
            {/* Label & Error Msg */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ color: "gray", fontSize: 15 }}>{label}</Text>
                <Text style={{ color: "red", fontSize: 15 }}>{errorMsg}</Text>
            </View>

            {/* Text Input */}
            <View
                style={{
                    flexDirection: "row",
                    height: 55,
                    paddingHorizontal: 5,
                    marginTop: 10,
                    borderRadius: 15,
                    backgroundColor: "lightgrey",
                    ...input2Style,
                }}
            >
                {prependComponent}

                <TextInput
                    style={{ flex: 1, ...inputStyle }}
                    placeholder={placeholder}
                    placeholderTextColor={"gray"}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    onChangeText={(text) => onChange(text)}
                    maxLength={maxLength}
                    value={value}
                />

                {appendComponent}
            </View>
        </View>
    );
};

export default FormInput;
