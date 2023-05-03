# Mominter : : Decentralized Video Moment Minter

A DApp to allow the user(host) to mint moments as NFT using the contracts deployed on FVM

![Mominter](https://bafkreibsvdrhg4xrmdeujrz33smda7rziayuzpxb5cggcp4o5633sn4c2a.ipfs.nftstorage.link/)

## Introduction

Mominter is a web3 video project with the aim of helping creators publish exciting video Moments as NFTs  and share them easily while owning their content and possibly making money from it. This project intends to build a web3 Momnet Gallery for everyone around the globe. Users can use the Huddle01 video streaming to record presentation and mint them while storing the Video files on IPFS and Metadata on Filecoin Blockchain. 
Contents can also be streamed live through Huddle01 Live Presentation SDK streams. We use the open zeppelin ERC721 standard, Files are store to IPFS / Filecoin using NFT.Storage and  file metadata URI stored on Filecoin Hyperspace Testnet which is FEVM . Upon retrieval, . Lighthouse was used to used for encryption and most important, the Access control of Light hoise was used to grant access to member with the membership NFT, Huddle for conference meeting and XMTP for chat and interaction.

## Web 3.0 technologies Used

Frontend: NextJS, postcss, tailwindcss, Theme

Web3 technologies: LightHouse, Huddle01,  IPFS/filecoin, Livepeer (livepeer.js), Web3Modal,  Filecoin (Hyperspace), 
Backend: Solidity, Node.js

Blockchain deployed to:  Filecoin (Hyperspace) Testnet

## Description

This project was made using several technologies. The front-end was designed using a server-side-rendering javascript tech known as NextJS. the latest version of Next was used because of how fast it was to build the project.  IPFS / Filecoin's NFT.Storage was used to store user's video on their decentralized storage. videos of various news can be viewed on demand. They can share these Videos to anyone through a sharing mechansism that is easy to copy out the sharing IPFS URL. Huddle01 for video streaming ND CONFERENCE MEETING. Huddle01 was used for conference meeting.

The smart contract uses ERC-721 specification to hold metadata URI, ethers.js was used to interact with the smart contract. The contract was deployed to Filecoin Hyperspace blockchain. The entire project demo was hosted to Vercel.

## Live DApp hosted on

Live Dapp on Vercel: - <https://mominter.vercel.app/>

Deployed to Polygon Chain:
  Filecoin (Hyperspace) Testnet deployed Address = "0x4e75D8F85ED40aA3f73fB751b1Dfa07DEFe09C94"

  <https://hyperspace.filfox.info/en/address/0x4e75D8F85ED40aA3f73fB751b1Dfa07DEFe09C94>

 Youtube video link: <https://youtu.be/kZvxCGMPci8>

## Getting Started

First, run the development server:

```text
clone the repo https://github.com/holyaustin/Mominter.git
# next is to 
npm install
# then
npm run dev
# or
yarn dev
```

Open [http://localhost:3016](http://localhost:3016) with your browser to see the result.

## How to run this project locally

Try running some of the following tasks:

Fork this repo using

git clone <https://github.com/holyaustin/Mominter.git>

cd soldier-ant-colony

npx hardhat node

npx hardhat run scripts/deploy.js --network localhost

npm run build

## How to deploy to Filecoin  blockchain, update hardhat.config

npx hardhat run scripts/deploy.js --network testnet

## Connect with me and send me a mail

E-mail - holyaustin@yahoo.com

stay connected on twitter @holyaustin

https://live-par-1-abr-cdn.livepush.io/live_abr_cdn/emaIqCGoZw-6/index.m3u8

https://hyperspace.filfox.info/en/address/0xa6d6f4556b022c0c7051d62e071c0acece5a1228