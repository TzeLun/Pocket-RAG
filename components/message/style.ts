import { MessageBoxStyle } from './message';

export const defaultStyle: MessageBoxStyle = {
    div: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    view: {
        alignItems: 'center',
        padding: 12,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#5C5470',
        width: 300
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Inter'
    }
};

export const assistant: MessageBoxStyle = {
    div: {
        flexDirection: 'row',
        justifyContent: "flex-start"
    },
    view: {
        padding: 12,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#5C5470',
        maxWidth: 240,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'Inter'
    }
};

export const user: MessageBoxStyle = {
    div: {
        flexDirection: 'row',
        justifyContent: "flex-end",
    },
    view: {
        padding: 12,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#678983',
        maxWidth: 240
    },
    text: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: 'Inter'
    }
};

export const successNotification: MessageBoxStyle = {
    div: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    view: {
        alignItems: 'center',
        padding: 12,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#678983',
        width: 300
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Inter'
    }
};

export const failureNotification: MessageBoxStyle = {
    div: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    view: {
        alignItems: 'center',
        padding: 12,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#AE445A',
        width: 300
    },
    text: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Inter'
    }
};