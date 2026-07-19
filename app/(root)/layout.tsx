import { onBoard } from '@/feature/auth/action/onboard';
import { auth } from '@clerk/nextjs/server';
import React, { ReactNode } from 'react'

const RootGroupLayout  = async({children} : {children : React.ReactNode})=> {
    await auth.protect();
    await onBoard();

  return (
    <div>
         {children}
    </div>
  )
}

export default RootGroupLayout;