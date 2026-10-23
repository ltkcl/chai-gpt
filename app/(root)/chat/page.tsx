import { redirect } from 'next/navigation';
import { startNewChat } from '@/feature/home/actions/start-new-chat';

export default async function ChatHomePage() {
  const conversationId = await startNewChat();
  redirect(`/c/${conversationId}`);
}
