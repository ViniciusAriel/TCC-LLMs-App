import { React, useState, useEffect } from "react";
import axios from "axios";

import AlterPromptModal from "./components/alterpromptmodal/alterPromptModal.js";
import DeleteChatModal from "./components/deletechatmodal/deleteChatModal.js";
import Dialog from "./components/dialog/dialog.js";
import DialogHeader from "./components/dialogheader/dialogHeader.js";
import DialogFooter from "./components/dialogfooter/dialogFooter.js";
import EvaluationModal from "./components/evaluationmodal/evaluationModal.js";
import MetricsInfoModal from "./components/metricsinfomodal/metricsInfoModal.js";
import NewChatModal from "./components/newchatmodal/newChatModal.js";
import UploadLogModal from "./components/uploadlogmodal/uploadLogModal.js";
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
    const [evaluationModal, setEvaluationModal] = useState(false);
    const [promptModal, setPromptModal] = useState(false);
    const [metricInfoModal, setMetricInfoModal] = useState(false);
    const [newChatModal, setNewChatModal] = useState(false);
    const [saveLogModal, setSaveLogModal] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);

    const handleNewChatAdded = () => {
        const chat = chatList[chatList.length - 1];
        setCurrentChat({
            id: chat.id,
            title: chat.title,
            main_llm: chat.main_llm,
            secondary_llm: chat.secondary_llm,
        });
        handleChangeChat(
            chat.id,
            chat.title,
            chat.main_llm,
            chat.secondary_llm
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setChatList, chatList]);

    const handleChangeChat = (id, title, main_llm, secondary_llm) => {
        setCurrentChat({
            id: id,
            title: title,
            main_llm: main_llm,
            secondary_llm: secondary_llm,
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
                setMetricInfoModal={setMetricInfoModal}
                setNewChatModal={setNewChatModal}
                setUploadModal={setUploadModal}
            />
            <div className="chat-container">
                <DialogHeader
                    chat={currentChat}
                    setSaveLogModal={setSaveLogModal}
                    setPromptModal={setPromptModal}
                    setDeleteModal={setDeleteModal}
                    setEvaluationModal={setEvaluationModal}
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
            {evaluationModal && (
                <EvaluationModal
                    setEvaluationModal={setEvaluationModal}
                    currentChat={currentChat}
                />
            )}
            {uploadModal && <UploadLogModal setUploadModal={setUploadModal} />}
            {metricInfoModal && (
                <MetricsInfoModal setMetricInfoModal={setMetricInfoModal} />
            )}
        </div>
    );
}

export default App;
