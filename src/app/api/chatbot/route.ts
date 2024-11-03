import { NextResponse, NextRequest } from 'next/server';

const API_URL = process.env.DIFY_API_URL as string;
const API_KEY = process.env.DIFY_API_KEY as string;

/**
 * チャットボット API
 * @param request NextRequest
 * @returns NextResponse
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
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
