import React, { useContext } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CButton } from '../components/button';
import { successNotification, failureNotification } from '../components/message/style';
import MessageBox from '../components/message/message';
import axios from 'axios';
import { AppContext } from '../state/state';
import type { RAGParam } from '../state/state';

function uid() {
    return Math.random().toString(36).slice(2);
}

export function DatabaseScreen() {
    const { endpoint, setEndpoint, ragHeaders, setRagHeaders, ragBodyFields, setRagBodyFields } = useContext(AppContext);

    const [urlInput, setUrlInput] = React.useState(endpoint ?? '');
    const [status, setStatus] = React.useState<boolean | null>(null);
    const [errorMsg, setErrorMsg] = React.useState('');

    // Sync local text input when the persisted endpoint is loaded into context
    React.useEffect(() => {
        setUrlInput(endpoint ?? '');
    }, [endpoint]);

    // --- Headers ---
    function addHeader() {
        setRagHeaders(prev => [...prev, { id: uid(), key: '', value: '' }]);
    }
    function updateHeader(id: string, field: 'key' | 'value', val: string) {
        setRagHeaders(prev => prev.map(h => h.id === id ? { ...h, [field]: val } : h));
    }
    function removeHeader(id: string) {
        setRagHeaders(prev => prev.filter(h => h.id !== id));
    }

    // --- Body fields ---
    function addBodyField() {
        setRagBodyFields(prev => [...prev, { id: uid(), key: '', value: '' }]);
    }
    function updateBodyField(id: string, field: 'key' | 'value', val: string) {
        setRagBodyFields(prev => prev.map(f => f.id === id ? { ...f, [field]: val } : f));
    }
    function removeBodyField(id: string) {
        setRagBodyFields(prev => prev.filter(f => f.id !== id));
    }

    async function validateEndpoint() {
        const url = urlInput.trim();
        if (!url) {
            setStatus(false);
            setErrorMsg('Please enter an endpoint URL.');
            return;
        }
        setEndpoint(url);

        const headersObj: Record<string, string> = {};
        ragHeaders.forEach(h => { if (h.key.trim()) headersObj[h.key.trim()] = h.value; });

        const body: Record<string, any> = { question: 'test' };
        ragBodyFields.forEach(f => {
            if (f.key.trim()) {
                const num = Number(f.value);
                body[f.key.trim()] = f.value !== '' && !isNaN(num) ? num : f.value;
            }
        });

        try {
            await axios.post(url, body, { headers: headersObj });
            console.log(`Successful access to: ${url}`);
            setStatus(true);
        } catch (error) {
            console.log(`Error accessing: ${url}`, error);
            setStatus(false);
            setErrorMsg(`[Error connecting to RAG server] ==> ${error}`);
        }
    }

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Custom RAG Endpoint</Text>

                {/* Endpoint URL */}
                <Text style={styles.sectionLabel}>Endpoint URL</Text>
                <TextInput
                    style={styles.urlInput}
                    value={urlInput}
                    onChangeText={setUrlInput}
                    onBlur={() => setEndpoint(urlInput.trim() || null)}
                    placeholder="http://host:port/path"
                    placeholderTextColor="#B9B4C7"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                />

                {/* Headers */}
                <Text style={styles.sectionLabel}>Headers</Text>
                {ragHeaders.map(h => (
                    <View key={h.id} style={styles.row}>
                        <TextInput
                            style={styles.keyInput}
                            value={h.key}
                            onChangeText={v => updateHeader(h.id, 'key', v)}
                            placeholder="Key"
                            placeholderTextColor="#B9B4C7"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.valInput}
                            value={h.value}
                            onChangeText={v => updateHeader(h.id, 'value', v)}
                            placeholder="Value"
                            placeholderTextColor="#B9B4C7"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity style={styles.removeBtn} onPress={() => removeHeader(h.id)}>
                            <Text style={styles.removeBtnText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.addBtn} onPress={addHeader}>
                    <Text style={styles.addBtnText}>+ Add Header</Text>
                </TouchableOpacity>

                {/* JSON Body */}
                <Text style={styles.sectionLabel}>JSON Body</Text>

                {/* Fixed question field */}
                <View style={styles.row}>
                    <Text style={styles.fixedKey}>question</Text>
                    <Text style={styles.fixedVal}>(user message — string)</Text>
                    <View style={styles.removeBtn} />
                </View>

                {/* Custom body fields */}
                {ragBodyFields.map(f => (
                    <View key={f.id} style={styles.row}>
                        <TextInput
                            style={styles.keyInput}
                            value={f.key}
                            onChangeText={v => updateBodyField(f.id, 'key', v)}
                            placeholder="Key"
                            placeholderTextColor="#B9B4C7"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.valInput}
                            value={f.value}
                            onChangeText={v => updateBodyField(f.id, 'value', v)}
                            placeholder="Value"
                            placeholderTextColor="#B9B4C7"
                        />
                        <TouchableOpacity style={styles.removeBtn} onPress={() => removeBodyField(f.id)}>
                            <Text style={styles.removeBtnText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.addBtn} onPress={addBodyField}>
                    <Text style={styles.addBtnText}>+ Add Field</Text>
                </TouchableOpacity>

                <CButton title="Verify" onPress={validateEndpoint} />
                {status === true && <MessageBox text="Connection successful!" style={successNotification} />}
                {status === false && <MessageBox text={errorMsg} style={failureNotification} />}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FAF0E6',
    },
    content: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#5C5470',
        textAlign: 'center',
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#5C5470',
        marginTop: 20,
        marginBottom: 8,
    },
    urlInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B9B4C7',
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: '#5C5470',
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    keyInput: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#B9B4C7',
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#5C5470',
        fontSize: 13,
        marginRight: 6,
    },
    valInput: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#B9B4C7',
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#5C5470',
        fontSize: 13,
        marginRight: 6,
    },
    removeBtn: {
        width: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeBtnText: {
        color: '#BB8493',
        fontSize: 16,
        fontWeight: 'bold',
    },
    fixedKey: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#B9B4C7',
        fontSize: 13,
        fontStyle: 'italic',
        marginRight: 6,
    },
    fixedVal: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#B9B4C7',
        fontSize: 13,
        fontStyle: 'italic',
        marginRight: 6,
    },
    addBtn: {
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#B9B4C7',
        marginBottom: 8,
    },
    addBtnText: {
        color: '#5C5470',
        fontSize: 13,
    },
});
