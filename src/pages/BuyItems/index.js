import React, { useState, useEffect } from "react";
import {
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./BuyItemElements.js";
import { ethers } from "ethers";
import axios from "axios";
import { proxyAddress as address } from "../../contracts";
import abi from "../../contracts/Market.json";
import { Button } from "../../styles/globalStyles.js";
import { notifyError, notifyInfo, notifySuccess } from "../../helper/index.js";

const nftInterface = new ethers.utils.Interface(abi);

const BuyItem = (props) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(address, nftInterface, provider);
    const data = await contract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
  };

  const buyNft = async (nft) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, nftInterface, signer);

      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await notifyInfo("Please wait !", "Transaction being processed");
      await transaction.wait();
      await notifySuccess("Congratulations !", "You have purchased NFT");
      loadNFTs();
    } catch (error) {
      await notifyError("Oops !", "Something went wrong while buying");
      console.log(error);
    }
  };

  return (
    <ServicesWrapper>
      {nfts.map((nft, i) => (
        <ServicesCard>
          <ServicesIcon src={nft.image} />
          <ServicesH2>
            {nft.name} {nft.meta}
          </ServicesH2>
          <ServicesP style={{ marginTop: "10px" }}>{nft.description}</ServicesP>
          <ServicesP>
            Price: <span style={{ color: "darkgreen" }}>{nft.price} MATIC</span>
          </ServicesP>

          <Button onClick={() => buyNft(nft)} style={{ margin: "20px" }}>
            Buy
          </Button>
        </ServicesCard>
      ))}
    </ServicesWrapper>
  );
};

export default BuyItem;
