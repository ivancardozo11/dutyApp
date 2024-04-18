import React from 'react';
import { Button, Input, Form } from 'antd';
import { addDuty } from '../api/apiClient';
import { Duty } from './DutyList';

interface DutyFormProps {
  onDutiesUpdated: (newDuty: Duty) => void;
}

const DutyForm: React.FC<DutyFormProps> = ({ onDutiesUpdated }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: { dutyName: string }) => {
    try {
      const newDuty = await addDuty(values.dutyName);
      console.log('Duty added:', newDuty);
      onDutiesUpdated(newDuty);
      form.resetFields();
    } catch (error) {
      console.error('Error when adding duty:', error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} style={{ margin: '20px' }}>
      <Form.Item
        label="Task Name"
        name="dutyName"
        rules={[{ required: true, message: 'Please input your task name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DutyForm;
