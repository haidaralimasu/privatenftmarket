import styled from "styled-components";

export const CreateItemsSection = styled.div`
  padding: 100px 0 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
`;

export const CreateItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  @media screen and (max-width: 960px) {
    margin: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const CreateItemsHeading = styled.h1`
  color: black;
  font-size: 48px;
  margin-top: -30px;
  margin-bottom: 24px;
`;

export const CreateItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column
  align-items: center;
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 820px) {
    flex-direction: column;
    width: 80%;
  }
`;

export const FormInput = styled.input`
  padding: 10px 20px;
  border-radius: 2px;
  margin-top: 20px;
  outline: none;
  width: 80vw;
  border: none;
  font-size: 16px;
  border: 1px solid black;
  &::placeholder {
    color: #242424;
  }
  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;

export const FormTextArea = styled.textarea`
  padding: 20px 20px;
  border-radius: 2px;
  margin-top: 20px;
  outline: none;
  width: 80vw;
  border: none;
  font-size: 16px;
  border: 1px solid black;
  &::placeholder {
    color: #242424;
  }
  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;
export const MintButton = styled.button`
  border-radius: 4px;
  background: black;
  white-space: nowrap;
  width: 80vw;
  margin-top: 20px;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: #2a2a2a;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;
