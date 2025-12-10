import { useState } from "react";
import { Modal, ActionIcon } from "@mantine/core";
import { IconPalette } from "@tabler/icons-react";
import ThemeSettingsPanel from "./ThemeSettingsPanel";

export default function ThemeSettingsModalTrigger() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ActionIcon
        variant="light"
        title="Theme Settings"
        onClick={() => setOpened(true)}
      >
        <IconPalette size={20} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Theme Settings"
        centered
      >
        <ThemeSettingsPanel />
      </Modal>
    </>
  );
}