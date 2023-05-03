/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from 'next/router'
import { useNavigate, useLocation } from "react-router-dom";
import Web3Modal from "web3modal";
import { Player } from '@livepeer/react';
import Image from 'next/image';
import { rgba } from 'polished';
import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';

import blenderPoster from '../../public/images/mominter_logo.png';
import fileNFT from "../../artifacts/contracts/Genic.sol/FileNFT.json";
import { fileShareAddress } from "../../config";

export default function ViewFiles() {
  const router = useRouter();
  //const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadfileNFT();
  }, []);
  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };
  
  const rpcUrl = "https://filecoin-hyperspace.chainstacklabs.com/rpc/v1";
   // const rpcUrl = "localhost";

  async function loadfileNFT() {
    const web3Modal = new Web3Modal({
      //network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(fileShareAddress, fileNFT.abi, signer);
    const data = await contract.fetchAllStorageItems();
    /*
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);

      const filename = i.fileName;
      console.log("Filename is ", filename);
      const created = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date created is ", created);
      const description = i.description;
      console.log("description is ", description);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        sharelink: getIPFSGatewayURL(meta.data.image),

      };
      console.log("item returned is ", item);
      return item;
    }));

    setNfts(items);
    setLoadingState("loaded");
  }

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  async function NewsDetails(nft) {
    console.log("item id clicked is", nft.tokenId);
    const vid = nft.tokenId;
    router.push({
        pathname: "/watch",
        query: {vid}
      });
      console.log('Prop result is ', { vid } )
  }

  const PosterImage = () => {
    return (
      <Image
        src={blenderPoster}
        layout="fill"
        objectFit="cover"
        priority
        placeholder="blur"
      />
    );
  };


  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div sx={styles.section}>
        <h1 className="px-20 py-10 text-3xl text-white">Empty drive, no file yet</h1>
      </div>
    );
  }
  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-blue-100 text-xl text-center text-black font-bold pt-5 pb-4">
        <h1> Video on Demand Gallery</h1>
      </div>
    <div className="flex justify-center bg-blue-100 mb-12">

      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {nfts.map((nft, i) => (

            <div key={i} className="shadow rounded-xl overflow-hidden border-2 border-white-500">
              
              <iframe
                title="fileNFT"
                height="auto"
                width="100%"
                objectfit="cover"
                src={`${nft.image}#toolbar=0&embedded=true`}
                className="py-3 object-cover h-500"
              />
              <div className="p-1">
                <p style={{ height: "45px", overflow: 'hidden' }} className="text-xl text-blue-800 font-semibold leading-none"> {nft.name}      </p>
                <div style={{ height: '100px', overflow: 'hidden' }}>
                    <p className="text-gray-700 pt-2">Description : {nft.description} </p>
                </div>
                
              </div>

              <div className="p-2 bg-black">
                <button type="button" className="mt-1 w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => NewsDetails(nft)}>Watch Video</button>
              </div>
              
              {/** onClick={() => share(nft)} */}
              <div className="p-2 bg-black">
              <Popup trigger={<button type="button" className="w-full bg-purple-700 text-white font-bold py-2 px-2 rounded" >Get Share Link</button>} 
                  position="bottom left">
                <div className=" bg-blue-200 text-black font-bold py-2 px-2 rounded">{nft.sharelink}</div>
                <button onClick={() => copyToClipBoard([nft.sharelink])}>Copy Link</button>
                
                 {copySuccess}
                </Popup>

                
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    </Box>
  );
}

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };
