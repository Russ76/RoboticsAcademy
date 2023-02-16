import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export const LinterModal = () => {
  const [linterMessage, setLinterMessage] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const callback = (message) => {
      if (!message.data.linter) {
        setLinterMessage(["Code loaded"]);
      } else {
        let linterMessage = JSON.stringify(message.data.linter).split("\\n");
        console.log(linterMessage);
        setLinterMessage(linterMessage);
      }
      setOpenModal(true);
    };

    window.RoboticsExerciseComponents.commsManager.subscribe(
      [window.RoboticsExerciseComponents.commsManager.events.LINTER],
      callback
    );
    return () => {
      window.RoboticsExerciseComponents.commsManager.unsubscribe(
        [window.RoboticsExerciseComponents.commsManager.events.LINTER],
        callback
      );
    };
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {linterMessage.map((line) => (
          <Typography key={line}>{line}</Typography>
        ))}
      </Box>
    </Modal>
  );
};