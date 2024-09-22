import { React, useState, useEffect } from "react";

import SideBar from "./components/sidebar/sideBar";
import Dialog from "./components/dialog/dialog";
import DialogHeader from "./components/dialogheader/dialogHeader";
import DialogFooter from "./components/dialogfooter/dialogFooter";

import "./App.css";

function App() {
    const chatList = [
        { chatId: 1, chatTitle: "Chat 1", date: "20/09/2023" },
        { chatId: 2, chatTitle: "Chat 2", date: "20/09/2023" },
        { chatId: 3, chatTitle: "Chat 3", date: "21/09/2023" },
        { chatId: 4, chatTitle: "Chat 4", date: "21/09/2023" },
        { chatId: 5, chatTitle: "Chat 5", date: "22/09/2023" },
        { chatId: 6, chatTitle: "Chat 6", date: "22/09/2023" },
        { chatId: 7, chatTitle: "Chat 7", date: "23/09/2023" },
        { chatId: 8, chatTitle: "Chat 8", date: "23/09/2023" },
        { chatId: 9, chatTitle: "Chat 9", date: "24/09/2023" },
        { chatId: 10, chatTitle: "Chat 10", date: "24/09/2023" },
    ];

    const [currentChat, setCurrentChat] = useState({
        id: 1,
        title: "Chat Inicial",
    });

    return (
        <div className="App">
            <SideBar chatList={chatList} selectedCurrentChat={setCurrentChat} />
            <div className="chat-container">
                <DialogHeader chatTitle={currentChat.title} />
                <Dialog />
                <DialogFooter />
            </div>
        </div>
    );
}

export default App;
