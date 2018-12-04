//import { HubConnection, HttpTransportType, ConsoleLogger } from '@aspnet/signalr';
//import { HubConnection, HttpTransportType, ConsoleLogger, LogLevel, IConnection, IHubConnectionOptions } from '@aspnet/signalr';
import * as signalR from "@aspnet/signalr";
import { ChatMessage} from '../models/ChatMessage';

class ChatWebsocketService{    

    private _connection: signalR.HubConnection;

    constructor() {
        var transport = signalR.HttpTransportType.WebSockets;
        //let logger = new signalR. ConsoleLogger(LogLevel.Information);

        //let options: IHubConnectionOptions = {
        //    transport: transport,
        //    logger: logger
        //};
        let url: string = `http://${document.location.host}/chat`;

        // create Connection
        //this._connection = new signalR.HubConnection(
        //    url,
        //    options);

        this._connection = new signalR.HubConnectionBuilder()
            .withUrl(url, transport)
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        // start connection
        //this._connection.start().catch(err => console.error(err, 'red'));
        this._connection.start().catch(err => console.error(err, 'red'));
    }

    public registrerUserLoggedOn(userLoggedOn: (id: number, name: string) => void) {
        // get new user from the server
        this._connection.on('UserLoggedOn', (id: number, name: string) => {
            userLoggedOn(id, name);
        });
    }

    public registerMessageAdded(messageAdded: (msg: ChatMessage) => void) {
        // get chat message from the server
        this._connection.on('MessageAdded', (message: ChatMessage) => {
            messageAdded(message);
        });
    }

    public sendMessage(message: string) {
        // send the chat message to the server
        this._connection.invoke('AddMesssage', message);
    }

}

const WebsocketService = new ChatWebsocketService();

export default WebsocketService;