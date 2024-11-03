/**
 * チャットメッセージ
 */
export interface ChatMessage {
    text: string;
    isUser: boolean;
}

/**
 * Dify API のレスポンス
 */
export interface DifyResponse {
    answer: string;
    conversation_id: string;
    created_at: number;
    event: string;
    id: string;
    message_id: string;
    mode: string;
    task_id: string;
}
