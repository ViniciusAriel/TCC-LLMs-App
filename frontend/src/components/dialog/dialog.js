import React from "react";

import TextBubble from "../textbubble/textBubble.js";

import "./dialog.css";

export default function Dialog() {
    const messages = [
        {
            fromChat: true,
            content:
                "CHAT 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec augue enim. Phasellus venenatis turpis at velit aliquet fringilla. Quisque aliquet euismod elit a molestie. In semper vestibulum aliquam. Suspendisse purus metus, consequat et mauris et, mattis laoreet mi. Nunc felis metus, rutrum in cursus hendrerit, bibendum quis eros. Phasellus nec pretium orci. Sed vitae dolor vulputate, venenatis tortor ac, ultrices est.",
        },
        {
            fromChat: false,
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec augue enim. Phasellus venenatis turpis at velit aliquet fringilla. Quisque aliquet euismod elit a molestie. In semper vestibulum aliquam. Suspendisse purus metus, consequat et mauris et, mattis laoreet mi. Nunc felis metus, rutrum in cursus hendrerit, bibendum quis eros. Phasellus nec pretium orci. Sed vitae dolor vulputate, venenatis tortor ac, ultrices est.",
        },
        {
            fromChat: true,
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec augue enim. Phasellus venenatis turpis at velit aliquet fringilla. Quisque aliquet euismod elit a molestie. In semper vestibulum aliquam. Suspendisse purus metus, consequat et mauris et, mattis laoreet mi. Nunc felis metus, rutrum in cursus hendrerit, bibendum quis eros. Phasellus nec pretium orci. Sed vitae dolor vulputate, venenatis tortor ac, ultrices est.",
        },
        {
            fromChat: false,
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec augue enim. Phasellus venenatis turpis at velit aliquet fringilla. Quisque aliquet euismod elit a molestie. In semper vestibulum aliquam. Suspendisse purus metus, consequat et mauris et, mattis laoreet mi. Nunc felis metus, rutrum in cursus hendrerit, bibendum quis eros. Phasellus nec pretium orci. Sed vitae dolor vulputate, venenatis tortor ac, ultrices est.",
        },
        {
            fromChat: true,
            content:
                "CHAT 5: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec augue enim. Phasellus venenatis turpis at velit aliquet fringilla. Quisque aliquet euismod elit a molestie. In semper vestibulum aliquam. Suspendisse purus metus, consequat et mauris et, mattis laoreet mi. Nunc felis metus, rutrum in cursus hendrerit, bibendum quis eros. Phasellus nec pretium orci. Sed vitae dolor vulputate, venenatis tortor ac, ultrices est.",
        },
        {
            fromChat: false,
            content:
                "USER: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec augue enim. Phasellus venenatis turpis at velit aliquet fringilla. Quisque aliquet euismod elit a molestie. In semper vestibulum aliquam. Suspendisse purus metus, consequat et mauris et, mattis laoreet mi. Nunc felis metus, rutrum in cursus hendrerit, bibendum quis eros. Phasellus nec pretium orci. Sed vitae dolor vulputate, venenatis tortor ac, ultrices est.",
        },
        {
            fromChat: true,
            content:
                "CHAT: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec augue enim. Phasellus venenatis turpis at velit aliquet fringilla. Quisque aliquet euismod elit a molestie. In semper vestibulum aliquam. Suspendisse purus metus, consequat et mauris et, mattis laoreet mi. Nunc felis metus, rutrum in cursus hendrerit, bibendum quis eros. Phasellus nec pretium orci. Sed vitae dolor vulputate, venenatis tortor ac, ultrices est.",
        },
        { fromChat: false, content: "USER: Lorem ipsum dolor sit amet" },
        { fromChat: true, content: "CHAT: Lorem ipsum dolor sit amet" },
        { fromChat: false, content: "USER: Lorem ipsum dolor sit amet" },
        { fromChat: true, content: "CHAT: Lorem ipsum dolor sit amet" },
        { fromChat: false, content: "USER: Lorem ipsum dolor sit amet" },
    ];

    return (
        <div className="dialog-container">
            {messages.map((message) => {
                return <TextBubble message={message} />;
            })}
        </div>
    );
}
