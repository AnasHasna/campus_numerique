import React from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { MessageList, Input } from "react-chat-elements";
import { Button, Stack } from "@mui/material";

const teacherMessages = Array.from({ length: 10 }, (_, index) => ({
  position: "left",
  type: "text",
  title: "Teacher",
  text: `Message ${index + 1} from teacher`,
  date: new Date(new Date().getTime() - index * 60 * 1000), // set date to X minutes ago
}));

const studentMessages = Array.from({ length: 10 }, (_, index) => ({
  position: "right",
  type: "text",
  title: "Student",
  text: `Message ${index + 1} from student`,
  date: new Date(new Date().getTime() - index * 60 * 1000), // set date to X minutes ago
}));

const messages = [...teacherMessages, ...studentMessages].sort((a, b) => {
  return a.date.getTime() - b.date.getTime();
});

function ChatDetailsPage() {
  React.useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <CustomPageWithDrawer>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pb: 5,
        }}
      >
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={messages.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
          )}
        />
        <Input
          placeholder="Entrer un message..."
          multiline={true}
          rightButtons={
            <Button
              color="primary"
              variant="contained"
              sx={{
                height: "100%",
                borderRadius: "2",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#3f51b5",
                },
              }}
            >
              Envoyer
            </Button>
          }
        />
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default ChatDetailsPage;
