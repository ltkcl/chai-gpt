import {auth} from "@clerk/nextjs/server"; 
import { requireUser } from "@/feature/auth/action/require-user";
import { loadChatMessages, saveChatMessages} from "@/feature/ai/actions/chat_store";
import { convertToModelMessages, createIdGenerator, createUIMessageStreamResponse, streamText, tool, toUIMessageStream, type UIMessage} from "ai"
import { prisma } from "@/lib/db";
import { getChatModel } from "@/feature/ai/utils/model";
export async function POST(req: Request){
    await auth.protect();

    const {message , id } : {message: UIMessage  , id: string}= await req.json();
    if(!message || !id){
        return new Response("Missing messages or conversation id",{ status : 400}) ;
    }

    const user = await requireUser();
    const conversation = await prisma.conversation.findUnique({
        where:{
            id,
            userId: user.id
        }
    })
    if(!conversation){
        return new Response("Conversation not found",{ status : 404});
    }
    const previousMessages = await loadChatMessages(id); 

    const alreadySaved = previousMessages.some((storedMessage)=>{
        return storedMessage.id === message.id;
    });
    const messagesToSave = alreadySaved ? previousMessages : [...previousMessages, message];

    if(!alreadySaved){
         await saveChatMessages(id, [message]);
    }

    const  result =   streamText({
         model : getChatModel(conversation.model),
         system : conversation.systemPrompt ?? "You are chaiGPT , a helpful assistant",
        messages : await convertToModelMessages(messagesToSave), 
    })

    result.consumeStream();    
    
    return  createUIMessageStreamResponse( {
        stream : toUIMessageStream({
            stream : result.stream,
            originalMessages : messagesToSave,
            generateMessageId : createIdGenerator({prefix : "msg", size : 16}),
            onEnd : async({messages : finalMessages})=>{
                try{
                     await saveChatMessages(id, finalMessages , {updateTitle : false});
                }catch{

                }
            }
        })
    })
}
