import { React } from "react";

import SideBarChatItem from "../sidebarchatitem/sideBarChatItem.js";

import "./sideBarChatList.css";

export default function SideBarChatList({
    chatList,
    isClosed,
    selectedCurrentChat,
}) {
    const chatsByDate = chatList.reduce((groupedChats, chat) => {
        const date = new Date(chat.date).toLocaleDateString("pt-BR");
        if (!groupedChats[date]) {
            groupedChats[date] = [];
        }
        groupedChats[date].push(chat);
        return groupedChats;
    }, {});

    return (
        <div className={`chatlist-container ${isClosed ? "close" : ""}`}>
            {Object.keys(chatsByDate)
                .toReversed()
                .map((date) => {
                    return (
                        <div className="chatlist-items">
                            <h3>{date}</h3>
                            {chatsByDate[date].toReversed().map((chat) => {
                                return (
                                    <SideBarChatItem
                                        llm={chat.llm}
                                        chatTitle={chat.title}
                                        isClosed={isClosed}
                                        onClick={() => {
                                            selectedCurrentChat(
                                                chat.id,
                                                chat.title,
                                                false
                                            );
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
