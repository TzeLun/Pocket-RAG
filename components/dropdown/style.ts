import { DropdownStyle } from "./dropdown";

export const defaultDropdownStyle: DropdownStyle = {
    div: {
        flexDirection: 'row',
        margin: 20,
    },
    divChild: {
        justifyContent: 'center'
    },
    dropdownContainerClose: {
        backgroundColor: '#D8D9DA',
        height: 60,
        width: 280,
        borderRadius: 20,
        borderColor: '#5C5470',
        borderWidth: 2,
    },
    dropdownContainerOpen: {
        backgroundColor: '#D8D9DA',
        padding: 10,
        width: 280,
        borderRadius: 20,
        borderColor: '#5C5470',
        borderWidth: 2,
    },
    dropdownOpenText: {
        color: '#61677A',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: "bold"
    },
    dropdownCloseText: {
        color: '#61677A',
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: "bold"
    }
};