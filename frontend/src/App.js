import { React, useState, useEffect } from "react";

import SideBar from "./components/sidebar/sideBar.js";
import Dialog from "./components/dialog/dialog.js";
import DialogHeader from "./components/dialogheader/dialogHeader.js";
import DialogFooter from "./components/dialogfooter/dialogFooter.js";
import NewChatModal from "./components/newchatmodal/newChatModal.js";
import SaveLogModal from "./components/savelogmodal/saveLogModal.js";

import "./App.css";

function App() {
    const [chatList, setChatList] = useState([]);

    const [messages, setMessages] = useState([
        { fromChat: true, content: "Lorem ipsum dolor sit amet" },
        { fromChat: false, content: "Lorem ipsum dolor sit amet" },
        { fromChat: true, content: "Lorem ipsum dolor sit amet" },
        { fromChat: false, content: "Lorem ipsum dolor sit amet" },
        { fromChat: true, content: "Lorem ipsum dolor sit amet" },
        { fromChat: false, content: "Lorem ipsum dolor sit amet" },
        { fromChat: true, content: "Lorem ipsum dolor sit amet" },
        { fromChat: false, content: "Lorem ipsum dolor sit amet" },
        { fromChat: true, content: "Lorem ipsum dolor sit amet" },
        { fromChat: false, content: "Lorem ipsum dolor sit amet" },
        { fromChat: true, content: "Lorem ipsum dolor sit amet" },
        { fromChat: false, content: "Lorem ipsum dolor sit amet" },
        { fromChat: true, content: "Lorem ipsum dolor sit amet" },
    ]);

    const [currentChat, setCurrentChat] = useState({
        id: null,
        title: "Crie um Chat",
    });

    const [newChatModal, setNewChatModal] = useState(false);
    const [saveLogModal, setSaveLogModal] = useState(false);

    const handleNewChatAdded = () => {
        setCurrentChat({
            id: chatList[chatList.length - 1].chatId,
            title: chatList[chatList.length - 1].chatTitle,
        });
        setMessages([]);
    };

    // TODO: API INICIA O PROGRAMA PEGANDO TODOS OS CHATS: CHAT GET
    useEffect(() => {
        setChatList([]);
        if (chatList.length === 0) setNewChatModal(true);
        else handleNewChatAdded();
    }, []);

    useEffect(() => {
        if (chatList.length !== 0) {
            handleNewChatAdded();
        }
    }, [setChatList, chatList]);

    const handleChangeChat = (id, title) => {
        console.log(id);
        console.log(title);
        setCurrentChat({
            id: id,
            title: title,
        });
        // TODO: API PEGAR MENSAGENS DO CHAT CORRESPONDENTE
        setMessages([]);
    };

    const handleSendMessage = (message) => {
        const newMessage = { fromChat: false, content: message };
        const newBotMessage = {
            fromChat: true,
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        };
        // TODO: API ENVIAR MENSAGEM PARA O BANCO E SALVAR
        setMessages([...messages, newMessage, newBotMessage]);
    };

    const handleCreateNewChat = (newChatInfo) => {
        setChatList([...chatList, newChatInfo]);
    };

    return (
        <div className="App">
            <SideBar
                chatList={chatList}
                selectedCurrentChat={handleChangeChat}
                setNewChatModal={setNewChatModal}
            />
            <div className="chat-container">
                <DialogHeader
                    chatTitle={currentChat.title}
                    setSaveLogModal={setSaveLogModal}
                />
                <Dialog messages={messages} />
                <DialogFooter sendMessage={handleSendMessage} />
            </div>
            {newChatModal && (
                <NewChatModal
                    setNewChatModal={setNewChatModal}
                    setNewChat={handleCreateNewChat}
                />
            )}
            {saveLogModal && (
                <SaveLogModal
                    setSaveLogModal={setSaveLogModal}
                    title={currentChat.title}
                />
            )}
        </div>
    );
}

export default App;
