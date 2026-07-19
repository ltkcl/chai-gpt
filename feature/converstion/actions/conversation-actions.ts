"use server"

import { requireUser } from "@/feature/auth/action/require-user"
import {prisma} from "@/lib/db"
import { BlobOptions } from "buffer"
import { assert } from "console"
import { id } from "date-fns/locale"
import { create } from "domain"
import { revalidatePath } from "next/cache"
import { title } from "process"

export type ConversationListItem ={
    id : String,
    title : String,
    isPinned : boolean,
    isArchived : boolean,
    lastMessageAt : Date,
    createAt :Date,
    updatedAt : Date
}

export async function listConversations():Promise<ConversationListItem[]>{
    const user = await requireUser();
    return prisma.Conversation.findMany({
        where : { userId : user.id , isArchived: false },
        orderBy : [{ isPinned : "desc" }, { lastMessageAt : "desc" }],
        select:{
            id : true,
            title: true,
            isPinned : true,
            isArchived : true,
            lastMessageAt : true,
            createAt : true,
            updatedAt : true
        }
    })
}

export async function createConversation (title = "New Chat"){
    const user = await requireUser();
    return prisma.conversation.create({
        data:{
            userId : user.id,
            title:  title.trim() ||  "New Chat"
        }
    })
}

export async function assertOwnConversation( conversationId : String ,userId : String ){
    const conversation  = await prisma.conversation.findFirst({
        where:{
            id : conversationId,
            userId
        }
    })
    if(!conversation){
        throw new Error("Conversation not found");
    }
    return conversation;
}

export async function deleteConversation(conversationId : string){
    const user = await requireUser();
    await assertOwnConversation(conversationId,user.id);

    await prisma.conversation.delete({
        where :{ id : conversationId } ,
    })

    revalidatePath("/");
    return { id :  conversationId};
}

export async function updateConversation(
    conversationId: string ,
    data : {title ?: String ;  isPinned?: boolean ; isArchived?: boolean }) {
    const user  = await requireUser();
    await assertOwnConversation(conversationId,user.id);

    const conversation  = await prisma.conversation.update({
        where :{ id: conversationId},
        data: {
            ...(data.title !== undefined ? {title: data.title.trim() || "New Chat" }:{}),
            ...(data.isPinned !== undefined ? { isArchived : data.isArchived } : {}) ,
            ...(data.isArchived != undefined ? { isArchived: data.isArchived } : {} )
        },        
    })
    revalidatePath("/");
    revalidatePath(`/c/${conversationId}`);
    return conversation;
}