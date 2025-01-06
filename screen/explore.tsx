import React from "react";
import * as RNFS from '@dr.pogodin/react-native-fs';
import {View, ScrollView, Text, Linking, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TextArea } from "../components/textbox";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { ChatButtonWithIcon, CButton } from "../components/button";
import { SearchBarConfigStyle } from "../components/textbox/style";
import { searchButtonStyle, linkButtonStyle, exploreButtonStyle } from "../components/button/style";
import { hfModelProp, getModelLists } from "../components/model/hfmodel";
import { HFPopUp } from "../components/modal/hfmodal";


interface searchDisplayStyleProp {
    main_div: StyleProp<ViewStyle>;
    header: StyleProp<TextStyle>;
    sec_div: StyleProp<ViewStyle>;
    icon_div: StyleProp<ViewStyle>;
    labels: StyleProp<TextStyle>;
}

const searchDisplayStyle: searchDisplayStyleProp = {
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

const SearchResults = (hfmodel: hfModelProp) => {
    const [visible, setVisible] = React.useState(false);
    return (
        <View style={searchDisplayStyle.main_div}>
                <Text style={searchDisplayStyle.header}>{hfmodel.id}</Text>
                <View style={searchDisplayStyle.sec_div}>
                    <View style={searchDisplayStyle.icon_div}>
                        <FontAwesome6 name='heart' size={14} color={'#61677A'} iconStyle="solid" />
                        <Text style={searchDisplayStyle.labels}>{hfmodel.likes}</Text>
                    </View>
                    <View style={searchDisplayStyle.icon_div}>
                        <FontAwesome6 name='download' size={14} color={'#61677A'} iconStyle="solid" />
                        <Text style={searchDisplayStyle.labels}>{hfmodel.nDownloads}</Text>
                    </View>
                    <View style={searchDisplayStyle.icon_div}>
                        <ChatButtonWithIcon
                            icon={<FontAwesome6 name='link' size={14} color={'#61677A'} iconStyle="solid" />}
                            title='Webpage'
                            style={linkButtonStyle}
                            showText={false}
                            onPress={() => {
                                try {
                                    Linking.openURL(hfmodel.link);
                                } catch(error) {
                                    console.error("Error opening URL: ", error);
                                }
                                
                            }}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', width: "100%", justifyContent: "center", alignItems: 'center'}}>
                    <CButton title="Explore" onPress={() => setVisible(!visible)} style={exploreButtonStyle} />
                </View>
                <HFPopUp hfmodel={hfmodel} visible={visible} setVisible={setVisible}/>
        </View>
    );
}

export function ExploreScreen() {
    const [jobID, setJobID] = React.useState<number | null>(null);
    const [searchInput, setSearchInput] = React.useState<string>('');
    const [modelList, setModelList] = React.useState<hfModelProp[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function fetchModel(search: string) {
        setIsLoading(true);
        if (search != '') {
            const res = await getModelLists(search);
            setModelList(res);
        } else {
            setModelList([]);
        }
        setIsLoading(false);
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF0E6', paddingLeft: 5, paddingRight: 5 }}>
            <Text style={{fontSize: 20, textAlign: 'center', color:'#5C5470', fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>Search HuggingFace models:</Text>
            <View style={{ width: "95%", maxWidth: 500, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 60}}>
                <TextArea
                    text={searchInput}
                    onChangeText={(val) => {
                        setSearchInput(val);
                    }}
                    placeholder="Input search here"
                    style={SearchBarConfigStyle}
                />
                <ChatButtonWithIcon
                    icon={<FontAwesome6 name='magnifying-glass' size={20} color={'#61677A'} iconStyle="solid" />}
                    title='Search'
                    style={searchButtonStyle}
                    showText={false}
                    onPress={() => {
                        fetchModel(searchInput);
                    }}
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "100%"}}>
                {!isLoading && modelList.length > 0 &&
                    modelList.map((desc, index) => (<SearchResults key={index} {...desc} />))
                }
                {isLoading &&
                    <View style={{marginTop: 50}}>
                        <Text style={{color: "#5C5470", fontSize: 24, fontWeight: 'bold'}}>Loading ... </Text>
                    </View>
                }
                {!isLoading && modelList.length == 0 &&
                    <View style={{marginTop: 50}}>
                        <Text style={{color: "#5C5470", fontSize: 24, fontWeight: 'bold'}}>No results</Text>
                    </View>
                }
                </View>
            </ScrollView>
        </View>
    );
}