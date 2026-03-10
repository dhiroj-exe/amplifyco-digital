import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE = {
  services: [
    "We offer custom website development tailored for premium brands.",
    "Our services involve high-end digital experiences, cinematic animations, and SEO-optimized architecture.",
    "Brand overhaul packages typically include full 3D design, Next.js architecture, and seamless integrations."
  ],
  pricing: [
    "Our pricing is custom tailored to the project's complexity.",
    "For specific package quotes, please navigate to our Pricing page."
  ],
  contact: [
    "You can reach us through the Contact page.",
    "We also accept executive inquiries at anplifycodigital@gmail.com.",
    "Would you like me to direct you to schedule a meeting?"
  ],
  general: [
    "AmplifyCO is a premium digital agency engineering high-end web experiences.",
    "We specialize in Next.js, 3D web technologies, and seamless interactive design."
  ],
  fallback: [
    "I'm afraid I don't have the specific answer to that. Would you like to reach out to our team via the Contact page?",
    "That is an interesting question. Our executive team would be happy to discuss this further—please book a meeting or contact us."
  ]
};

function generateBotResponse(message: string): string {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('service') || lowerMsg.includes('what do you do') || lowerMsg.includes('offer')) {
    return KNOWLEDGE_BASE.services[Math.floor(Math.random() * KNOWLEDGE_BASE.services.length)];
  }
  
  if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
    return KNOWLEDGE_BASE.pricing[Math.floor(Math.random() * KNOWLEDGE_BASE.pricing.length)];
  }

  if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach') || lowerMsg.includes('meeting')) {
    return KNOWLEDGE_BASE.contact[Math.floor(Math.random() * KNOWLEDGE_BASE.contact.length)];
  }

  if (lowerMsg.includes('who are you') || lowerMsg.includes('amplifyco') || lowerMsg.includes('about')) {
    return KNOWLEDGE_BASE.general[Math.floor(Math.random() * KNOWLEDGE_BASE.general.length)];
  }

  return KNOWLEDGE_BASE.fallback[Math.floor(Math.random() * KNOWLEDGE_BASE.fallback.length)];
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages array provided' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1];

    if (latestMessage.role !== 'user') {
      return NextResponse.json({ error: 'Latest message must be from user' }, { status: 400 });
    }

    // Simulate network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

    const botReply = generateBotResponse(latestMessage.content);

    return NextResponse.json({
      role: 'assistant',
      content: botReply,
    });
  } catch (error) {
    console.error('Error in AI Assistant API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
