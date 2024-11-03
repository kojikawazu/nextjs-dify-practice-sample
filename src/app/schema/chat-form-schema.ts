import { z } from 'zod';

// バリデーションスキーマの定義
export const chatFormSchema = z.object({
    message: z.string().min(1, 'メッセージを入力してください'),
});

// 型の定義
export type ChatFormData = z.infer<typeof chatFormSchema>;
