/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, Box } from 'theme-ui';
import { NFTStorage } from "nft.storage";
import { filesFromPath } from "files-from-path";
import path from "path";
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { rgba } from 'polished';
import 'dotenv/config';
import fileNFT from "../../artifacts/contracts/Genic.sol/FileNFT.json";
import { fileShareAddress } from "../../config";
const APIKEY = [process.env.NFT_STORAGE_API_KEY];

const MintFile = () => {
  const navigate = useRouter();
  const [filePaths, setFilePaths] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: ""});

  const handleFileUpload = (event) => {
    console.log("folder for upload selected...");
    //setUploadedFile(Array.from(event.target.files));
    // onPickFiles(Array.from(e.target.files));
    // const handleFilesChange = e => onPickFiles(Array.from(e.target.files))
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const uploadNFTContent = async (inputFile) => {
    const { name } = formInput;
    if (!name || !inputFile) return;
    console.log("About to upload selected Folder...");
    // const filePaths = inputFile.map(f => f.path)
    // console.log(`storing files from {filePaths}`)
    // setFilePaths(filePaths)

    if (process.argv.length !== 3) {
      console.error(`usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`)
    }
    const directoryPath = process.argv[2];
    const files = filesFromPath(directoryPath, {
       // see the note about pathPrefix below
      hidden: true, // use the default of false if you want to ignore files that start with '.'
    })

    const nftStorage = new NFTStorage({ APIKEY });
    try {
      console.log("Trying to upload folder to ipfs");
      setTxStatus("Uploading Folder to IPFS & Filecoin via NFT.storage.");
      console.log(`storing file(s) from ${path}`)
      //console.log(`storing files from {filePaths}`)
      const metaData = await nftStorage.storeDirectory(files);
      console.log("cid is: ", { metaData });
      setMetaDataURl(metaData.url);
      
      
      const status = await nftStorage.status(metaData)
      console.log(status)
      return metaData;
    } catch (error) {
      setErrorMessage("Could store file to NFT.Storage - Aborted file upload.");
      console.log("Error Uploading Content", error);
    }
  };

  const sendTxToBlockchain = async (metadata) => {
    try {
      setTxStatus("Adding transaction to Polygon Mumbai Blockchain.");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const privatefile = formInput.privatefile.toString();

      const connectedContract = new ethers.Contract(fileShareAddress, fileNFT.abi, provider.getSigner());
      console.log("Connected to contract", fileShareAddress);
      console.log("IPFS blockchain uri is ", metadata.url);

      const mintNFTTx = await connectedContract.createFile(metadata.url, privatefile);
      console.log("File successfully created and added to Blockchain");
      await mintNFTTx.wait();
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    setMetaDataURl(getIPFSGatewayURL(metaData));
    setTxStatus("File addition was successfully!");
    console.log("Preview details completed");
  };

  const mintNFTFile = async (e, uploadedFile) => {
    e.preventDefault();
    // 1. upload File content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on Polygon
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
   previewNFT(metaData, mintNFTTx);

    //navigate("/explore");
    // navigate.push('/dashboard')
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    //const urlArray = ipfsURL.split("/");
    //console.log("urlArray = ", urlArray);
    //const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    console.log("ipfsGateWayURL = ", "ipfsGateWayURL")
    return "https://${urlArray[2]}.ipfs.nftstorage.link/${urlArra";
  };

  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-purple-100 text-4xl text-center text-black font-bold pt-10">
        <h1> Add Folder</h1>
      </div>
      <div className="flex justify-center bg-purple-100">
        <div className="w-1/2 flex flex-col pb-12 ">
        <input
            placeholder="Give the folder a name"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <div className="MintNFT text-xl text-black">
            <form>
              <h3>Select a Folder</h3>
              <input type="file" multiple directory="" mozdirectory=""  webkitdirectory='true' onChange={handleFileUpload} className="text-black mt-2 border rounded text-xl" />
            </form>
            {txStatus && <p>{txStatus}</p>}
            </div>

          <button type="button" onClick={(e) => mintNFTFile(e, uploadedFile)} className="font-bold mt-20 bg-purple-700 text-white text-2xl rounded p-4 shadow-lg">
            Publish Folder
          </button>
        </div>
      </div>
    </Box>

  );
};
export default MintFile;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
};
