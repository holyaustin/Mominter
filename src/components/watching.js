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
import ShareLink from "react-twitter-share-link";
import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';

import blenderPoster from '../../public/images/logoonlyblue.png';
import fileNFT from "../../artifacts/contracts/Genic.sol/FileNFT.json";
import { fileShareAddress } from "../../config";

const containerStyle = {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  paddingTop: "56.25%", /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
};
const responsiveIframe = {
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  right: "0",
  width: "100%",
  height: "100%",
};

export default function Watching() {
  console.log('Entered watching component');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [ensName, setEnsName] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadVideo();
    loadCount();
    console.log("Counter executed")
  }, []);

  const getId = (props) => {
    console.log(props);
    return props;
  };

  async function Live() {
    router.push("/dashboardLive");
  }
  async function Claim() {
    alert("This feature is under development because we want to give you the best expereince");
  }

  async function getENSName() {
    const address = owners;
    const RPC2 = "https://eth.llamarpc.com";
    const provider = new ethers.providers.JsonRpcProvider(RPC2);
    const ename = await provider.lookupAddress(address); 
    console.log("ENS name is ", ename)
    return ename;
    
  }

  const rpcUrl = "https://matic-mumbai.chainstacklabs.com";
   // const rpcUrl = "localhost";

   const { query: vid } = router; 
   const props =  vid ;
   console.log('Props result is without ', props.vid);

  async function loadVideo() {
    /* create a generic provider and query for items */
    console.log("loading News for item", props.vid);
    const vid = props.vid;
    console.log("vid is ", vid);

    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(fileShareAddress, fileNFT.abi, signer);
    const data = await contract.fetchOneNews(vid);
    const data2 = await contract.fetchViews(vid);

    /*
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      console.log("inside data mapping");
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = tokenUri;
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(tokenUri);
      
      //getENSName();

      const count = (data2.toNumber())+1
      console.log("News data fetched from contract");
      console.log("data2 value is ", data2);
      console.log("count value is ", count);
      const filename = i.fileName;
      console.log("Filename is ", filename);
      const created = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date created is ", created);
      const description = i.description;
      console.log("description is ", description);
      const filesize = Math.round(((i.fileSize).toString() /1000000) * 100) / 100;
      console.log("Filesize is ", filesize);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: httpUri,
        name: filename,
        created: created,
        description: description,
        size: filesize,
        sharelink: httpUri,
        owner: i.owner.toString(),
        view: count,
      };
      console.log("item returned is ", item);
      setOwners(item.owner);
      // ethers.js automatically checks that the forward resolution matches.
      //let ensAddress = item.owner;
      //let NameLookup = await provider.lookupAddress(ensAddress);
      //setEnsName(NameLookup);
      // Calling conditions to send Milestone NFT from NFTPort
      if (count == 1) {
        mintViewMilestone();
      };

      if (count == 100) {
        mintViewMilestone();
      };

      if (count == 1000) {
        mintViewMilestone();
      };

      return item;
    }));
    setNfts(items);
    setLoadingState("loaded");

  }

  async function loadCount() {
    /* create a generic provider and query for items */
      console.log("loading News for item", props.vid);
    const vid = props.vid;
    console.log("vid is ", vid);

    try {
      //setTxStatus("Adding transaction to Polygon Mumbai..");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const connectedContract = new ethers.Contract(fileShareAddress, fileNFT.abi, provider.getSigner());
      console.log("Count variable is ", vid);

      const mintNFTTx = await connectedContract.createViewItem(vid);
      console.log("View Counter successfully retrieved from Blockchain");
      await mintNFTTx.wait();
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Mumbai.");
      console.log(error);
    }
 
  };
// NFTPort Function to Mint Milestone
  async function mintViewMilestone() {
    const options = {
      method: 'POST',
      url: 'https://api.nftport.xyz/v0/mints/easy/urls',
      headers: { 'Content-Type': 'application/json', Authorization: '768bfb7a-087d-4ee1-8bb0-5498cc36ad46' },
      data: {
        chain: 'polygon',
        name: 'streamagenic',
        description: 'NFT for your video getting views. Congratulations!',
        file_url: 'https://bafkreidugtjoxts62zsi32riqsjlpt643vnqxtaljo4tba2n2dlqvb2jyq.ipfs.w3s.link/',
        mint_to_address: {owners},
      },
    };
    axios.request(options).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    });
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
      <div>
    
        <h1 className="px-20 py-10 text-3xl">You have not selected anyvideo to watch</h1>
        
      </div>
    );
  }
  return (
    <Box as="section"  sx={styles.section} className="bg-blue-800 ">
    <>
    <div className=" text-2xl text-center text-white font-bold ">
        <h1>News Details</h1>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 col-gap-2 row-gap-5 mx-20 my-5">

	<div className="col-start-1 col-end-3 row-span-2 text-white bg-black text-4xl flex items-center justify-center border-4 border-red-500" style={containerStyle}>

  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">
{nfts.map((nft, i) => (
    <div key={i} className="shadow rounded-xl overflow-hidden min-w-full " style={responsiveIframe}>

<Player
      title={nft.name}
      src={nft.sharelink}
      //playbackId="6d7el73r1y12chxr"
      autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link' }}
      poster={<PosterImage />}
      showPipButton
      objectFit="cover"
      priority

    />

      {/**
      <iframe
        title="video"
        style={responsiveIframe}
        src={`${nft.image}#toolbar=0`}
        className="py-3 object-cover h-full"
      />
 */}
    </div>
  ))
}
</div>
    
  </div>

	<div className="row-span-3 text-black bg-white text-2xl flex text-left p-3 ">
    {nfts.map((nft, i) => (
    <div key={i} className="overflow-auto tect-blue-800  bg-white shadow rounded-xl font-bold">
      <div className="p-1">
        <p style={{ height: "20px" }} className="text-3xl font-semibold underline">Video Details</p>
      </div>
      <br/>
      <div className="p-1">
        <p style={{ height: "20px" }} className="text-xl font-semibold"> No. of Views : {nft.view}</p>
      </div>

      <br/>
      <div className="p-1">
        <p style={{ height: "20px" }} className="text-xl font-semibold">Video id: {nft.tokenId}</p>
      </div>
      <br/>
      <div className="p-1">
        <p style={{ height: "40px" }} className="text-xl font-semibold">Video Name : {nft.name}</p>
      </div>
      <br/>
      <div className="p-1">
        <p style={{ height: "40px" }} className="text-xl font-semibold">Description: {nft.description}</p>
      </div>
      <br/>
      <div className="p-1">
        <p style={{ height: "20px" }} className="text-xl font-semibold">Size : {nft.size} {' '} MB</p>
      </div>
      <br/>
      <div className="p-1">
        <p style={{ height: "20px" }} className="text-xl font-semibold"> Published on: {nft.created}</p>
      </div>
      <br/>
      <div className="p-1">
        <p style={{ height: "20px" }} className="text-xl font-semibold">Publisher: {nft.owner}</p>
      </div>
      <br/>
      <div className="p-1 mb-5">
        <p style={{ height: "20px" }} className="text-xl font-semibold">IPFS Link : {nft.sharelink}</p>
      </div>
      <br/>


    </div>
  ))}
   </div>

  
		<div className="col-span-3 text-white pt-3  text-xl flex items-center justify-center">
    <div className="p-4">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Claim()}>Drop your comment</button>
                </div>
                <div className="p-4">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full">
                    <a
                      className="social-icon-link github"
                      href="https://web3chat-holyaustin.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="chat"
                    >Chat with Publisher 
                    </a>
                  </button>
                </div>
                <div className="p-4">
                <ShareLink link="https://streamagenic.vercel.app/explore" text="News on Demand from eye witness all around the globe!" hashtags="blockchaintechnology streamagenic Livepeer holyaustin IPFS">
              {(link) => (
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full">                   
                  <a href={link} target="_blank" rel="noreferrer">Share on Twitter</a></button>
                  )}
            </ShareLink>
                </div>

                <div className="p-4">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full">
                    <a
                      className="social-icon-link github"
                      href="https://streamagenic-meeting.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="chat"
                    >Video Conference 
                    </a>
                  </button>
                </div>

            
    </div>

   
</div>
    </>
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
