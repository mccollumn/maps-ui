import React from "react";
import Modal from "@material-ui/core/Modal";

export const AddLocationModal = () => {
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      position: "absolute",
    };
  }

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle}>
          <div style={{ width: "150px", background: "aqua" }}>
            Modal me this
          </div>
        </div>
      </Modal>
    </div>
  );
};
