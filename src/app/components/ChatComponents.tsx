'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ChatMessage, DifyResponse } from '@/app/types/chat';
import { ChatFormData, chatFormSchema } from '@/app/schema/chat-form-schema';
import DifyHeader from '@/app/components/layout/DifyHeader';

/**
 * チャットコンポーネント
 * @returns JSX.Element
 */
const ChatComponents = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // React Hook Form
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ChatFormData>({
        resolver: zodResolver(chatFormSchema),
    });

    const onSubmit = async (data: ChatFormData) => {
        // ユーザーのメッセージを追加
        const newMessage: ChatMessage = {
            text: data.message,
            isUser: true,
        };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        try {
            // Dify API にメッセージを送信
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: {},
                    query: data.message,
                    response_mode: 'blocking',
                    conversation_id: '',
                    user: 'user-123',
                    files: [],
                }),
            });
            const responseData: DifyResponse = await response.json();

            // ボットのメッセージを追加
            const botMessage: ChatMessage = {
                text: responseData.answer,
                isUser: false,
            };
            setMessages([...updatedMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message: ', error);
        }

        // フォームをリセット
        reset();
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]">
            <DifyHeader />

            <div className="flex-1 overflow-y-auto p-6">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-6`}
                    >
                        <div
                            className={`rounded-2xl p-4 max-w-[70%] backdrop-blur-sm shadow-lg ${
                                message.isUser
                                    ? 'bg-[#00ff9d] bg-opacity-20 text-[#ffffff] border border-[#00ff9d] border-opacity-30'
                                    : 'bg-[#ffffff] bg-opacity-10 text-[#e0e0e0] border border-white border-opacity-10'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 bg-[#000000] bg-opacity-50 backdrop-blur-lg"
            >
                {errors.message && <p className="text-red-500 mb-2">{errors.message.message}</p>}
                <div className="flex gap-3">
                    <input
                        type="text"
                        {...register('message')}
                        className="flex-1 p-4 rounded-xl bg-[#ffffff] bg-opacity-5 border border-[#ffffff] border-opacity-10 text-[#e0e0e0] focus:outline-none focus:border-[#00ff9d] focus:border-opacity-50 placeholder-gray-500"
                        placeholder="メッセージを入力してください..."
                    />
                    <button
                        type="submit"
                        className="bg-[#00ff9d] bg-opacity-20 text-[#00ff9d] px-8 py-4 rounded-xl hover:bg-opacity-30 transition-all duration-300 border border-[#00ff9d] border-opacity-30"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatComponents;
