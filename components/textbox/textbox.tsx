import React from 'react';
import { TextInput, StyleProp, TextStyle, ViewStyle, View, KeyboardTypeOptions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { style, defaultStyle } from './style'
import { BtnCallbackFn, DefaultBtnCallback } from '../button';
import {CButton} from '../button/button';


export interface TextBoxProps {
    text: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    withButton?: boolean;
    ButtonCallback?: BtnCallbackFn;
    btnTitle?: string;
}

export interface TextBoxStyle {
    div: StyleProp<ViewStyle>;
    box: StyleProp<TextStyle>;
}

export interface TextBoxInput {
    text: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    style?: TextBoxStyle;
    keyboardType?: KeyboardTypeOptions;
}

export const TextArea = ({
    text,
    onChangeText,
    placeholder = "",
    style = defaultStyle,
    keyboardType = "default"
}: TextBoxInput) => {

    return (
        <View style={style.div}>
            <TextInput
                style={style.box}
                onChangeText={onChangeText}
                value={text}
                placeholder={placeholder}
                multiline={true}
                scrollEnabled={true}
                textAlignVertical='top'
                placeholderTextColor={'#61677A'}
                keyboardAppearance='dark'
                keyboardType={keyboardType}
            />
        </View>

    );
};
