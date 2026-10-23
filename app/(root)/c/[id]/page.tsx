import { notFound } from 'next/navigation';
import React from 'react'
import { requireUser } from '@/feature/auth/action/require-user';
import { assertOwnConversation } from '@/feature/converstion/actions/conversation-actions';
import { loadChatMessages } from '@/feature/ai/actions/chat_store';
import { ConversationView } from '@/feature/converstion/components/conversation-view';
type ConversationPageProps={
    params : Promise<{id: string }>
}

const page = async({params}: ConversationPageProps) => {
    const {id} = await params;
    try{
      const user = await requireUser();
      await assertOwnConversation(id, user.id);
    }catch(error){
      notFound();
    }
    const initialMessages = await loadChatMessages(id);
    
  return (
    <ConversationView
      key={id}
      conversationId={id}
      initialMessages={initialMessages}
    />
  )
}

export default page;
