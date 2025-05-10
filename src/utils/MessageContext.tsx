import { createContext, useContext } from "react";
import { MessageInstance } from "antd/es/message/interface";

export const MessageContext = createContext<MessageInstance | null>(null);

export const useMessageApi = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessageApi must be used within a MessageProvider");
    }
    return context;
};
