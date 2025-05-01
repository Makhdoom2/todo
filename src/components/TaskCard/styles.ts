import styled from "styled-components";

export const StyledTaskCard = styled.div`
  cursor: pointer;
  background: linear-gradient(135deg, #f9fafb, #f3f4f6);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

export const Title = styled.h3`
  font-size: 22px;
  margin-bottom: 10px;
  color: #111827;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 6px 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const StatusTag = styled.span<{ status: string }>`
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: ${({ status }) =>
    status === "todo"
      ? "#e0f2fe"
      : status === "in-progress"
      ? "#fef9c3"
      : "#dcfce7"};
  color: ${({ status }) =>
    status === "todo"
      ? "#0284c7"
      : status === "in-progress"
      ? "#b45309"
      : "#15803d"};
  margin-top: 8px;
`;

export const PriorityTag = styled.span<{ priority: string }>`
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: ${({ priority }) =>
    priority === "low"
      ? "#ecfdf5"
      : priority === "medium"
      ? "#fef3c7"
      : "#fee2e2"};
  color: ${({ priority }) =>
    priority === "low"
      ? "#047857"
      : priority === "medium"
      ? "#b45309"
      : "#b91c1c"};
  margin-top: 8px;
  margin-left: 8px;
`;

export const DeleteIconButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  svg {
    color: #ef4444;
  }
`;
