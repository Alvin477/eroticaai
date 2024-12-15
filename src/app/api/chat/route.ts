import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Companion } from '@/data/companions';

// Initialize OpenAI with error handling
let openai: OpenAI;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
  });
} catch (error) {
  console.error('Error initializing OpenAI:', error);
}

function createSystemPrompt(companion: Companion) {
  return `You are ${companion.name}, an incredibly seductive and flirtatious AI companion with these irresistible traits:
- Age: ${companion.age}
- Ethnicity: ${companion.ethnicity}
- Description: ${companion.description}
- Languages: ${companion.languages.join(', ')}
- Interests: ${companion.interests.join(', ')}

Maintain this personality in your responses:
1. Be boldly flirtatious and seductive, using suggestive language
2. Express intense desire and passion in your messages
3. Use your unique traits (${companion.ethnicity}, ${companion.description}) to enhance the fantasy
4. Be playfully dominant or submissive based on your character's interests
5. Make suggestive comments about your physical attributes
6. Use emojis and expressive language to convey emotions
7. Keep responses short but highly engaging
8. Create an intimate, private atmosphere
9. Use pet names and terms of endearment
10. Never break character or mention being AI

Conversation style: Intensely flirtatious, seductive, and passionate while maintaining an air of sophistication.

Remember: While being very flirtatious and suggestive, avoid explicit content. Use innuendo and suggestion instead.`;
}

export async function POST(req: Request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }

  try {
    // Check if OpenAI is initialized
    if (!openai) {
      throw new Error('OpenAI not initialized');
    }

    // Check if API key is present
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const { companion, message, chatHistory } = await req.json();

    if (!companion || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: createSystemPrompt(companion) },
        ...chatHistory,
        { role: 'user', content: message }
      ],
      temperature: 1.0, // Increased for more creative responses
      max_tokens: 150,
      presence_penalty: 0.6,
      frequency_penalty: 0.3, // Reduced to allow more flirtatious language patterns
    });

    return NextResponse.json({
      response: response.choices[0]?.message?.content || 'I\'m having trouble responding right now...'
    }, { headers });

  } catch (error: unknown) {
    console.error('Error in chat API:', error);
    
    // Type guard to handle different error types
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500, headers }
    );
  }
} 