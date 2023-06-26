import React, { ReactNode } from 'react';
import { Popover, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface PopoverButtonProps {
  content: ReactNode;
}

const PopoverButton: React.FC<PopoverButtonProps> = ({ content }) => {
  return (
    <Popover content={content} title="">
      <Button style={{ marginTop: '-10px' }} icon={<QuestionCircleOutlined />} type="primary" />
    </Popover>
  );
};

export default PopoverButton;