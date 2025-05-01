import styled from "styled-components";

export const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 30px auto;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #1f2937;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9fafb;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9fafb;
  resize: vertical;
  min-height: 100px;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9fafb;
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#d1d5db" : "#10b981")};
  color: ${({ disabled }) => (disabled ? "#6b7280" : "white")};
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#d1d5db" : "#059669")};
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #6b7280;
`;

export const BackArrow = styled.div`
  cursor: pointer;
  margin-bottom: 16px;
  color: #0070f3;
  &:hover {
    color: #005bb5;
  }
`;
