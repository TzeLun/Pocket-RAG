import React, {useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import { TextArea } from '../components/textbox';
import { AppContext } from '../state/state';
import { defaultState } from '../state/state';
import { ChatButtonWithIcon } from '../components/button';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { configResetButtonStyle } from '../components/button/style';

export function PromptScreen() {
    const { system_prompt, set_system_prompt } = useContext(AppContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF0E6' }}>
          <ScrollView contentContainerStyle={{ paddingTop: 50, paddingBottom: 50 }}>
            <Text style={{fontSize: 30, textAlign: 'center', color:'#5C5470', fontWeight: 'bold', marginBottom: 30}}>Customize your system prompt:</Text>
            <TextArea 
                text={system_prompt}
                onChangeText={set_system_prompt}
                />
            <Text style={{fontSize: 16, textAlign: 'center', color:'#5C5470', fontWeight: 'bold', marginBottom: 50}}>Prompt length: {Math.floor(system_prompt.split('').length / 4)} tokens</Text>
            <ChatButtonWithIcon
                    icon={<FontAwesome6 name='rotate' size={20} color={'#D8D9DA'} iconStyle="solid" />}
                    title='Reset'
                    style={configResetButtonStyle}
                    showText={true}
                    onPress={() => {
                        set_system_prompt(defaultState.system_prompt);
                    }}
                />
          </ScrollView>
        </View>
    );
}