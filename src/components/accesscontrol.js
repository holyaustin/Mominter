import React from "react";
import { jsx, Box } from 'theme-ui';
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function Access() {

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async(e) =>{
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    const output = await lighthouse.upload(e, 'ae577f1e-f6ad-4047-ae83-64e4a042f45a', progressCallback);
    console.log('File Status:', output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  return (
    <Box as="section"  sx={styles.section}>
    <div className="text-2xl text-center text-black font-bold pt-10">
      <h1> Upload File</h1>
    </div>
    <div className="flex justify-center">
    <div className="w-1/2 flex flex-col pb-12 ">
    <div className="App">
      <input onChange={e=>uploadFile(e)} type="file" className="text-black mt-2 border rounded  text-2xl w-full" />
    </div>

    <button type="button" onClick={(e) => uploadFileEncrypted(e)} className="font-bold mt-20 bg-yellow-500 text-white text-2xl rounded p-4 shadow-lg">
            Upload Moment
          </button>
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