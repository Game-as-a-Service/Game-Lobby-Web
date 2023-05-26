import React, { useState, FC } from "react";
import Button from "../Button";
import Modalow from "@/shared/components/Modalow/Modalow";

const Example: FC = () => {
  const [open, setOpen] = useState(true);

  const onSubmit = () => {};
  const button = (
    <>
      <Button variant="primary" onClick={() => setOpen((pre) => !pre)}>
        取消
      </Button>
      <Button variant="primary" onClick={onSubmit}>
        開設新房間
      </Button>
    </>
  );
  return (
    <>
      <Button onClick={() => setOpen((pre) => !pre)}>Toggle</Button>
      <Modalow
        hasTitle={true}
        footer={button}
        fullScreen={false}
        maskClosable={false}
        isOpen={open}
        title={"asdasd"}
        hideCloseIcon={false}
        onClose={() => {
          setOpen((pre) => !pre);
        }}
        size="extraLarge"
      >
        <div>123</div>
      </Modalow>
    </>
  );
};

export default Example;
