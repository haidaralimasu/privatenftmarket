import styled from "styled-components";

export const ServicesContainer = styled.div`
  max-height: 100vh;
  display: flex;
  margin: 1rem;
  border: 4px;
  width: 100vw;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: white;
  font-size: 1rem;

  @media screen and (max-width: 768px) {
    max-height: 100vh;
  }
  @media screen and (max-width: 480px) {
    max-height: 100vh;
  }
`;

export const ServicesWrapper = styled.div`
  max-width: 100%;
  margin: 50px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 16px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const ServicesCard = styled.div`
	background: white;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border-radius: 4px;
	max-height: 800px;
	padding: 30px;
	box-shadow: 0 1px 3px grey;
	transition: all 0.2s ease-in-out;

	&:hover{
		transform: scale(1.02)
		transition: all 0.2s ease-in-out;
	}
`;

export const ServicesIcon = styled.img`
  height: 60%;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export const ServicesH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: center;
`;
