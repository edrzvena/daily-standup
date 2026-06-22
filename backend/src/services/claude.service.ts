import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateStandupReport(rawInput: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a helpful assistant that converts casual work updates into professional standup reports.

Format the output EXACTLY like this (in English, professional tone):

**Yesterday:**
[what was done yesterday]

**Today:**
[what will be done today]

**Blockers:**
[any blockers, or write "None" if there are no blockers]

User input: ${rawInput}

Respond ONLY with the formatted standup report. No additional commentary.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type from Claude');
  return content.text;
}