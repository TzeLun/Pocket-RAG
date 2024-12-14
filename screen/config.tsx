import { AppContext, defaultState } from '../state/state';
import React, {useContext} from 'react';
import {View, Text, ScrollView, StyleProp, ViewStyle, TextStyle} from 'react-native';
import { TextArea } from '../components/textbox';
import { ParamConfigStyle } from '../components/textbox/style';
import { SliderBar, ChatButtonWithIcon } from '../components/button';
import { ToggleSwitch } from '../components/button';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { configResetButtonStyle } from '../components/button/style';

interface pageStyleProp {
    div: StyleProp<ViewStyle>;
    nested_div: StyleProp<ViewStyle>;
    title: StyleProp<TextStyle>;
    unit: StyleProp<TextStyle>;
}

const pageStyle: pageStyleProp = {
    div: {
        marginBottom: 40
    },
    nested_div: {
        flexDirection: 'row', justifyContent: "center", alignItems: 'center'
    },
    title: {
        textAlign: 'left', fontSize: 20, fontWeight: 'bold', color: '#704264'
    },
    unit: {
        marginLeft: 20, color: '#BB8493', fontSize: 20, fontWeight: 'bold'
    }
}

export function ConfigScreen() {
    const {
        rag_top_k,
        rag_top_n,
        set_rag_top_k,
        set_rag_top_n,
        n_ctx,
        n_gpu_layers,
        flash_attn,
        set_n_ctx,
        set_n_gpu_layers,
        set_flash_attn,
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
        set_n_predict,
        set_n_probs,
        set_top_k,
        set_top_p,
        set_min_p,
        set_xtc_probability,
        set_xtc_threshold,
        set_typical_p,
        set_temperature,
        set_penalty_last_n,
        set_penalty_repeat,
        set_penalty_freq,
        set_penalty_present,
        set_penalize_nl,
        set_microstat,
        set_microstat_tau,
        set_microstat_eta,
        set_seed,
    } = useContext(AppContext);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF0E6', paddingLeft: 5, paddingRight: 5 }}>
            <Text style={{fontSize: 24, textAlign: 'center', color:'#5C5470', fontWeight: 'bold', marginBottom: 50}}>Adjust inference parameters:</Text>
            <ScrollView contentContainerStyle={{ paddingTop: 0 }}>
                {/* {RAG Top K} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>RAG (Top K)</Text>
                    <View style={pageStyle.nested_div}>
                        <TextArea
                            text={rag_top_k.toString()}
                            onChangeText={(val) => {set_rag_top_k(Number(val))}}
                            style={ParamConfigStyle}
                        />
                        <Text style={pageStyle.unit}>chunks</Text>
                    </View>
                </View>
                {/* {RAG Top N} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>RAG (Top N)</Text>
                    <View style={pageStyle.nested_div}>
                        <TextArea
                            text={rag_top_n.toString()}
                            onChangeText={(val) => {set_rag_top_n(Number(val))}}
                            style={ParamConfigStyle}
                        />
                        <Text style={pageStyle.unit}>chunks</Text>
                    </View>
                </View>
                {/* {Temperature} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Temperature</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={temperature}
                            setValue={set_temperature}
                            minimumValue={0.0}
                            maximumValue={1.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {Context Window} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Context window</Text>
                    <View style={pageStyle.nested_div}>
                        <TextArea
                            text={n_ctx.toString()}
                            onChangeText={(val) => {set_n_ctx(Number(val))}}
                            style={ParamConfigStyle}
                        />
                        <Text style={pageStyle.unit}>tokens</Text>
                    </View>
                </View>
                {/* {Number of prediction tokens} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Num Predict</Text>
                    <View style={pageStyle.nested_div}>
                        <TextArea
                            text={n_predict.toString()}
                            onChangeText={(val) => {set_n_predict(Number(val))}}
                            style={ParamConfigStyle}
                        />
                        <Text style={pageStyle.unit}>tokens</Text>
                    </View>
                </View>
                {/* {Num GPU layers} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Num GPU layers</Text>
                    <View style={pageStyle.nested_div}>
                        <TextArea
                                text={n_gpu_layers.toString()}
                                onChangeText={(val) => {set_n_gpu_layers(Number(val))}}
                                style={ParamConfigStyle}
                            />
                    </View>
                </View>
                {/* {Flash attention} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Flash attention</Text>
                    <View style={pageStyle.nested_div}>
                        <ToggleSwitch
                            isEnabled={flash_attn}
                            setIsEnabled={set_flash_attn}
                        />
                    </View>
                </View>
                {/* {Top k} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Top K</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={top_k}
                            setValue={set_top_k}
                            minimumValue={1}
                            maximumValue={128}
                            step={1}
                            handleFloat={false} />
                    </View>
                </View>
                {/* {Top P} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Top P</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={top_p}
                            setValue={set_top_p}
                            minimumValue={0.0}
                            maximumValue={1.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {Min P} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Min P</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={min_p}
                            setValue={set_min_p}
                            minimumValue={0.0}
                            maximumValue={1.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {XTC threshold} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>XTC threshold</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={xtc_threshold}
                            setValue={set_xtc_threshold}
                            minimumValue={0.0}
                            maximumValue={1.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {XTC probability} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>XTC probability</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={xtc_probability}
                            setValue={set_xtc_probability}
                            minimumValue={0.0}
                            maximumValue={1.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {Typical P} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Typical P</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={typical_p}
                            setValue={set_typical_p}
                            minimumValue={0.0}
                            maximumValue={2.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {Penalty last n} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Penalty last N</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={penalty_last_n}
                            setValue={set_penalty_last_n}
                            minimumValue={0}
                            maximumValue={256}
                            step={1}
                            handleFloat={false} />
                    </View>
                </View>
                {/* {Penalty repeat} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Penalty repeat</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={penalty_repeat}
                            setValue={set_penalty_repeat}
                            minimumValue={0.0}
                            maximumValue={2.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {Penalty freq} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Penalty freq</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={penalty_freq}
                            setValue={set_penalty_freq}
                            minimumValue={0.0}
                            maximumValue={2.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {Penalty present} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Penalty present</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={penalty_present}
                            setValue={set_penalty_present}
                            minimumValue={0.0}
                            maximumValue={2.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {Microstat tau} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Microstat tau</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={microstat_tau}
                            setValue={set_microstat_tau}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            handleFloat={false} />
                    </View>
                </View>
                {/* {Microstat eta} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Microstat eta</Text>
                    <View style={pageStyle.nested_div}>
                        <SliderBar
                            value={microstat_eta}
                            setValue={set_microstat_eta}
                            minimumValue={0.0}
                            maximumValue={1.0}
                            step={0.01} />
                    </View>
                </View>
                {/* {Penalize nl} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Penalize nl</Text>
                    <View style={pageStyle.nested_div}>
                        <ToggleSwitch
                            isEnabled={penalize_nl}
                            setIsEnabled={set_penalize_nl}
                        />
                    </View>
                </View>
                {/* {Seed} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Seed (Random: -1)</Text>
                    <View style={pageStyle.nested_div}>
                        <TextArea
                                text={seed.toString()}
                                onChangeText={(val) => {set_seed(Number(val))}}
                                style={ParamConfigStyle}
                            />
                    </View>
                </View>
                {/* {N probs} */}
                <View style={pageStyle.div}>
                    <Text style={pageStyle.title}>Num probs</Text>
                    <View style={pageStyle.nested_div}>
                        <TextArea
                                text={n_probs.toString()}
                                onChangeText={(val) => {set_n_probs(Number(val))}}
                                style={ParamConfigStyle}
                            />
                    </View>
                </View>
                <ChatButtonWithIcon
                    icon={<FontAwesome6 name='rotate' size={20} color={'#D8D9DA'} iconStyle="solid" />}
                    title='Reset'
                    style={configResetButtonStyle}
                    showText={true}
                    onPress={() => {
                        set_rag_top_k(defaultState.rag_top_k);
                        set_rag_top_n(defaultState.rag_top_n);
                        set_n_ctx(defaultState.n_ctx);
                        set_n_gpu_layers(defaultState.n_gpu_layers);
                        set_flash_attn(defaultState.flash_attn);
                        set_n_predict(defaultState.n_predict);
                        set_n_probs(defaultState.n_probs);
                        set_top_k(defaultState.top_k);
                        set_top_p(defaultState.top_p);
                        set_min_p(defaultState.min_p);
                        set_xtc_probability(defaultState.xtc_probability);
                        set_xtc_threshold(defaultState.xtc_threshold);
                        set_typical_p(defaultState.typical_p);
                        set_temperature(defaultState.temperature);
                        set_penalty_last_n(defaultState.penalty_last_n);
                        set_penalty_repeat(defaultState.penalty_repeat);
                        set_penalty_freq(defaultState.penalty_freq);
                        set_penalty_present(defaultState.penalty_present);
                        set_penalize_nl(defaultState.penalize_nl);
                        set_microstat(defaultState.microstat);
                        set_microstat_tau(defaultState.microstat_tau);
                        set_microstat_eta(defaultState.microstat_eta);
                        set_seed(defaultState.seed);
                    }}
                />
            </ScrollView>
        </View>
    );
}