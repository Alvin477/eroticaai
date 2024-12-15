import { Companion } from '@/data/companions';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateChatResponse(
  companion: Companion,
  message: string,
  chatHistory: ChatMessage[]
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companion,
        message,
        chatHistory,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate chat response');
    }

    const data = await response.json();
    return data.response;
  } catch (error: unknown) {
    // Type guard to handle different error types
    let errorMessage = 'Failed to generate response';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error in chat service:', errorMessage);
    throw new Error(errorMessage);
  }
}