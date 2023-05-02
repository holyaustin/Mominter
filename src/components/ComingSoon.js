/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from 'next/router'
import Web3Modal from "web3modal";

import fileNFT from "../../artifacts/contracts/Genic.sol/FileNFT.json";
import { fileShareAddress } from "../../config";

export default function ComingSoon() {
  const navigate = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [address, setAddress] = useState()
  const [nfts, setNfts] = useState([]);
  const [fall, setfall] = useState([]);
  const [fme, setfme] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadfileNFT();
  }, []);

  async function loadfileNFT() {
    /* create a generic provider and query for fileNFTs 
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(fileShareAddress, fileNFT.abi, provider);
    const data = await contract.fetchMyNFTs();
    console.log("fileNFT data fetched from contract", data);
    */
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    setAddress(await signer.getAddress())
    
    const contract = new ethers.Contract(fileShareAddress, fileNFT.abi, signer);
    const data = await contract.fetchMyFiles();
    console.log("Data fetch from smart contract is", data.length);
    setfme(data.length);

    const connection2 = await web3Modal.connect();
    const provider2 = new ethers.providers.Web3Provider(connection2);
    const signer2 = provider2.getSigner();
    const contract2 = new ethers.Contract(fileShareAddress, fileNFT.abi, signer2);
    const data2 = await contract2.fetchAllStorageItems();
    console.log("Data fetch from smart contract is", data2.length);
    setfall(data2.length);
    
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
      // const privatefile = (i.filePrivate).toString; 

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

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };


  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-purple-100 text-4xl text-center text-black font-bold pt-10">
        <h1> Analytics</h1>
      </div>
      <div className="flex flex-col bg-purple-100 text-2xl text-center text-black font-bold pt-10">

        <h2> User's Stats</h2>
        
        <table className="table-auto border-separate border-spacing-2 border border-slate-500">
  <thead className="bg-purple-800 text-2xl text-center text-white">
    <tr >
      <th className="border border-slate-600">Variable</th>
      <th className="border border-slate-600">statistics</th>
      <th className="border border-slate-600">Year Started</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-slate-700">Wallet Address</td>
      <td className="border border-slate-700">{address}</td>
      <td className="border border-slate-700">2022</td>
    </tr>
    <tr className="bg-gray-300 border-b">
      <td className="border border-slate-700">Total Number of Files in contract</td>
      <td className="border border-slate-700">{fall}</td>
      <td className="border border-slate-700">2022</td>
    </tr>
    <tr>
      <td className="border border-slate-700">Number of Files Uploaded by me</td>
      <td className="border border-slate-700">{fme}</td>
      <td className="border border-slate-700">2022</td>
    </

tr>
  </tbody>
</table>

      </div>
      <div className="bg-purple-100 text-4xl text-center text-black font-bold pt-20 pb-10">
        <h1>0% of storage used.</h1>
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
