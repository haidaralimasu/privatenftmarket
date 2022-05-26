import React, { useState, useEffect } from "react";
import {
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "../../pages/BuyItems/BuyItemElements";
import { ethers } from "ethers";
import axios from "axios";
import { proxyAddress as address } from "../../contracts";
import abi from "../../contracts/Market.json";

const nftInterface = new ethers.utils.Interface(abi);

const Created = (props) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    loadNFTs();
  }, []);

  console.log(nfts);

  async function loadNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(address, nftInterface, signer);
    const data = await contract.fetchItemsListed();

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
  }

  return (
    <ServicesWrapper>
      {nfts.map((nft, i) => (
        <ServicesCard key={i}>
          <ServicesIcon src={nft.image} />
          <ServicesH2>
            {nft.name} {nft.meta}
          </ServicesH2>
          <ServicesP style={{ marginTop: "10px" }}>{nft.description}</ServicesP>
        </ServicesCard>
      ))}
    </ServicesWrapper>
  );
};

export default Created;
