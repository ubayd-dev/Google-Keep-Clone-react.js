import React, { useState } from "react";
import { Modal, DatePicker, message, Button } from "antd";
import dayjs from "dayjs";
import { useReminderContext } from "../../context/ReminderContext.js";

const ReminderModal = ({ open, onClose, note }) => {
  const [remindAt, setRemindAt] = useState(null);
  const { createReminder } = useReminderContext();

   const user = JSON.parse(localStorage.getItem("user"));
const userEmail = user?.email; // gets the logged-in user's email



  const handleSave = async () => {
    if (!remindAt) {
      message.error("Please select a date and time");
      return;
    }

    await createReminder({
      noteId: note.id,
      remindAt,
      email: userEmail,
        title: note.title,

    });

    message.success("Reminder set successfully!");
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={`Set Reminder for "${note?.title || "Untitled"}"`}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save Reminder
        </Button>,
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <DatePicker
          showTime
          style={{ width: "100%" }}
          value={remindAt ? dayjs(remindAt) : null}
          onChange={(date) => setRemindAt(date.toISOString())}
        />
      </div>
    </Modal>
  );
};

export default ReminderModal;
