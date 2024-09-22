import { React, useState, useEffect } from "react";

import SideBarChatItem from "../sidebarchatitem/sideBarChatItem";

import "./sideBarChatList.css";

export default function SideBarChatList({ chatList }) {
    const [currentChat, setCurrentChat] = useState(null);
    
    useEffect(() => {
        console.log(currentChat);
    }, [currentChat]);

    const chatsByDate = chatList.reduce((groupedChats, chat) => {
        const date = chat.date;
        if (!groupedChats[date]) {
            groupedChats[date] = [];
        }
        groupedChats[date].push(chat);
        return groupedChats;
    }, {});

    return (
        <div className="chatlist-container">
            {Object.keys(chatsByDate).map((date) => {
                return (
                    <div className="chatlist-items">
                        <h3>{date}</h3>
                        {chatsByDate[date].map((chat) => {
                            return (
                                <SideBarChatItem
                                    chatTitle={chat.chatTitle}
                                    onClick={() => {
                                        setCurrentChat(chat.chatId);
                                    }}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
