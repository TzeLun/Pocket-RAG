import axios from "axios"
import {TextArea} from "../components/textbox/textbox";
import React, {useContext, useRef} from "react";
import { invoke } from "../components/model/llama-rn";
import { Text, View, ScrollView, Image } from "react-native";
import { chatAreaStyle } from "../components/textbox/style";
import { ChatButtonWithIcon } from "../components/button";
import { AppContext } from "../state/state";
import { chatButtonStyle, resetButtonStyle } from "../components/button/style";
import { MessageType } from "../components/message";
import MessageBox from "../components/message/message";
import { user, assistant } from "../components/message/style";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';


export function ChatScreen() {
    const scrollViewRef = useRef<ScrollView>(null);
    const [waitFlag, setWaitFlag] = React.useState(false);
    const [text, onChangeText] = React.useState('');
    const [message, setMessage] = React.useState<MessageType[]>([
        {
            role: "assistant",
            content: "Hello, how may I assist you?"
        },
    ]);
    const [speedEval, setSpeedEval] = React.useState('');
        
    const {
        endpoint,
        rag_top_k,
        rag_top_n,
        model,
        stop,
        n_predict,
        n_probs,
        top_k,
        top_p,
        min_p,
        xtc_probability,
        xtc_threshold,
        typical_p,
        temperature,
        penalty_last_n,
        penalty_repeat,
        penalty_freq,
        penalty_present,
        penalize_nl,
        microstat,
        microstat_tau,
        microstat_eta,
        seed,
        system_prompt,
        } = useContext(AppContext);

    React.useEffect(() => {
        // Scroll to the bottom when messages change
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, [message]);

    // console.log("Llama model established.");
    if (!model) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF0E6' }}>
                <Text
                    style={{
                        fontSize: 28,
                        color: "#61677A",
                        fontWeight: 'bold',
                        paddingTop: 50,
                        marginLeft: 10,
                        marginRight: 10,
                        textAlign: 'center'
                      }}>Awaiting for a model...</Text>
            </View>
        );
    }

    const completionParams = {
        "model": model,
        "stop": stop,
        "n_predict": n_predict,
        "n_probs": n_probs,
        "top_k": top_k,
        "top_p": top_p,
        "min_p": min_p,
        "xtc_probability": xtc_probability,
        "xtc_threshold": xtc_threshold,
        "typical_p": typical_p,
        "temperature": temperature,
        "penalty_last_n": penalty_last_n,
        "penalty_repeat": penalty_repeat,
        "penalty_freq": penalty_freq,
        "penalty_present": penalty_present,
        "penalize_nl": penalize_nl,
        "microstat": microstat,
        "microstat_tau": microstat_tau,
        "microstat_eta": microstat_eta,
        "seed": seed,
        "messages": [
            {
                role: "system",
                content: system_prompt
            },
        ]
    }

    async function ragInference() {
        if (endpoint != null) {
            try {
                setSpeedEval('');
                setMessage((prevMsg) => [
                    ...prevMsg,
                    { role: "user", content: text}
                ]);
                onChangeText('');
                const response = await axios.post(`${endpoint}`, {
                    "question": text,
                    "top_k": rag_top_k,
                    "top_n": rag_top_n
                });
                const user_prompt = `Question: ${text}\n\n\nContext: ${response.data['context']}`;
                console.log(`Retrieved context:\n\n${response.data['context']}`)
                if (!completionParams.messages) { 
                    completionParams.messages = [
                    {
                        role: "system",
                        content: system_prompt
                    },
                    ]
                }
                
                completionParams.messages.push(
                    {
                    role: "user",
                    content: user_prompt
                    }
                )

                const streamCallback = (data: any) => {
                        setTimeout(() => {
                            setMessage((prevMsg) => {
                                const lastMessage = prevMsg[prevMsg.length - 1];
                                // console.log(data.token);
                                if (lastMessage?.role === 'assistant') {
                                    return [
                                        ...prevMsg.slice(0, -1),
                                        { ...lastMessage, content: lastMessage.content + data.token },
                                    ];
                                }

                                return [...prevMsg, {role: 'assistant', content: data.token}];
                                
                            });
                        }, 0);
                };

                const slm_response = await invoke(completionParams, streamCallback);

                console.log(`SLM Response: ${slm_response.text}\n`);
                console.log(`
                    Input prompt tokens: ${slm_response.timings.prompt_n} tokens\n
                    Prompt eval time: ${slm_response.timings.prompt_ms / 1000}s\n
                    Prompt eval rate: ${slm_response.timings.prompt_per_second} token/s\n
                    Output tokens: ${slm_response.timings.predicted_n} tokens\n
                    Prediction time: ${slm_response.timings.predicted_ms / 1000}s\n
                    Token generation: ${slm_response.timings.predicted_per_second} token/s
                `);
                setSpeedEval(`Prompt: ${slm_response.timings.prompt_n} tokens, Prediction: ${slm_response.timings.predicted_n} tokens.\nPrompt rate: ${slm_response.timings.prompt_per_second.toFixed(2)} token/s, Prediction rate: ${slm_response.timings.predicted_per_second.toFixed(2)} token/s`);
                setWaitFlag(false);
            } catch (error) {
                console.log(`Error fetching context from ${endpoint}`);
                //   throw error; // Re-throw the error for the caller to handle
                setMessage((prevMsg) => [
                    ...prevMsg,
                    { role: "assistant", content: `It seems there is an error during inference. Error Message: ${error}`}
                ]);
                setWaitFlag(false);
            }
        } else {
            setMessage((prevMsg) => [
                ...prevMsg,
                { role: "user", content: text}
            ]);
            onChangeText('');
            setMessage((prevMsg) => [
                ...prevMsg,
                { role: "assistant", content: `There is an error during inference. It seems your RAG API endpoint is still undefined.`}
            ]);
            setWaitFlag(false);
        }
      };

    
    return (
        <View style={{ paddingTop: 60, flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#FAF0E6' }}>
            <View style={{
                // backgroundColor: "white",
                height: 50, padding: 0, margin: 0,
                width: "100%", justifyContent: "center",
                alignItems: "flex-end"}}>
                <ChatButtonWithIcon
                    icon={<FontAwesome6 name='pen-to-square' size={30} color={'#61677A'} iconStyle="solid" />}
                    title={"Reset"}
                    style={resetButtonStyle}
                    onPress={
                        () => {
                            setMessage(
                                [
                                    {
                                        role: "assistant",
                                        content: "Hello, how may I assist you?"
                                    },
                                ]
                            );
                            setSpeedEval('');
                        }}/>
            </View>
            <View style={{ 
                width: "100%", maxWidth: 400,
                marginBottom: 20, height: "85%",
                marginTop: 20, justifyContent: 'flex-end'}}>
                <ScrollView
                    ref={scrollViewRef}
                >
                {message.map((msg, index) => (
                    <MessageBox key={index} text={msg.content}
                        style={
                            msg.role === "user" ? user : assistant
                        }
                    />

                ))}
                <Text style={{ fontSize: 10, textAlign: "left", color: "#61677A", marginBottom: 10, marginLeft: 10}}>{speedEval}</Text>
                </ScrollView>
            </View>
            <View style={{ 
                flexDirection: "row",
                alignItems: 'center',
                width: "100%",
                // height: "10%",
                // minHeight: 50,
                justifyContent: 'center',
                backgroundColor: '#61677A',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10}}>
                <TextArea
                    text={text}
                    onChangeText={onChangeText}
                    placeholder="Ask me something ... "
                    style={chatAreaStyle}
                    keyboardType="default" />
                <ChatButtonWithIcon
                    icon={<Image 
                        source={require('../components/button/send-variant.png')} 
                        style={[ { width: 40, height: 40, tintColor: '#D9D9D9' }]} 
                        />}
                    title={"Send"}
                    style={chatButtonStyle}
                    onPress={
                        () => { if (!waitFlag && text != '') {
                            setWaitFlag(true);
                            ragInference();};}
                    }
                />
            </View>
        </View>
    );
}