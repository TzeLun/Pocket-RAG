import React, {useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import { Dropdown } from '../components/dropdown/dropdown';
import { CButton } from '../components/button';
import { successNotification, failureNotification } from '../components/message/style';
import MessageBox from '../components/message/message';
import axios from "axios"
import { AppContext } from '../state/state';

export function DatabaseScreen() {
    const {endpoint, setEndpoint} = useContext(AppContext);
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState([
        {label: 'Mini Wikipedia', value: 'http://103.78.34.48:4956/rag'},
        {label: 'Dummy', value: 'dummy endpoint'}
    ]);
    const [ status, setStatus] = React.useState<boolean | null>(null);
    const [ errorMsg, setErrorMsg ] = React.useState('')
    async function validateEndpoint() {
        try {
          const response = await axios.post(`${endpoint}`, {
            "question": 'No question',
            "top_k": 1,
            "top_n": 1
          });
          console.log(`Successful access to: ${endpoint}`);
          setStatus(true);
        } catch (error) {
          console.log(`Error accessing to: ${endpoint}`, error);
          setStatus(false);
          setErrorMsg(`[Error connecting to RAG server] ==> ${error}`);
        }
      };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF0E6' }}>
          <ScrollView contentContainerStyle={{ paddingTop: 100 }}>
          {/* <ScrollView> */}
          <Text style={{fontSize: 24, textAlign: 'center', color:'#5C5470', fontWeight: 'bold'}}>Select your RAG database:</Text>
          <Dropdown
                  open={open}
                  value={endpoint}
                  items={items}
                  setOpen={setOpen}
                  setValue={setEndpoint}
                  setItems={setItems}
              />
          <CButton
              title='Verify'
              onPress={() => {
                  validateEndpoint();
              }}
          />
          {status != null && status == true && <MessageBox text={"Connection successful!"} style={successNotification} />}
          {status != null && status == false && <MessageBox text={errorMsg} style={failureNotification} />}
          </ScrollView>
        </View>
    );
}