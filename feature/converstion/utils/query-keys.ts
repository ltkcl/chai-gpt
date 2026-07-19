export const queryKeys={
    conversations :{
        all: ["conversation"] as const ,
    },
    messages :{
        byConversation :(conversationId : string) => ["messages",conversationId] as const, 
    }
}
