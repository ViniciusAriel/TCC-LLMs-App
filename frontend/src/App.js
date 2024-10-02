import { React, useState } from "react";

import SideBar from "./components/sidebar/sideBar";
import Dialog from "./components/dialog/dialog";
import DialogHeader from "./components/dialogheader/dialogHeader";
import DialogFooter from "./components/dialogfooter/dialogFooter";
import NewChatModal from "./components/newchatmodal/newChatModal.js";

import "./App.css";

function App() {
    const [chatList, setChatList] = useState([
        { chatId: 1, chatTitle: "Chat 1", llm: "GPT", date: "20/09/2023" },
        { chatId: 2, chatTitle: "Chat 2", llm: "Mistral", date: "20/09/2023" },
        { chatId: 3, chatTitle: "Chat 3", llm: "Llma", date: "21/09/2023" },
        { chatId: 4, chatTitle: "Chat 4", llm: "Bloom", date: "21/09/2023" },
        { chatId: 5, chatTitle: "Chat 5", llm: "GPT", date: "22/09/2023" },
        { chatId: 6, chatTitle: "Chat 6", llm: "Mistral", date: "22/09/2023" },
        { chatId: 7, chatTitle: "Chat 7", llm: "Bloom", date: "23/09/2023" },
        { chatId: 8, chatTitle: "Chat 8", llm: "Mistral", date: "23/09/2023" },
        { chatId: 9, chatTitle: "Chat 9", llm: "GPT", date: "24/09/2023" },
    ]);

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
        id: 1,
        title: "Chat 1",
    });

    const [newChatModal, setNewChatModal] = useState(false);

    const handleSendMessage = (message) => {
        const newMessage = { fromChat: false, content: message };
        const newBotMessage = { fromChat: true, content: "Resposta do Chat" };
        setMessages([...messages, newMessage, newBotMessage]);
    };

    const handleCreateNewChat = (newChatInfo) => {
        setChatList([...chatList, newChatInfo]);
    };

    return (
        <div className="App">
            <SideBar
                chatList={chatList}
                selectedCurrentChat={setCurrentChat}
                setNewChatModal={setNewChatModal}
            />
            <div className="chat-container">
                <DialogHeader chatTitle={currentChat.title} />
                <Dialog messages={messages} />
                <DialogFooter sendMessage={handleSendMessage} />
            </div>
            {newChatModal && (
                <NewChatModal
                    setNewChatModal={setNewChatModal}
                    setNewChat={handleCreateNewChat}
                />
            )}
        </div>
    );
}

export default App;
