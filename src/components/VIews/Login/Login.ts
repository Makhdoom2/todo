import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f2f4f8;
`;

export const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 28px;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 12px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;

  label {
    margin-bottom: 6px;
    display: block;
    font-weight: 500;
  }
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4338ca;
  }
`;

export const SignupText = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
`;

export const SignupLink = styled.span`
  color: #4f46e5;
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;

  &:hover {
    color: #3730a3;
  }
`;

export const Select = styled.select`
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
  background-color: white;
  appearance: none;
  background-size: 16px 16px;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;
