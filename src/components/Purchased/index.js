import React, { useState, useEffect } from "react";
import {
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "../../pages/BuyItems/BuyItemElements";
import { FormInput } from "../../pages/CreateItems/CreateItemsElements";
import { Button } from "../../styles/globalStyles";
import { ethers } from "ethers";
import axios from "axios";
import { proxyAddress as address } from "../../contracts";
import abi from "../../contracts/Market.json";
import { notifyError, notifyInfo, notifySuccess } from "../../helper";

const nftInterface = new ethers.utils.Interface(abi);

const Purchased = () => {
  const [nfts, setNfts] = useState([]);
  const [formInput, updateFormInput] = useState({ price: "" });

  useEffect(() => {
    loadNFTs();
  }, []);

  console.log(nfts);

  async function loadNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(address, nftInterface, signer);
    const data = await contract.fetchMyNFTs();

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

  const listNFTForSale = async (id, price) => {
    try {
      if (!price) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const priceFormatted = ethers.utils.parseUnits(price, "ether");
      let contract = new ethers.Contract(address, nftInterface, signer);

      let transaction = await contract.resellToken(id, priceFormatted);
      await notifyInfo("Please Wait", "Transaction is being processed");
      await transaction.wait();
      await notifySuccess(
        "Congratulations !",
        "You have successfully listed NFT"
      );
    } catch (error) {
      notifyError("Oops !", "Something went wrong while reselling");
      console.log(error);
    }
  };

  return (
    <ServicesWrapper>
      {nfts.map((nft, i) => (
        <ServicesCard key={i}>
          <ServicesIcon src={nft.image} />
          <ServicesH2>
            {nft.name} {nft.meta}
          </ServicesH2>
          <ServicesP style={{ marginTop: "10px" }}>{nft.description}</ServicesP>

          <FormInput
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
            placeholder="New price"
            type="number"
            style={{ width: "50%" }}
          />
          <Button
            onClick={() => listNFTForSale(nft.tokenId, formInput.price)}
            style={{ margin: "20px" }}
          >
            Resell
          </Button>
        </ServicesCard>
      ))}
    </ServicesWrapper>
  );
};

export default Purchased;
