import React from "react";
import Modal from "@material-ui/core/Modal";

export const DisplayModal = ({ children = [] }) => {
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      position: "absolute",
      width: "75%",
      height: "75%",
      background: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  }

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Adding click handler to first child
  const action = React.cloneElement(children[0], { onClick: handleOpen });
  const content = React.cloneElement(children[1], { handleClose });

  return (
    <div>
      {action}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle}>
          {/* <div style={{ width: "75%", height: "75%", background: "aqua" }}> */}
          {content}
          {/* </div> */}
        </div>
      </Modal>
    </div>
  );
};
