import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import "./CreateGiftModal.scss";

import MultipleSelectButton from "./MultipleSelectButton";
import WarningAlert from "./WarningAlert";
import { createGift } from "../services/gift";

export default function CreateGiftModal(props) {
  const { setSelectedEventId, selectedEventId } = props;
  const [openWarningAlert, setOpenWarningAlert] = useState(false);
  const [openGiftModal, setOpenGiftModal] = useState(false);
  const [giftInfo, setGiftInfo] = useState({
    event_id: selectedEventId,
    gift_name: "",
    price: 0,
    notes: "",
    store_url: "",
    quantity: 1,
    most_wanted: false
  });

  const onCancel = () => {
    setGiftInfo({
      event_id: selectedEventId,
      gift_name: "",
      price: 0,
      notes: "",
      store_url: "",
      quantity: 1,
      most_wanted: false
    })
    setOpenGiftModal(false);
  };

  const handleCreateGift = async () => {
    if (selectedEventId === 0) {
      return;
    }
    try {
      if (giftInfo.gift_name === "") {
        setOpenWarningAlert(true);
        return;
      }
      // if (giftInfo.store_url !== "http") {
        //setOpenWarningAlert(true); // <- change alert wording
        //return;
      // }
      await createGift(giftInfo);
      onCancel();
    } catch (e) {
      console.log("error:", e);
    }
  };

  const handleSelectEvent = (event_id) => {
    setSelectedEventId(event_id);
  };

  return (
    <div className="wishlist">
      <div className="add-gift-btn">
        <Button
          variant="contained"
          onClick={() => {
            setOpenGiftModal(true);
          }}
        >
          <h5>Add Gift</h5>
        </Button>
      </div>
      {openGiftModal && (
        <Modal
          open={true}
          onClose={onCancel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="create-gift-modal">
            <Button className="close-button" onClick={onCancel}>
              X
            </Button>

            <div>Add Gift </div>
            <div className="create-gift-form">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <MultipleSelectButton
                  onChange={handleSelectEvent}
                  selectedEventId={selectedEventId}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="What would you like? (required)"
                  placeholder="Chocolate!!"
                  multiline
                  maxRows={4}
                  value={giftInfo.gift_name}
                  onChange={(event) =>
                    setGiftInfo({
                      ...giftInfo,
                      gift_name: event.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
                <TextField
                  id="outlined-textarea"
                  label="Website Link (optional)"
                  placeholder="http://...."
                  href={giftInfo}
                  value={giftInfo.store_url}
                  onChange={(event) =>
                    setGiftInfo({
                      ...giftInfo,
                      store_url: event.target.value,
                    })
                  }
                  multiline
                />
                <TextField
                  id="outlined-textarea"
                  label="Notes (optional)"
                  placeholder="no white chocolate >:("
                  value={giftInfo.notes}
                  onChange={(event) =>
                    setGiftInfo({ ...giftInfo, notes: event.target.value })
                  }
                  multiline
                />
                <TextField
                  id="outlined-name"
                  label="Price (optional)"
                  placeholder="$"
                  value={giftInfo.price}
                  onChange={(event) =>
                    setGiftInfo({ ...giftInfo, price: event.target.value })
                  }
                />
                <TextField
                  id="outlined-name"
                  label="Quantity (required)"
                  placeholder="Number"
                  value={giftInfo.quantity}
                  onChange={(event) =>
                    setGiftInfo({ ...giftInfo, quantity: event.target.value })
                  }
                />
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={giftInfo.most_wanted}
                        className="d-block"
                      />
                    }
                    label="Most Wanted"
                    defaultValue={false}
                    onChange={(event) =>
                      setGiftInfo({ ...giftInfo, most_wanted: true })
                    }
                  />
                </div>
              </Box>
              <div className="modal-buttons">
                <Stack direction="row" spacing={2}>
                  <div>
                    <div id="gift-alert">
                      {openWarningAlert && <WarningAlert />} 
                    </div>
                    <Button variant="outlined" onClick={handleCreateGift}>
                      ADD
                    </Button>                    
                  </div>
                </Stack>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
