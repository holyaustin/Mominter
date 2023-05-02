import React, { useState, useEffect} from 'react'
import { useUploader } from '@w3ui/react-uploader'
import { withIdentity } from './Authenticator'
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import fileNFT from "../../artifacts/contracts/Genic.sol/FileNFT.json";
import { fileShareAddress } from "../../config";

export function ContentPage () {
  const [{ uploadedCarChunks }, uploader] = useUploader()
  const [file, setFile] = useState(null)
  const [dataCid, setDataCid] = useState('')
  const [txStatus, setTxStatus] = useState();
  const [fileSize, setFileSize] = useState('')
  const [fileName, setFileName] = useState('')
  const [desc, setDesc] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)
  const [formInput, updateFormInput] = useState({ description: "" });

  if (!uploader) return null

  const handleUploadSubmit = async e => {
    const { description } = formInput;
    e.preventDefault()
    setDesc(description);
    setTxStatus("");
    try {
      console.log("About to upload file", file)
      setStatus('uploading')
      setTxStatus("Oops, Something went wrong. Kindly choose a video to Upload along with its description using W3UI.");
      console.log("After setting status to Uploding")
      const cid = await uploader.uploadFile(file)
      console.log("const cid is:", cid)
     setDataCid(cid)
     console.log("File Name is:", file.name);
     setFileName(file.name)
     console.log("File Size is:", file.size);
     setFileSize(file.size)
      
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      console.log("Before status done from Finally")
      setStatus('done')
      console.log("Setting status to done from Finally")
      if (status === 'done') {
        await sendTxToBlockchain() 
        return error ? <Errored error={error} /> : <Done file={file} dataCid={dataCid} uploadedCarChunks={uploadedCarChunks} />
        
      }     
    }
  }

  if (status === 'uploading') {
    console.log("Enter status uploading");
    return <Uploading file={file} uploadedCarChunks={uploadedCarChunks} />
    
  }

 
  const sendTxToBlockchain = async () => {
    setTxStatus("Adding transaction to Polygon Mumbai..");
    try {
      console.log("Adding transaction to Polygon Mumbai..");
      console.log("Description is:", desc);
      console.log("File Name is:", fileName);
      console.log("File Size is:", fileSize);
      const ipfsGateWayURL = `https://${dataCid}.ipfs.w3s.link`;
      console.log("sendTxToBlockchain ipfsGateWayURL = ", ipfsGateWayURL);

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
  
      const connectedContract = new ethers.Contract(fileShareAddress, fileNFT.abi, provider.getSigner());
      console.log("sendTxToBlockchain Connected to contract", fileShareAddress);
      console.log("sendTxToBlockchain IPFS blockchain uri is ", ipfsGateWayURL);
  
      const mintNFTTx = await connectedContract.createFile(ipfsGateWayURL, fileName, desc, fileSize);
      console.log("sendTxToBlockchain File successfully created and added to Blockchain");
      await mintNFTTx.wait();
      setTxStatus("Video was published successfully!");
      return mintNFTTx;
    } catch (error) {
      //setError("Failed to send tx to Mumbai.");
      console.log(error);
    }
  };
  

  return (
    <div className="text-black text-xl">
    <form onSubmit={handleUploadSubmit}>
      <div className='db mb3 text-center font-bold'>
      <h1 >Upload your news</h1>
      <label htmlFor='file' className='db mb1 text-left'>Description</label>
      <input
            placeholder="News Description"
            className=" border rounded p-4 w-100 mb-4"
            onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
          />
        <label htmlFor='file' className='db mb1 text-left'>File:</label>
        <input id='file' className='db pa2 w-100 ba br2' type='file' onChange={e => setFile(e.target.files[0])} required />
      </div>
      <div className="mx-0 min-w-full flex flex-col items-center">
      <button type="submit" className="items-center font-bold mt-2 bg-black text-white text-2xl rounded shadow-lg p-5">
            Publish News
      </button>
      </div>
    </form>
    {txStatus && <p className="text-center text-white pt-5">{txStatus}</p>}
    </div>
  )
}

const Uploading = ({ file, uploadedCarChunks }) => {
    console.log("Enter Uploading Function")
  return(
  <div className='flex items-center'>
    <div className='spinner mr3 flex-none' />
    <div className='flex-auto'>
      <p className='truncate'>Uploading VIDEO NEWS for {file.name}</p>
      {uploadedCarChunks.map(({ cid, size }) => (
        <p key={cid.toString()} className='f7 truncate'>
          {cid.toString()} ({size} bytes)

        </p>
      ))}
    </div>
  </div>
  )}

const Errored = ({ error }) => (
  <div>
    <h1 className='near-white'>⚠️ Error: failed to upload file: {error.message}</h1>
    <p>Check the browser console for details.</p>
  </div>
)

const Done = ({ file, dataCid, uploadedCarChunks }) => {
  console.log("Enter Done Function")
return(
  <div>
    <h1 className='near-white'>Done!</h1>
    <p className='f6 code truncate'>{dataCid.toString()}</p>
    <p><a href={`https://w3s.link/ipfs/${dataCid}`} className='blue'>View {file.name} on IPFS Gateway.</a></p>
    <p className='near-white'>Chunks ({uploadedCarChunks.length}):</p>
    {uploadedCarChunks.map(({ cid, size }) => (


      <p key={cid.toString()} className='f7 truncate'>
        {cid.toString()} ({size} bytes)
      </p>
    ))}
  </div>
)}

export default withIdentity(ContentPage)
