import React from 'react';
import { List, Button, Checkbox, Card, Input } from 'antd';

export interface Duty {
  id: string;
  name: string;
  completed: boolean;
}

interface DutyListProps {
  duties: Duty[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEditStart: (id: string) => void;
  onEditCancel: () => void;
  editingId: string | null;
  onSave: (id: string, newName: string) => void;
}

export const DutyList: React.FC<DutyListProps> = ({ duties, onComplete, onDelete, onEditStart, onEditCancel, editingId, onSave }) => {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Existing Duties📖</h2>
      {duties.length > 0 ? (
        <List
          bordered
          dataSource={duties}
          renderItem={(duty) => (
            <List.Item actions={[<Button type="link" onClick={() => onDelete(duty.id)}>Delete 🗑</Button>]}>
              {editingId === duty.id ? (
                <Input
                  autoFocus
                  type="text"
                  defaultValue={duty.name}
                  onPressEnter={(e) => onSave(duty.id, e.currentTarget.value)}
                  onBlur={onEditCancel}
                />
              ) : (
                <div onDoubleClick={() => onEditStart(duty.id)}>
                  <Checkbox
                    checked={duty.completed}
                    onChange={() => onComplete(duty.id)}
                  >
                    {duty.name}
                  </Checkbox>
                </div>
              )}
            </List.Item>
          )}
        />
      ) : (
        <Card>
          <p style={{ textAlign: 'center' }}>There are no existing duties. 🧐📕</p>
        </Card>
      )}
    </>
  );
};
