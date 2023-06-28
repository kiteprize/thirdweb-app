import { config } from "dotenv";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { readFileSync } from "fs";

config();

const main = async () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("No private key found");
  }
  try {
    const sdk = new ThirdwebSDK("mumbai");
    const contract = await sdk.getContract("0x8dD6556DCC4aB77bB9fe3D19523b4e14BD92Dd17");
    
    const metadata = {
      name: "SOOKJAI NFT by Amazing Thailand #1",
      attributes: [
          {
              "trait_type": "HEAD",
              "value": "Sports Hair Band YL"
          },
          {
              "trait_type": "EMOTION",
              "value": "Angry"
          },
          {
              "trait_type": "FACE",
              "value": "Lollipop RD"
          },
          {
              "trait_type": "TOP",
              "value": "Rain Coat GR"
          },
          {
              "trait_type": "BODY",
              "value": "Portable Fan NV"
          },
          {
              "trait_type": "BACK",
              "value": "Ukulele Wood"
          },
          {
              "trait_type": "BACKGROUND",
              "value": "Purple"
          }
      ],
      image: readFileSync("assets/STTAT_00001.png"), // This can be an image url or file
    };

    const tx = await contract.erc721.mint(metadata);
    const receipt = tx.receipt; // the transaction receipt
    const tokenId = tx.id; // the id of the NFT minted
    const nft = await tx.data(); // (optional) fetch details of minted NFT

    console.log("Created batch successfully!\n", "recipt", receipt, "tokenId", tokenId, "nft", nft);
  } catch (e) {
    console.error("Something went wrong: ", e);
  }
};

main();
