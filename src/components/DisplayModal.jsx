import React from "react";
import Modal from "@material-ui/core/Modal";

export const DisplayModal = ({
  children = [],
  height = "75%",
  width = "75%",
}) => {
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      position: "absolute",
      width: width,
      height: height,
      background: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  }

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
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
        <div style={modalStyle}>{content}</div>
      </Modal>
    </div>
  );
};
