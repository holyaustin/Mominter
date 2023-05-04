import React from "react";
import { jsx, Box } from 'theme-ui';
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function Access() {

  const encryptionSignature = async() =>{

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return({
      signedMessage: signedMessage,
      publicKey: address
    });
  }

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  /* Deploy file along with encryption */
  const uploadFileEncrypted = async(e) =>{
    /*
       uploadEncrypted(e, accessToken, publicKey, signedMessage, uploadProgressCallback)
       - e: js event
       - accessToken: your API key
       - publicKey: wallets public key
       - signedMessage: message signed by the owner of publicKey
       - uploadProgressCallback: function to get progress (optional)
    */
    const API = "ae577f1e-f6ad-4047-ae83-64e4a042f45a";
    console.log("Lighthouse API is", API);
    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      e,
      "ae577f1e-f6ad-4047-ae83-64e4a042f45a",
      sig.publicKey,
      sig.signedMessage,
      progressCallback
    );
    console.log(response);
    /*
      output:
        data: {
          Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
          Size: "318557",
          Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
        }
      Note: Hash in response is CID.
    */
  }

  return (
    <Box as="section"  sx={styles.section}>
    <div className="text-2xl text-center text-black font-bold pt-10">
      <h1> Upload Video for Encryption (LightHouse)</h1>
    </div>
    <div className="flex justify-center">
    <div className="w-1/2 flex flex-col pb-12 ">
    <div className="App pt-10">
      <input onChange={e=>uploadFileEncrypted(e)} type="file" className="text-black mt-2 border rounded  text-2xl w-full" />
    </div>

    </div>
    </div>
    </Box>
  );
}

export default Access;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
};