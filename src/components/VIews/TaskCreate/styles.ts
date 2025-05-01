import styled from "styled-components";

export const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 30px auto;

  @media (max-width: 600px) {
    padding: 16px;
    margin: 20px 10px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #1f2937;

  @media (max-width: 600px) {
    font-size: 20px;
  }
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
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9fafb;

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 8px;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9fafb;

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 8px;
  }
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9fafb;
  resize: vertical;
  min-height: 100px;

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 8px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #10b981;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #059669;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px;
  }
`;
