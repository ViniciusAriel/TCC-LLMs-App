import { React, useState, useEffect } from "react";
import axios from "axios";

import SideBar from "./components/sidebar/sideBar.js";
import Dialog from "./components/dialog/dialog.js";
import DialogHeader from "./components/dialogheader/dialogHeader.js";
import DialogFooter from "./components/dialogfooter/dialogFooter.js";
import NewChatModal from "./components/newchatmodal/newChatModal.js";
import SaveLogModal from "./components/savelogmodal/saveLogModal.js";

import "./App.css";

function App() {
    const [chatList, setChatList] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const [messages, setMessages] = useState([]);

    const [currentChat, setCurrentChat] = useState({
        id: null,
        title: "Crie um Chat",
    });

    const [newChatModal, setNewChatModal] = useState(false);
    const [saveLogModal, setSaveLogModal] = useState(false);

    const handleNewChatAdded = () => {
        setCurrentChat({
            id: chatList[chatList.length - 1].id,
            title: chatList[chatList.length - 1].title,
        });
        handleChangeChat(
            chatList[chatList.length - 1].id,
            chatList[chatList.length - 1].title,
            true
        );
    };

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/user/1`)
            .then((response) => {
                setChatList(response.data.chats);
            })
            .catch((err) => console.log(err));
        setIsFirstRender(false);
    }, []);

    useEffect(() => {
        if (!isFirstRender) {
            if (chatList.length === 0) setNewChatModal(true);
            else handleNewChatAdded();
        }
    }, [setChatList, chatList]);

    const handleChangeChat = (id, title, isNewChat) => {
        setCurrentChat({
            id: id,
            title: title,
        });
        if (isNewChat) {
            setMessages([]);
        } else {
            setMessages([]);
            axios
                .get(`http://127.0.0.1:8000/chat/${id}`)
                .then((response) => {
                    setMessages(response.data.messages);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleSendMessage = (message) => {
        var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = new Date(Date.now() - tzoffset).toISOString();
        const newMessage = {
            content: message,
            sender_is_llm: false,
            date: localISOTime,
            chat: currentChat.id,
        };
        axios
            .post(`http://127.0.0.1:8000/message/create`, newMessage)
            .then((response) => {
                console.log(localISOTime);
                console.log(response.data);
            })
            .catch((err) => console.log(err));
        // TODO: API ENVIAR MENSAGEM PARA O BANCO E SALVAR
        setMessages([...messages, newMessage]);
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
