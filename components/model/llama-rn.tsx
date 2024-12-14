import { initLlama, loadLlamaModelInfo, LlamaContext, ContextParams, CompletionParams, NativeCompletionResult } from 'llama.rn';

export interface invokeParams extends CompletionParams {
    model: LlamaContext;
}

// Initialize the llama model
// Required argument: params.model = "file://<model file path>"
export async function initializeLlama(params: ContextParams): Promise<LlamaContext> {
    try {
        const modelPath = params.model;
        await loadLlamaModelInfo(modelPath);
        console.log("llama init ready");
        return (
            await initLlama(params)
        );
    } catch (err) {
        console.error("Failed to initialize Llama: ", err);
        throw err;
    }
}

// Do chat completion
export async function invoke(params: invokeParams, callback=(data: any)=>{const {token} = data}): Promise<NativeCompletionResult> {
    const { model, ...rest} = params;
    const msgResult = await model.completion(
        rest,
        callback
    );
    return msgResult;
}
