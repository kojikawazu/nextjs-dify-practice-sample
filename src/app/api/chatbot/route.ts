import { NextResponse, NextRequest } from 'next/server';
const API_URL = 'https://api.dify.ai/v1/chat-messages';

export async function POST(request: NextRequest) {
    console.log('POST chatbot route');

    try {
        const body = await request.json();

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
            },
            body: JSON.stringify({
                inputs: body.inputs || {},
                query: body.query,
                response_mode: body.response_mode || 'blocking', // "streaming" または "blocking"
                conversation_id: body.conversation_id || '',
                user: body.user || '',
                files: body.files || [], // オプションの添付ファイル
            }),
        });

        if (!response.ok) {
            console.error('Error in POST chatbot route:', response);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }

        const data = await response.json();
        console.log(data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in POST chatbot route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
