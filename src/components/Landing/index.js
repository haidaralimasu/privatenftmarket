import React from "react";
import hero from "../../images/hero.svg";
import { Container, Button } from "../../styles/globalStyles";
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img,
} from "./InfoSectionElements";
import { useEthers } from "@usedapp/core";
import { notifyWarning } from "../../helper";

function Landing({ primary, lightTextDesc, alt, start }) {
  const { activateBrowserWallet } = useEthers();

  const onError = () => {
    notifyWarning("Wrong Network !", "Please connect to Polygon Mainnet");
  };

  return (
    <>
      <InfoSec lightBg={true}>
        <Container>
          <InfoRow imgStart="">
            <InfoColumn>
              <TextWrapper>
                <TopLine lightTopLine={false}></TopLine>
                <Heading lightText={false}>Private NFT Marketplace</Heading>
                <Subtitle lightTextDesc={lightTextDesc}>
                  Please Connect to get started
                </Subtitle>

                <Button
                  onClick={() => activateBrowserWallet(onError)}
                  big
                  fontBig
                  primary={primary}
                >
                  Connect
                </Button>
              </TextWrapper>
            </InfoColumn>
            <InfoColumn>
              <ImgWrapper start={start}>
                <Img src={hero} alt={alt} />
              </ImgWrapper>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  );
}

export default Landing;
