import { onBoard } from '@/feature/auth/action/onboard';
import { auth } from '@clerk/nextjs/server';
import React, { ReactNode } from 'react'
import { ChatShell } from '@/feature/converstion/components/chat-shell';
const RootGroupLayout  = async({children} : {children : React.ReactNode})=> {
    await auth.protect();
    await onBoard();

  return (
    <ChatShell>
         {children}
    </ChatShell>
  )
}

export default RootGroupLayout;