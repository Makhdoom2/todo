import styled from "styled-components";

export const Container = styled.div`
  /* border: 1px solid red; */
  padding: 40px;
  max-width: 800px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const SubText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// export const CreateButton = styled.button`
//   padding: 12px 20px;
//   background-color: #4f46e5;
//   color: white;
//   font-size: 16px;
//   font-weight: 600;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   margin-bottom: 30px;

//   &:hover {
//     background-color: #3730a3;
//   }

//   @media (max-width: 768px) {
//     padding: 10px 16px;
//     font-size: 14px;
//   }
// `;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const UserName = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const UserRole = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #dc2626;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

export const TaskListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const TaskListTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const CreateButton = styled.button`
  padding: 10px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4338ca;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;
