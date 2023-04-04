import {
  Avatar,
  Box,
  Button,
  Card,
  Icon,
  IconButton,
  Paper,
  Stack,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import LinkIcon from "@mui/icons-material/Link";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useRef, useState } from "react";
import CustomModal from "../CustomModal";

function CardAddPubBoard() {
  const [isHover, setIsHover] = useState(false);
  const [isCardClicked, setIsCardClicked] = useState(false);

  const fileInputRef = useRef(null);

  const [file, setFile] = useState();
  const [text, setText] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    //TODO: something with the file
    console.log(file);
  };

  const handleClickCard = () => {
    if (isCardClicked === false && isHover === false) {
      setIsHover(true);
      setIsCardClicked(true);
    }
  };

  const handleOpenModal = () => setOpenModal(true);

  return (
    <Card
      onClick={handleClickCard}
      sx={{
        pr: 2,
        pl: 2,
        pt: 1.3,
        pb: 1.3,
        "&:hover": !isHover && {
          backgroundColor: "lightgrey",
          cursor: "pointer",
        },
      }}
    >
      <CustomModal
        open={openModal}
        setOpen={setOpenModal}
        children=<Box>czeczec</Box>
      />
      {!isHover ? (
        <Stack direction="row">
          <Avatar
            sx={{
              mr: 2,
              backgroundColor: "blueviolet",
            }}
          />

          <Typography
            sx={{
              fontSize: "1rem",
              color: "grey",
              display: "flex",
              alignItems: "center",
            }}
          >
            Annoncer quelque chose a votre classe
          </Typography>
        </Stack>
      ) : (
        <Paper
          sx={{
            backgroundColor: "lightgrey",

            pt: 1.3,
            pb: 1.3,
            pr: 2,
            pl: 2,
          }}
        >
          <Stack spacing={1}>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "b",
                display: "flex",
                alignItems: "center",
              }}
            >
              Annoncer quelque chose a votre classe
            </Typography>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Ecrivez quelque chose..."
              minRows={10}
              maxRows={30}
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: "100%",
                resize: "none",
                outline: "none",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
            />
            {file && (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  pt: 1,
                  pb: 1,
                  pr: 2,
                  pl: 2,
                  alignItems: "center",
                }}
              >
                <Typography>{file.name}</Typography>
                <Avatar>
                  <Icon>
                    <PictureAsPdfIcon />
                  </Icon>
                </Avatar>
              </Stack>
            )}
            <Stack direction="row" spacing={1}>
              <>
                <Tooltip title="Importer un fichier">
                  <Avatar
                    sx={{
                      backgroundColor: "white",
                    }}
                  >
                    <IconButton onClick={handleUploadButtonClick}>
                      <UploadIcon
                        sx={{
                          color: "black",
                        }}
                      />
                    </IconButton>
                  </Avatar>
                </Tooltip>
                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                />
              </>
              <Tooltip title="Ajouter un lien">
                <Avatar
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  <IconButton onClick={handleOpenModal}>
                    <LinkIcon
                      sx={{
                        color: "black",
                      }}
                    />
                  </IconButton>
                </Avatar>
              </Tooltip>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Card>
  );
}

export default CardAddPubBoard;
