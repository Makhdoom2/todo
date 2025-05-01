import styled from "styled-components";

export const TaskContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.6);
  padding: 20px 20px 20px 0px;

  @media (max-width: 768px) {
    padding: 10px 5px;
    gap: 16px;
  }
`;

export const ButtonGroup = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 12px;
`;

export const Button = styled.button`
  background-color: #6366f1;
  color: white;
  font-size: 14px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: #4f46e5;
    transform: scale(1.05);
  }

  &:last-child {
    background-color: #ef4444;

    &:hover {
      background-color: #dc2626;
    }
  }
`;

////

export const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#6366f1" : "#f3f4f6")};
  color: ${({ active }) => (active ? "white" : "#374151")};
  font-size: 14px;
  padding: 8px 14px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#4f46e5" : "#e5e7eb")};
    transform: scale(1.05);
  }
`;
