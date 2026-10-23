export const queryKeys={
    conversations :{
        all: ["conversation"] as const ,
        detail: (conversationId: string) => ["conversation", conversationId] as const,
    },
    messages :{
        byConversation :(conversationId : string) => ["messages",conversationId] as const, 
    }
}
