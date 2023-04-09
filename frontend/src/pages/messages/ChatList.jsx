import React from "react";
import { ChatList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useNavigate } from "react-router-dom";

const chats = [
  {
    avatar:
      "https://randomwordgenerator.com/img/picture-generator/tree-2127699_640.jpg",
    alt: "Reactjs",
    title: "BENSALTANA HASSAN",
    subtitle: "Bonjour monsieur",
    date: new Date(),
    unread: 0,
    dateString: "2 minute HHHH",
  },
  {
    avatar:
      "https://randomwordgenerator.com/img/picture-generator/tree-2127699_640.jpg",
    alt: "Reactjs",
    title: "BENSALTANA HASSAN",
    subtitle: "Bonjour monsieur",
    date: new Date(),
    unread: 0,
    dateString: "2 minute HHHH",
  },
  {
    avatar:
      "https://randomwordgenerator.com/img/picture-generator/tree-2127699_640.jpg",
    alt: "Reactjs",
    title: "BENSALTANA HASSAN",
    subtitle: "Bonjour monsieur",
    date: new Date(),
    unread: 0,
    dateString: "2 minute HHHH",
  },
  {
    avatar:
      "https://randomwordgenerator.com/img/picture-generator/tree-2127699_640.jpg",
    alt: "Reactjs",
    title: "BENSALTANA HASSAN",
    subtitle: "Bonjour monsieur",
    date: new Date(),
    unread: 0,
    dateString: "2 minute HHHH",
  },
  {
    avatar:
      "https://randomwordgenerator.com/img/picture-generator/tree-2127699_640.jpg",
    alt: "Reactjs",
    title: "BENSALTANA HASSAN",
    subtitle: "Bonjour monsieur",
    date: new Date(),
    unread: 0,
    dateString: "2 minute HHHH",
  },
];

function CustomChatList() {
  const navigate = useNavigate();

  const handleNavigateToChat = () => {
    navigate("1");
  };

  return (
    <ChatList
      className="chat-list"
      dataSource={chats}
      onClick={(e) => {
        handleNavigateToChat();
      }}
    />
  );
}

export default CustomChatList;
