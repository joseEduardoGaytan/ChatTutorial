﻿import 'isomorphic-fetch';

import WebsocketService from './ChatWebsocketService';
import { ChatMessage } from '../models/ChatMessage';

export class ChatService {
    private _messageAdded: any;

    constructor(messageAdded: any) {
        this._messageAdded = messageAdded;
                
        WebsocketService.registerMessageAdded((message: ChatMessage) => {
            this._messageAdded(message);
        });
    }

    public addMessage(message: string) {
        WebsocketService.sendMessage(message);
    }

    public fetchInitialMessages(fetchInitialMessagesCallback: (msg: ChatMessage[]) => void) {
        fetch('api/Chat/InitialMessages')
            .then(response => response.json() as Promise<ChatMessage[]>)
            .then(data => {
                fetchInitialMessagesCallback(data);
            });
    }
}