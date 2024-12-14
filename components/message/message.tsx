import React from 'react';
import { Text, View, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { defaultStyle } from './style'


export interface MessageBoxStyle {
    div?: StyleProp<ViewStyle>;
    view?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
}

interface MessageBoxInput {
    text: string;
    style?: MessageBoxStyle;
}

export interface MessageType {
    role: string;
    content: string;
}

// style uses style.view and style.text
const MessageBox = ({text, style = defaultStyle}: MessageBoxInput) => {

    return (
        <View style={style.div}>
            <View style={style.view}>
                <Text style={style.text}>{text}</Text>
            </View>
        </View>
    );
}

export default MessageBox;