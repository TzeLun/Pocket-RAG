import React from 'react';
import { Text, Pressable, Switch, StyleProp, ViewStyle, TextStyle, View, Image } from 'react-native';
import { style, ToggleSwitchStyle, SliderBarStyle, defaultButtonStyle } from './style';
import Slider from '@react-native-community/slider';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';


export interface BtnCallbackFn {
    (): JSX.Element | void | Promise<void> | Promise<JSX.Element>;
}

export function DefaultBtnCallback() {
    console.log("Button Pressed!");
}

export interface CButtonStyle {
    div: StyleProp<ViewStyle>;
    btn: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
}

export interface CButtonProp {
    onPress: () => JSX.Element | void;
    title?: string;
    style?: [CButtonStyle, CButtonStyle];
}

export interface CButtonWithIconProp {
    onPress: () => JSX.Element | void;
    icon: JSX.Element;
    title?: string;
    style?: [CButtonStyle, CButtonStyle];
    showText?: boolean;
}

export interface switchStyle {
    div: StyleProp<ViewStyle>;
    switch: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
}

export interface ToggleSwitchProp {
    setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    isEnabled: boolean;
    style?: switchStyle;
}

export interface sliderStyle {
    div: StyleProp<ViewStyle>;
    slider: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
}

export interface SliderBarProp {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    minimumValue: number;
    maximumValue: number;
    step: number;
    style?: sliderStyle;
    handleFloat?: boolean;
}

export const CButton = ({onPress, title='Submit', style=defaultButtonStyle}: CButtonProp) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const sstyle = isPressed ? style[0] : style[1];

    return (
        <View style={sstyle.div}>
        <Pressable 
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={sstyle.btn}
            onPress={onPress}
        >
        <Text style={sstyle.text}>{title}</Text>
        </Pressable>
        </View>
    );
};

export const ChatButtonWithIcon = ({icon, onPress, title='Submit', showText=false, style=defaultButtonStyle}: CButtonWithIconProp) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const [iconAvailability, setIconAvailability] = React.useState(true);
    const sstyle = isPressed ? style[0] : style[1];

    const renderIcon = () => {
        try {
            // return <FontAwesome6 name='paper-plane' color={"#D9D9D9"} size={30} iconStyle="solid"/>;
            // return <Icon path={'send-variant'} color={"#D9D9D9"} size={30}/>;

            return (
                icon
            );
        } catch (error) {
            console.log(`Error rendering icon: `, error);
            setIconAvailability(false);
            return <Text style={sstyle.text}>{title}</Text>
        }
    }

    return (
        <View style={sstyle.div}>
        <Pressable 
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={sstyle.btn}
            onPress={onPress}
        >
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {renderIcon()}
        {iconAvailability && showText && <Text style={sstyle.text}>{title}</Text>}
        </View>
        </Pressable>
        </View>
    );
};

export const ToggleSwitch = ({isEnabled, setIsEnabled, style=ToggleSwitchStyle}: ToggleSwitchProp) => {
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={style.div}>
        <Switch
            trackColor={{false: '#BB8493', true: '#BB8493'}}
            thumbColor={isEnabled ? '#704264' : '#704264'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={style.switch}
        />
        <Text style={style.text}>{isEnabled ? 1 : 0}</Text>
    </View>
  );
}

export const SliderBar = ({
    value,
    setValue,
    minimumValue,
    maximumValue,
    step,
    style = SliderBarStyle,
    handleFloat = true
}: SliderBarProp) => {

    const [displayValue, setDisplayValue] = React.useState(value);
    // const maxIntVal = (maximumValue - minimumValue) / step;

    // const to_slider_value = (actual_value: number): number => {
    //     return parseInt((actual_value * maxIntVal).toFixed(0));
    //     // return (actual_value * maxIntVal);
    // }

    // const to_actual_value = (slider_value: number): number => {
    //     return parseFloat((slider_value / maxIntVal * (maximumValue - minimumValue)).toFixed(2));
    // }

    if (handleFloat) {
        return (
            // <View style={style.div}>
            //     <Slider
            //         style={style.slider}
            //         minimumValue={0}
            //         maximumValue={maxIntVal}
            //         step={1} // Adjust slider steps
            //         value={to_slider_value(value)} // Initial value
            //         onValueChange={(val) => setValue(to_actual_value(val))} // Update state on slide
            //         minimumTrackTintColor="#BB8493" // Color for the filled track
            //         maximumTrackTintColor="#B9B4C7" // Color for the unfilled track
            //         thumbTintColor="#704264" // Thumb (circle) color
            //     />
            //     <Text style={style.text}>{value}</Text>
            // </View>
            <View style={style.div}>
                <Slider
                    style={style.slider}
                    minimumValue={minimumValue}
                    maximumValue={maximumValue}
                    step={step} // Adjust slider steps
                    value={value} // Initial value
                    onSlidingComplete={(val) => {setValue(parseFloat(val.toFixed(2)))}} // Update state on slide
                    onValueChange={(val) => {setDisplayValue(parseFloat(val.toFixed(2)))}}
                    minimumTrackTintColor="#BB8493" // Color for the filled track
                    maximumTrackTintColor="#B9B4C7" // Color for the unfilled track
                    thumbTintColor="#704264" // Thumb (circle) color
                />
                <Text style={style.text}>{displayValue}</Text>
            </View>
        );
    } else {
        return (
            <View style={style.div}>
                <Slider
                    style={style.slider}
                    minimumValue={minimumValue}
                    maximumValue={maximumValue}
                    step={step} // Adjust slider steps
                    value={value} // Initial value
                    onSlidingComplete={setValue}
                    onValueChange={setDisplayValue} // Update state on slide
                    minimumTrackTintColor="#BB8493" // Color for the filled track
                    maximumTrackTintColor="#B9B4C7" // Color for the unfilled track
                    thumbTintColor="#704264" // Thumb (circle) color
                />
                <Text style={style.text}>{displayValue}</Text>
            </View>
        );
    }

};


