import * as React from 'react';
import * as moment from 'moment';

import { ChatService } from '../../services/ChatService';
import { ChatMessage } from '../../models/ChatMessage';

interface ChatState {
    messages: ChatMessage[];
    currentMessage: string;
}


export class Chat extends React.Component<{}, ChatState>{

    msg: HTMLInputElement;
    panel: HTMLDivElement;

    private _chatService: ChatService;

    constructor() {
        super();
        this.state = {
            messages: [],
            currentMessage: ''
        };

        this.handleOnSocket = this.handleOnSocket.bind(this);
        this.focusField = this.focusField.bind(this);
        this.scrollDown = this.scrollDown.bind(this);

        this._chatService = new ChatService((msg: ChatMessage) => {
            this.handleOnSocket(msg);
        });

        this.handlePanelRef = this.handlePanelRef.bind(this);
        this.handleMessageRef = this.handleMessageRef.bind(this);

        this.handleMessageChange = this.handleMessageChange.bind(this);

        this._chatService.fetchInitialMessages(this.handleOnInitialMessagesFetched.bind(this));

    }
    
    handlePanelRef(div: HTMLDivElement) {
        this.panel = div;
    }

    handleMessageRef(input: HTMLInputElement) {
        this.msg = input;
    }

    handleMessageChange(event: any) {
        this.setState({ currentMessage: event.target.value });
    }
        
    handleOnSocket(message: ChatMessage) {
        let messages = this.state.messages;
        messages.push(message);
        this.setState({
            messages: messages,
            currentMessage: ''
        });
        this.scrollDown();
        this.focusField();
    }

    handleOnInitialMessagesFetched(messages: ChatMessage[]) {
        this.setState({
            messages: messages
        });
        this.scrollDown();
    }

    onSubmit(event: any) {
        event.preventDefault();
        this.addMessage();
    }

    addMessage() {
        let currentMessage = this.state.currentMessage;
        if (currentMessage.length === 0) {
            return;
        }

        let id = this.state.messages.length;
        let date = new Date();

        let messages = this.state.messages;

        messages.push({
            id: id,
            date: date,
            message: currentMessage,
            sender: 'juergen'
        });

        this.setState({
            messages: messages,
            currentMessage: ''
        });

        this.msg.focus();
        this.panel.scrollTop = this.panel.scrollHeight - this.panel.clientHeight;

    }

    private focusField() {
        this.msg.focus();
    }

    private scrollDown() {
        let div = this.panel;
        div.scrollTop = div.scrollHeight;
    }

    public render() {
        return (
            <div className='panel panel-default'>
                <div className='panel-body panel-chat' ref={this.handlePanelRef}>
                    <ul>
                        {
                            this.state.messages.map(message =>
                                <li key={message.id}>
                                    <strong>{message.sender}</strong>
                                    ({moment(message.date).format('HH:mm:ss')})<br />
                                    {message.message}
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className='panel-footer'>
                    <form className='form-inline' onSubmit={this.onSubmit.bind(this)}>
                        <label className='sr-only' htmlFor='msg'>Message</label>
                        <div className='input-group col-md-12'>
                            <button className='chat-button input-group-addon'>:-)</button>
                            <input
                                type='text'
                                value={this.state.currentMessage}
                                onChange={this.handleMessageChange}
                                className='form-control'
                                id='msg'
                                placeholder='Your message'
                                ref={this.handleMessageRef}
                            />
                            <button className='chat-button input-group-addon'>Send</button>
                        </div>
                    </form>                    
                </div>
            </div>
            
        );
    }
}

