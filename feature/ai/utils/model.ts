import { google } from '@ai-sdk/google';

export const DEFAULT_CHAT_MODEL = "gemini-3.8-flash";

export function getChatModel( modelId? : string | null){
    return google( modelId || DEFAULT_CHAT_MODEL);
}