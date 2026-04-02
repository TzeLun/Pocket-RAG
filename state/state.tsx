import React, { createContext } from 'react';
import { LlamaContext } from 'llama.rn';
import { hfModelDownloadStateManager } from '../components/model/hfmodel';
import * as RNFS from '@dr.pogodin/react-native-fs';

const RAG_SETTINGS_PATH = `${RNFS.DocumentDirectoryPath}/rag_settings.json`;

export type RAGParam = { id: string; key: string; value: string };

export interface AppContextProp {
    // For RAG API endpoint
    endpoint: string | null;
    rag_top_k: number;
    rag_top_n: number;
    ragHeaders: RAGParam[];
    ragBodyFields: RAGParam[];
    setEndpoint: React.Dispatch<React.SetStateAction<string | null>>;
    set_rag_top_k: React.Dispatch<React.SetStateAction<number>>;
    set_rag_top_n: React.Dispatch<React.SetStateAction<number>>;
    setRagHeaders: React.Dispatch<React.SetStateAction<RAGParam[]>>;
    setRagBodyFields: React.Dispatch<React.SetStateAction<RAGParam[]>>;

    // For Llama.rn initialization config
    model: LlamaContext | null; // eventually this should be llama context not string
    n_ctx: number;
    n_gpu_layers: number;
    flash_attn: boolean
    set_model: React.Dispatch<React.SetStateAction<LlamaContext | null>>;
    set_n_ctx: React.Dispatch<React.SetStateAction<number>>;
    set_n_gpu_layers: React.Dispatch<React.SetStateAction<number>>;
    set_flash_attn: React.Dispatch<React.SetStateAction<boolean>>;

    // For Llama.rn inference config
    system_prompt: string;
    stop: Array<string>;
    n_predict: number;
    n_probs: number;
    top_k: number;
    top_p: number;
    min_p: number;
    xtc_probability: number;
    xtc_threshold: number;
    typical_p: number;
    temperature: number;
    penalty_last_n: number;
    penalty_repeat: number;
    penalty_freq: number;
    penalty_present: number;
    penalize_nl: boolean;
    microstat: number;
    microstat_tau: number;
    microstat_eta: number;
    seed: number;
    set_system_prompt: React.Dispatch<React.SetStateAction<string>>;
    set_stop: React.Dispatch<React.SetStateAction<Array<string>>>;
    set_n_predict: React.Dispatch<React.SetStateAction<number>>;
    set_n_probs: React.Dispatch<React.SetStateAction<number>>;
    set_top_k: React.Dispatch<React.SetStateAction<number>>;
    set_top_p: React.Dispatch<React.SetStateAction<number>>;
    set_min_p: React.Dispatch<React.SetStateAction<number>>;
    set_xtc_probability: React.Dispatch<React.SetStateAction<number>>;
    set_xtc_threshold: React.Dispatch<React.SetStateAction<number>>;
    set_typical_p: React.Dispatch<React.SetStateAction<number>>;
    set_temperature: React.Dispatch<React.SetStateAction<number>>;
    set_penalty_last_n: React.Dispatch<React.SetStateAction<number>>;
    set_penalty_repeat: React.Dispatch<React.SetStateAction<number>>;
    set_penalty_freq: React.Dispatch<React.SetStateAction<number>>;
    set_penalty_present: React.Dispatch<React.SetStateAction<number>>;
    set_penalize_nl: React.Dispatch<React.SetStateAction<boolean>>;
    set_microstat: React.Dispatch<React.SetStateAction<number>>;
    set_microstat_tau: React.Dispatch<React.SetStateAction<number>>;
    set_microstat_eta: React.Dispatch<React.SetStateAction<number>>;
    set_seed: React.Dispatch<React.SetStateAction<number>>;

    // monitor any changes in the filesystem. Mainly model downloads or removal
    fsChange: boolean;
    setFSChange: React.Dispatch<React.SetStateAction<boolean>>;

    // monitor the current model in use
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>;

    // monitor the download states globally
    downloadManager: hfModelDownloadStateManager;
    setDownloadManager: React.Dispatch<React.SetStateAction<hfModelDownloadStateManager>>;
}

export const defaultState: AppContextProp = {
    endpoint: null,
    setEndpoint: () => {},
    rag_top_k: 20,
    rag_top_n: 5,
    ragHeaders: [],
    ragBodyFields: [],
    set_rag_top_k: () => {},
    set_rag_top_n: () => {},
    setRagHeaders: () => {},
    setRagBodyFields: () => {},
    model: null,
    n_ctx: 2048,
    n_gpu_layers: 1,
    flash_attn: true,
    set_model: () => {},
    set_n_ctx: () => {},
    set_n_gpu_layers: () => {},
    set_flash_attn: () => {},
    system_prompt: "Given the question and a list of relevant context, answer the question. Keep it concise and only use materials from the context in formulating the answer.",
    stop: ['</s>', '<|end|>', '<|eot_id|>', '<|end_of_text|>', '<|im_end|>', '<|EOT|>', '<|END_OF_TURN_TOKEN|>', '<|end_of_turn|>', '<|endoftext|>'],
    n_predict: 1024,
    n_probs: 0,
    top_k: 40,
    top_p: 0.95,
    min_p: 0.05,
    xtc_probability: 0.0,
    xtc_threshold: 1.0,
    typical_p: 1.0,
    temperature: 0.0,
    penalty_last_n: 64,
    penalty_repeat: 1.0,
    penalty_freq: 0.0,
    penalty_present: 0.0,
    penalize_nl: false,
    microstat: 0,
    microstat_tau: 5.0,
    microstat_eta: 0.1,
    seed: -1,
    set_system_prompt: () => {},
    set_stop: () => {},
    set_n_predict: () => {},
    set_n_probs: () => {},
    set_top_k: () => {},
    set_top_p: () => {},
    set_min_p: () => {},
    set_xtc_probability: () => {},
    set_xtc_threshold: () => {},
    set_typical_p: () => {},
    set_temperature: () => {},
    set_penalty_last_n: () => {},
    set_penalty_repeat: () => {},
    set_penalty_freq: () => {},
    set_penalty_present: () => {},
    set_penalize_nl: () => {},
    set_microstat: () => {},
    set_microstat_tau: () => {},
    set_microstat_eta: () => {},
    set_seed: () => {},
    
    fsChange: false,
    setFSChange: () => {},
    selected: '',
    setSelected: () => {},

    downloadManager: {},
    setDownloadManager: () => {}
}

export const AppContext = createContext<AppContextProp>(defaultState);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [endpoint, setEndpoint] = React.useState<string | null>(null);
    const [rag_top_k, set_rag_top_k] = React.useState<number>(20);
    const [rag_top_n, set_rag_top_n] = React.useState<number>(5);
    const [ragHeaders, setRagHeaders] = React.useState<RAGParam[]>([]);
    const [ragBodyFields, setRagBodyFields] = React.useState<RAGParam[]>([]);
    const [model, set_model] = React.useState<LlamaContext | null>(null);
    const [n_ctx, set_n_ctx] = React.useState<number>(2048);
    const [n_gpu_layers, set_n_gpu_layers] = React.useState<number>(1);
    const [flash_attn, set_flash_attn] = React.useState<boolean>(true);
    const [stop, set_stop] = React.useState<Array<string>>(['</s>', '<|end|>', '<|eot_id|>', '<|end_of_text|>', '<|im_end|>', '<|EOT|>', '<|END_OF_TURN_TOKEN|>', '<|end_of_turn|>', '<|endoftext|>']);
    const [n_predict, set_n_predict] = React.useState<number>(1024);
    const [n_probs, set_n_probs] = React.useState<number>(0);
    const [top_p, set_top_p] = React.useState<number>(0.95);
    const [top_k, set_top_k] = React.useState<number>(40);
    const [min_p, set_min_p] = React.useState<number>(0.05);
    const [xtc_probability, set_xtc_probability] = React.useState<number>(0.0);
    const [xtc_threshold, set_xtc_threshold] = React.useState<number>(1.0);
    const [typical_p, set_typical_p] = React.useState<number>(1.0);
    const [temperature, set_temperature] = React.useState<number>(0.0);
    const [penalty_last_n, set_penalty_last_n] = React.useState<number>(64);
    const [penalty_repeat, set_penalty_repeat] = React.useState<number>(1.0);
    const [penalty_freq, set_penalty_freq] = React.useState<number>(0.0);
    const [penalty_present, set_penalty_present] = React.useState<number>(0.0);
    const [penalize_nl, set_penalize_nl] = React.useState<boolean>(false);
    const [microstat, set_microstat] = React.useState<number>(0.0);
    const [microstat_tau, set_microstat_tau] = React.useState<number>(5.0);
    const [microstat_eta, set_microstat_eta] = React.useState<number>(0.1);
    const [seed, set_seed] = React.useState<number>(-1);
    const [system_prompt, set_system_prompt] = React.useState<string>(
        "Given the question and a list of relevant context, answer the question. Keep it concise and only use materials from the context in formulating the answer."
    );
    const [fsChange, setFSChange] = React.useState(false);
    const [selected, setSelected] = React.useState('');
    const [downloadManager, setDownloadManager] = React.useState({});

    // Guard: only save after the initial load has completed
    const ragLoaded = React.useRef(false);

    // Load persisted RAG settings on first mount
    React.useEffect(() => {
        RNFS.exists(RAG_SETTINGS_PATH).then(exists => {
            if (!exists) { ragLoaded.current = true; return; }
            RNFS.readFile(RAG_SETTINGS_PATH, 'utf8').then(raw => {
                try {
                    const saved = JSON.parse(raw);
                    if (saved.endpoint !== undefined) setEndpoint(saved.endpoint);
                    if (Array.isArray(saved.ragHeaders)) setRagHeaders(saved.ragHeaders);
                    if (Array.isArray(saved.ragBodyFields)) setRagBodyFields(saved.ragBodyFields);
                } catch (_) {}
            }).catch(() => {}).finally(() => { ragLoaded.current = true; });
        }).catch(() => { ragLoaded.current = true; });
    }, []);

    // Save RAG settings whenever they change, but never before load finishes
    React.useEffect(() => {
        if (!ragLoaded.current) return;
        const data = JSON.stringify({ endpoint, ragHeaders, ragBodyFields });
        RNFS.writeFile(RAG_SETTINGS_PATH, data, 'utf8').catch(() => {});
    }, [endpoint, ragHeaders, ragBodyFields]);

    return (
        <AppContext.Provider value= {{
            endpoint,
            setEndpoint,
            rag_top_k,
            rag_top_n,
            ragHeaders,
            ragBodyFields,
            set_rag_top_k,
            set_rag_top_n,
            setRagHeaders,
            setRagBodyFields,
            model,
            n_ctx,
            n_gpu_layers,
            flash_attn,
            set_model,
            set_n_ctx,
            set_n_gpu_layers,
            set_flash_attn,
            system_prompt,
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
            set_system_prompt,
            set_stop,
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
            fsChange,
            setFSChange,
            selected,
            setSelected,
            downloadManager,
            setDownloadManager
        }}>
            {children}
        </AppContext.Provider>
    );
}


