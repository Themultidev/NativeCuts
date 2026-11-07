const RESPONSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    status: { type: 'string', enum: ['recommended', 'retake'] },
    styleId: { type: ['string', 'null'] },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    reason: { type: 'string' },
    retakeMessage: { type: ['string', 'null'] },
  },
  required: ['status', 'styleId', 'confidence', 'reason', 'retakeMessage'],
};

const responseText = (payload) => payload.output_text || payload.output
  ?.flatMap((item) => item.content || [])
  .find((item) => item.type === 'output_text')?.text;

export async function recommendObserveStyle({ photos, mood, styles }) {
  if (!process.env.OPENAI_API_KEY) {
    const error = new Error('Observe AI is not configured yet.');
    error.status = 503;
    throw error;
  }

  const catalogue = styles.map((style) => ({
    id: String(style._id),
    name: style.name,
    description: style.description,
  }));

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OBSERVE_AI_MODEL || 'gpt-4.1-mini',
      store: false,
      instructions: 'You are Native Cuts Observe, a careful barber-style matching assistant. Assess only visible haircut-relevant features such as current hair length, texture presentation, growth pattern, head silhouette, and maintenance practicality. Never infer or mention race, ethnicity, health, age, attractiveness, or gender. Select only an exact style ID from the supplied catalogue. If any view is missing, unclear, not a person, or does not show the hair, return retake. Keep the reason practical, respectful, and under 45 words.',
      input: [{
        role: 'user',
        content: [
          { type: 'input_text', text: `Requested mood: ${mood}. Native's approved catalogue: ${JSON.stringify(catalogue)}. The images are ordered front, side, back. Choose the most suitable approved style.` },
          ...photos.map((image_url) => ({ type: 'input_image', image_url, detail: 'low' })),
        ],
      }],
      text: {
        format: {
          type: 'json_schema',
          name: 'observe_recommendation',
          strict: true,
          schema: RESPONSE_SCHEMA,
        },
      },
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    console.error('Observe AI request failed:', response.status, payload.error?.code || payload.error?.type || 'unknown');
    const error = new Error('Observe could not analyze the views right now.');
    error.status = 502;
    throw error;
  }

  let result;
  try {
    result = JSON.parse(responseText(payload));
  } catch {
    const error = new Error('Observe returned an unreadable recommendation.');
    error.status = 502;
    throw error;
  }

  if (result.status === 'retake') return result;
  const selected = styles.find((style) => String(style._id) === result.styleId);
  if (!selected) {
    const error = new Error('Observe returned a style outside the Native catalogue.');
    error.status = 502;
    throw error;
  }

  return { ...result, style: selected };
}
