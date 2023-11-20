import React from 'react';
import { Button, message } from 'antd';

const MessagePopup = (content) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: type,
      content: content,
      duration: 10,
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={success}>Customized display duration</Button>
    </>
  );
};

export default MessagePopup;