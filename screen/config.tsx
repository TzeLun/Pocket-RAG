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
    
    function renderSlider(
        name: string,
        value: number,
        setValue: React.Dispatch<React.SetStateAction<number>>,
        minVal: number,
        maxVal: number,
        step: number) {
        return (
            <View style={pageStyle.div}>
                <Text style={pageStyle.title}>{name}</Text>
                <View style={pageStyle.nested_div}>
                    <SliderBar
                        value={value}
                        setValue={setValue}
                        minimumValue={minVal}
                        maximumValue={maxVal}
                        step={step} />
                </View>
            </View>
        );
    }

    function renderBoxInput(
        name: string,
        value: number,
        onChange: React.Dispatch<React.SetStateAction<number>>,
        units = ''
    ) {
        return (
            <View style={pageStyle.div}>
                <Text style={pageStyle.title}>{name}</Text>
                <View style={pageStyle.nested_div}>
                    <TextArea
                        text={value.toString()}
                        onChangeText={(val) => {onChange(Number(val))}}
                        style={ParamConfigStyle}
                    />
                    {units != '' && <Text style={pageStyle.unit}>{units}</Text>}
                </View>
            </View>
        );
    }

    function renderToggleSwitch(
        name: string,
        value: boolean,
        setValue: React.Dispatch<React.SetStateAction<boolean>>
    ) {
        return (
            <View style={pageStyle.div}>
                <Text style={pageStyle.title}>{name}</Text>
                <View style={pageStyle.nested_div}>
                    <ToggleSwitch
                        isEnabled={value}
                        setIsEnabled={setValue}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF0E6', paddingLeft: 5, paddingRight: 5 }}>
            <Text style={{fontSize: 24, textAlign: 'center', color:'#5C5470', fontWeight: 'bold', marginBottom: 50}}>Adjust inference parameters:</Text>
            <ScrollView contentContainerStyle={{ paddingTop: 0 }}>
                {renderBoxInput("RAG (Top K)", rag_top_k, set_rag_top_k, "chunks")}
                {renderBoxInput("RAG (Top N)", rag_top_n, set_rag_top_n, "chunks")}
                {renderSlider("Temperature", temperature, set_temperature, 0.0, 1.0, 0.01)}
                {renderBoxInput("Context window", n_ctx, set_n_ctx, "tokens")}
                {renderBoxInput("Num Predict", n_predict, set_n_predict, "tokens")}
                {renderBoxInput("Num GPU layers", n_gpu_layers, set_n_gpu_layers)}
                {renderToggleSwitch("Flash attention", flash_attn, set_flash_attn)}
                {renderSlider("Top K", top_k, set_top_k, 1, 128, 1)}
                {renderSlider("Top P", top_p, set_top_p, 0.0, 1.0, 0.01)}
                {renderSlider("Min P", min_p, set_min_p, 0.0, 1.0, 0.01)}
                {renderSlider("XTC threshold", xtc_threshold, set_xtc_threshold, 0.0, 1.0, 0.01)}
                {renderSlider("XTC probability", xtc_probability, set_xtc_probability, 0.0, 1.0, 0.01)}
                {renderSlider("Typical P", typical_p, set_typical_p, 0.0, 2.0, 0.01)}
                {renderSlider("Penalty last N", penalty_last_n, set_penalty_last_n, 0, 256, 1)}
                {renderSlider("Penalty repeat", penalty_repeat, set_penalty_repeat, 0.0, 2.0, 0.01)}
                {renderSlider("Penalty freq", penalty_freq, set_penalty_freq, 0.0, 2.0, 0.01)}
                {renderSlider("Penalty present", penalty_present, set_penalty_present, 0.0, 2.0, 0.01)}
                {renderSlider("Microstat tau", microstat_tau, set_microstat_tau, 0, 10, 1)}
                {renderSlider("Microstat eta", microstat_eta, set_microstat_eta, 0.0, 1.0, 0.01)}
                {renderToggleSwitch("Penalize nl", penalize_nl, set_penalize_nl)}
                {renderBoxInput("Seed (Random: -1)", seed, set_seed)}
                {renderBoxInput("Num probs", n_probs, set_n_probs)}
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