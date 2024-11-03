import { React, useState, useEffect } from "react";
import axios from "axios";

import AlterPromptModal from "./components/alterpromptmodal/alterPromptModal.js";
import DeleteChatModal from "./components/deletechatmodal/deleteChatModal.js";
import Dialog from "./components/dialog/dialog.js";
import DialogHeader from "./components/dialogheader/dialogHeader.js";
import DialogFooter from "./components/dialogfooter/dialogFooter.js";
import NewChatModal from "./components/newchatmodal/newChatModal.js";
import SaveLogModal from "./components/savelogmodal/saveLogModal.js";
import SideBar from "./components/sidebar/sideBar.js";

import "./App.css";

function App() {
    const [chatList, setChatList] = useState([]);
    const [currentChat, setCurrentChat] = useState({
        id: null,
        title: "Crie um Chat",
    });
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [messages, setMessages] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [promptModal, setPromptModal] = useState(false);
    const [newChatModal, setNewChatModal] = useState(false);
    const [saveLogModal, setSaveLogModal] = useState(false);

    const handleNewChatAdded = () => {
        const chatId = chatList[chatList.length - 1].id;
        const chatTitle = chatList[chatList.length - 1].title;
        setCurrentChat({
            id: chatId,
            title: chatTitle,
        });
        handleChangeChat(chatId, chatTitle);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setChatList, chatList]);

    const handleChangeChat = (id, title) => {
        setCurrentChat({
            id: id,
            title: title,
        });
        axios
            .get(`http://127.0.0.1:8000/chat/${id}`)
            .then((response) => {
                setMessages(response.data.messages);
            })
            .catch((err) => console.log(err));
    };

    const handleSendMessage = (message) => {
        const tzoffset = new Date().getTimezoneOffset() * 60000;
        const localISOTime = new Date(Date.now() - tzoffset).toISOString();
        const newMessage = {
            content: message,
            sender_is_llm: false,
            sender_is_main_llm: false,
            date: localISOTime,
            chat: currentChat.id,
        };
        setMessages([...messages, newMessage]);
        axios
            .post(`http://127.0.0.1:8000/message/create`, newMessage)
            .then((response) => {
                console.log(response.data);
                setMessages([
                    ...messages,
                    response.data.user_message,
                    response.data.main_llm_response,
                    response.data.secondary_llm_response,
                ]);
            })
            .catch((err) => console.log(err));
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
                    setPromptModal={setPromptModal}
                    setDeleteModal={setDeleteModal}
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
                    currentChat={currentChat}
                />
            )}
            {promptModal && (
                <AlterPromptModal
                    setPromptModal={setPromptModal}
                    currentChat={currentChat}
                />
            )}
            {deleteModal && (
                <DeleteChatModal
                    setChatList={setChatList}
                    setDeletePrompt={setDeleteModal}
                    currentChat={currentChat}
                />
            )}
        </div>
    );
}

export default App;
