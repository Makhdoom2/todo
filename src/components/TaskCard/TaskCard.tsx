import React from "react";
import { FiX } from "react-icons/fi";
import {
  DeleteIconButton,
  InfoText,
  PriorityTag,
  StatusTag,
  StyledTaskCard,
  Title,
} from "./styles";
import { Task } from "@/types/task";

type Props = {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (e: React.MouseEvent, taskId: string) => void;
};

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete }) => {
  return (
    <StyledTaskCard onClick={() => onEdit(task.id)}>
      <DeleteIconButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete(e, task.id);
        }}
      >
        <FiX size={18} />
      </DeleteIconButton>

      <Title>{task.title}</Title>

      {task.description && <InfoText>{task.description}</InfoText>}

      <InfoText style={{ marginTop: "15px" }}>
        Assigned to: {task?.assignedTo?.name || "Unassigned"}
      </InfoText>
      <InfoText>Due date: {task.dueDate || "No due date"}</InfoText>

      <div style={{ marginTop: "8px" }}>
        <StatusTag status={task.status}>{task.status}</StatusTag>
        {task?.priority && (
          <PriorityTag priority={task.priority}>{task.priority}</PriorityTag>
        )}
      </div>
    </StyledTaskCard>
  );
};

export default TaskCard;
