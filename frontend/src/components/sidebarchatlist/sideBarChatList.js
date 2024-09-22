import { React, useState, useEffect } from "react";

import SideBarChatItem from "../sidebarchatitem/sideBarChatItem";

import "./sideBarChatList.css";

export default function SideBarChatList({
    chatList,
    isClosed,
    selectedCurrentChat,
}) {
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
                                        selectedCurrentChat({
                                            id: chat.chatId,
                                            title: chat.chatTitle,
                                        });
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
