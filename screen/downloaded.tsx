import React, {useContext} from "react";
import RNFS from 'react-native-fs';
import {View, ScrollView, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { ChatButtonWithIcon } from "../components/button";
import { linkButtonStyle } from "../components/button/style";
import { hfModelFileProp, FS_FILEPATH, getDownloadedModels } from "../components/model/hfmodel";
import { AppContext } from "../state/state";
import { initializeLlama } from "../components/model/llama-rn";

interface modelOptionStyleProp {
    main_div: StyleProp<ViewStyle>;
    header: StyleProp<TextStyle>;
    sec_div: StyleProp<ViewStyle>;
    icon_div: StyleProp<ViewStyle>;
    labels: StyleProp<TextStyle>;
}

const modelOptionStyle: modelOptionStyleProp = {
    main_div: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: "#E8BCB9",
        width: 300, marginBottom: 20, borderRadius: 20,
        padding: 20
    },
    header: {color: '#704264', fontSize: 16, fontWeight: 'bold'},
    sec_div: {flexDirection: 'row', width: "100%", justifyContent: "center"},
    icon_div: {flexDirection: 'row', alignItems: 'center', height: 30, marginTop: 10, marginLeft: 20, marginRight: 20},
    labels: {marginLeft: 10, color: '#61677A', fontSize: 14, fontWeight: 'bold'}
}

interface HFModelOptionBlocksProp {
    modelFile: hfModelFileProp;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const HFModelOptionBlocks = ({modelFile, selected, setSelected}: HFModelOptionBlocksProp) => {
    const {
        set_model,
        n_ctx,
        n_gpu_layers,
        flash_attn,
        setFSChange
    } = useContext(AppContext);

    const [isLoading, setIsLoading] = React.useState(false);

    async function loadModel() {
        try {
            const llama_context = await initializeLlama({
                model: `file://${FS_FILEPATH}/${modelFile.filename}`,
                use_mlock: true,
                n_ctx: n_ctx,
                n_gpu_layers: n_gpu_layers,
                flash_attn: flash_attn
            });

            set_model(llama_context);
            setSelected(modelFile.filename);
            
        } catch (err) {
            console.error("Error initializing model:", err);
            set_model(null);
            setSelected('');
        }
        setIsLoading(false);
    };

    function offloadModel() {
        set_model(null);
        setSelected('');
    }

    async function removeFile() {
        try {
            await RNFS.unlink(`${FS_FILEPATH}/${modelFile.filename}`);
        } catch (error) {
            console.error('Error removing file:', error);
        }
        setFSChange(true);
    }


    // render download icon if not exist, and trash icon otherwise
    // Icons will not render during a download
    function renderButtons() {
        // if is the chosen model
        if (modelFile.filename === selected) {
            return (
                <View style={modelOptionStyle.icon_div}>
                    <ChatButtonWithIcon
                    icon={<FontAwesome6 name='ban' size={20} color={'#AE445A'} iconStyle="solid" />}
                    title='Offload'
                    style={linkButtonStyle}
                    showText={false}
                    onPress={() => {
                        offloadModel();
                    }}
                    />
                </View>
            );
        } else {
            if (!isLoading) {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <View style={modelOptionStyle.icon_div}>
                            <ChatButtonWithIcon
                            icon={<FontAwesome6 name='trash-can' size={20} color={'#AE445A'} iconStyle="solid" />}
                            title='Delete'
                            style={linkButtonStyle}
                            showText={false}
                            onPress={() => {
                                removeFile();
                            }}
                            />
                        </View>
                        <View style={modelOptionStyle.icon_div}>
                            <ChatButtonWithIcon
                                icon={<FontAwesome6 name='arrow-up-from-bracket' size={20} color={'#678983'} iconStyle="solid" />}
                                title='Load'
                                style={linkButtonStyle}
                                showText={false}
                                onPress={() => {
                                    setIsLoading(true);
                                    loadModel();
                                }}
                            />
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={modelOptionStyle.icon_div}>
                        <FontAwesome6 name='spinner' size={20} color={'#61677A'} iconStyle="solid" />
                    </View>
                );
            }
            
        }
    }

    return (
        <View style={modelOptionStyle.main_div}>
        <Text style={modelOptionStyle.header}>{modelFile.filename}</Text>
        <View style={modelOptionStyle.sec_div}>
            <View style={modelOptionStyle.icon_div}>
                <FontAwesome6 name='memory' size={20} color={'#61677A'} iconStyle="solid" />
                <Text style={modelOptionStyle.labels}>{(modelFile.size / 1000000000).toFixed(2)} GB</Text>
            </View>
            {renderButtons()}
        </View>
        </View>
    );
}

export function DownloadedScreen() {
    const {
        fsChange,
        setFSChange,
        selected,
        setSelected
    } = useContext(AppContext);

    const [modelList, setModelList] = React.useState<hfModelFileProp[]>([]);
    const [isFirst, setIsFirst] = React.useState(true);

    async function getExistingModel() {
        // retrieve downloaded models for the first time or whenever the filesystem changes.
        if (isFirst || fsChange) {
            const res = await getDownloadedModels();
            setModelList(res);
            setIsFirst(false);
            setFSChange(false);
        }
    }

    getExistingModel();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF0E6', paddingLeft: 5, paddingRight: 5 }}>
            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "100%"}}>
                {modelList.length > 0 &&
                    modelList.map((model, index) => (
                    <HFModelOptionBlocks
                        key={index}
                        modelFile={model}
                        selected={selected}
                        setSelected={setSelected} />
                    ))
                }
                </View>
            </ScrollView>
        </View>
    );
}