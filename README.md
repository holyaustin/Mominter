# Mominter : : Decentralized Video Moment Minter

A DApp to allow the user(host) to mint moments as NFT using the contracts deployed on FVM

![Mominter](https://bafkreibsvdrhg4xrmdeujrz33smda7rziayuzpxb5cggcp4o5633sn4c2a.ipfs.nftstorage.link/)

## Introduction

StremaGenic is a web3 video project with the aim of helping creators publish video news files and share them easily while owning their content and making money from it. This project intends to build a web3 news for everyone around the globe. Users that are Eye witness to events, captures them and publish on the new platform.
News / Contents can also be streamed live through Livepeers streams. It uses the open zeppelin ERC721 standard, Files are store to IPFS / Filecoin using W3UI and  file metadata URI stored on Polygon Mumbai testnet which is an Ethereum scaling and POS. Upon retrieval, video is access and transcoded with livepeer.js.
Polygon Blockchain was the best choice for deployment to its speed and to reduce the cost of transactions while interacting with the blockchain. Lit was used for encryption, ENS for reverse name lookup, Huddle for conference meeting and XMTP for chat and interaction. NFTPort was uded to send Milestone rewards when a video hit certain number of views.

## Web 3.0 technologies Used

Frontend: NextJS, postcss, tailwindcss, Theme

Web3 technologies: IPFS/filecoin (W3UI), Livepeer (livepeer.js), Web3Modal,  NFT Port, ENS, Lit Protocol, Filecoin (Hyperspace), Graph, LightHouse, Huddle01  
Backend: Solidity, Node.js

Blockchain deployed to:  Filecoin (Hyperspace) Testnet

## Description

This project was made using several technologies. The front-end was designed using a server-side-rendering javascript tech known as NextJS. the latest version of Next was used because of how fast it was to build the project.  IPFS / Filecoin's W3UI from Web3.Storage was used to store user's video on their decentralized storage. videos of various news can be viewed on demand. They can share these Videos to anyone through a sharing mechansism that is easy to copy out the sharing IPFS URL.
XMTP is used for wallet to wallet messaging using the XMTP SDK. Huddle01 was used for conference meeting.

The smart contract uses ERC-721 specification to hold metadata URI, ethers.js was used to interact with the smart contract. The contract was deployed to Mumbai blockchain. The entire project demo was hosted to Vercel.

## Live DApp hosted on

Live Dapp on Vercel: - <https://mominter.vercel.app/>

Deployed to Polygon Chain:
  Filecoin (Hyperspace) Testnet deployed Address = "0xa199AB87E3787C67f5286d78f527B1426f022eeD"

  <http://mumbai.polyscan.com/#/contract/0x92b3556042052c12c962bEf9aCcad837405130a8>

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