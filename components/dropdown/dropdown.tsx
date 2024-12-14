import DropDownPicker from 'react-native-dropdown-picker';
import {View, StyleProp, ViewStyle, TextStyle} from 'react-native';
import { defaultDropdownStyle } from './style';
DropDownPicker.setListMode("SCROLLVIEW");

export interface DropdownStyle {
    div: StyleProp<ViewStyle>;
    divChild: StyleProp<ViewStyle>;
    dropdownContainerClose: StyleProp<ViewStyle>;
    dropdownContainerOpen: StyleProp<ViewStyle>;
    dropdownOpenText: StyleProp<TextStyle>;
    dropdownCloseText: StyleProp<TextStyle>;
}

export type setItemsType = {
    label: string;
    value: string;
    [key: string]: any;
}

export interface DropdownProp {
    open: boolean;
    value: string | null;
    items: object[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setValue: React.Dispatch<React.SetStateAction<string | null>>;
    setItems: React.Dispatch<React.SetStateAction<setItemsType[]>>;
    style?: DropdownStyle;
}

export const Dropdown = ({
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    style = defaultDropdownStyle
}: DropdownProp) => {
    return (
        <View style={style.div}>
            <View style={style.divChild}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={style.dropdownContainerClose}
                dropDownContainerStyle={style.dropdownContainerOpen}
                listItemLabelStyle={style.dropdownOpenText}
                textStyle={style.dropdownCloseText}
                placeholder='Select RAG server ...'
                dropDownDirection="BOTTOM"
            />
        </View>
        </View>
    );
};