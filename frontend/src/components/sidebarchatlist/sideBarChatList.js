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
                .map((date, index) => {
                    return (
                        <div className="chatlist-items" key={index}>
                            <h3>{date}</h3>
                            {chatsByDate[date]
                                .toReversed()
                                .map((chat, index) => {
                                    return (
                                        <SideBarChatItem
                                            key={index}
                                            mainLLm={chat.main_llm}
                                            comparedLlm={chat.secondary_llm}
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
