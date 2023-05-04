/** @jsxRuntime classic */
/** @jsx jsx */ 

import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from 'next/router'
import { useNavigate, useLocation } from "react-router-dom";
import Web3Modal from "web3modal";
import Image from 'next/image';
import { rgba } from 'polished';

import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "./PeerVideoAudioElem";
import MeVideoElem from "./MeVideoElem";

import blenderPoster from '../../public/images/mominter_logo.png';
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

export default function Huddle01() {
  const huddleClient = getHuddleClient("eee33ed8308ea7f4814202f6fee8c936c80d2f9f03d480b069f13974fe349e21");
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const roomState = useHuddleStore((state) => state.roomState);
  const recordingState = useHuddleStore((state) => state.recordingState);
  const recordings = useHuddleStore((state) => state.recordings);



  console.log('Entered Conference component');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleJoin = async () => {
    try {
      await huddleClient.join("mominter", {
        address: "0xa6D6f4556B022c0C7051d62E071c0ACecE5a1228",
        wallet: "",
        ens: "",
      });

      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <HuddleClientProvider value={huddleClient}>

    <Box as="section"  sx={styles.section} className="bg-blue-800 ">
    <>
    <div className=" text-2xl text-center text-white font-bold ">
        <h1>Video Conference</h1>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 col-gap-2 row-gap-5 mx-20 my-5">

	<div className="col-start-1 col-end-3 row-span-2 text-white bg-black text-4xl flex items-center justify-center border-4 border-red-500"  style={containerStyle}>

  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">

    <div className="shadow rounded-xl overflow-hidden min-w-full " style={responsiveIframe}>
    
    {!roomState.joined ? <PosterImage /> : <MeVideoElem />}
    
    
    

{lobbyPeers[0] && <h2>Lobby Peers</h2>}
<div>
  {lobbyPeers.map((peer) => (
    <div>{peer.peerId}</div>
  ))}
</div>

{peersKeys[0] && <h2>Peers</h2>}

<div className="peers-grid">
  {peersKeys.map((key) => (
    <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} />
  ))}
</div>
      {/**
      <iframe
        title="Huddle01"
        style={responsiveIframe}
        src=""
        className="py-3 object-cover h-full"
      />
  */}
    </div>
</div>
    
  </div>

	<div className="row-span-3 text-black bg-white text-2xl flex text-left p-3 ">
    
    <div className="overflow-auto bg-black shadow rounded-xl font-bold p-3">
      <div className="p-1 text-white">
        <h2 style={{ height: "20px" }} className={`text-${!roomState.joined ? "red" : "green"} `}>
            Room Joined:&nbsp;{roomState.joined.toString()}
          </h2>
          
      </div>
      <br/>
      <div >
      <h2 className="font-bold text-blue-800">Instructions</h2>
          <ol className="w-fit mx-auto text-justify text-base text-yellow-500">
            <li>
              Click on <b>Enable Stream</b>
            </li>
            <li>
              Then Click on <b>Join room</b>, <i>"Room Joined"</i> should be
              changed to true
            </li>
            <li>
              Open the app in a <b>new tab</b> and repeat <b>steps 1 & 2</b>
            </li>
            <li>Return to 1st tab, now you'll see peers in the peer list,</li>
            <li>
              Click on <b>allowAllLobbyPeersToJoinRoom</b> to accept peers into
              the room.
            </li>
          </ol>
      </div>
      <br/>
      <h2 className="font-bold text-blue-800">Recording State</h2>
      <br/>
      <div className="p-1 text-white">
        <p style={{ height: "10px" }} className="text-xl font-semibold">inProgress: {recordingState.inProgress.toString()} </p>
      </div>
      <br/>
      <div className="p-1 text-white">
        <p style={{ height: "10px" }} className="text-xl font-semibold">processing: {recordingState.processing.toString()} </p>
      </div>
      <br/>
      <div className="p-1 text-white">
        <p style={{ height: "10px" }} className="text-xl font-semibold">started: {recordingState.started.toString()} </p>
      </div>
      <br/>
      <div className="p-1 text-white">
        <p style={{ height: "10px" }} className="text-xl font-semibold">recordings: {JSON.stringify(recordings)} </p>
      </div>


    </div>
  
   </div>

  
		<div className="col-span-3 text-white pt-3  text-xl flex items-center justify-center">

    <div className="p-4">
      <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={handleJoin}>Join Room
      </button>
    </div>
    <div className="p-4">
      <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => huddleClient.enableWebcam()}>Enable Webcam
      </button>
    </div>
    <div className="p-4">
      <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => huddleClient.disableWebcam()}>Disable Webcam
      </button>
    </div>
    <div className="p-4">
      <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => huddleClient.allowAllLobbyPeersToJoinRoom()}>Allow All Peers To Join
      </button>
    </div>
    <div className="p-4">
      <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" 
      onClick={() =>
                // will not work in localhost
                huddleClient.startRecording({
                  address: '0xa6D65a1228',
                  sourceUrl: window.location.href,
                })
              }>Start Recording
      </button>
    </div>
    <div className="p-4">
      <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => huddleClient.stopRecording({ ipfs: true })}>Stop Recording
      </button>
    </div>


</div>
</div>
    </>
      </Box>
      </HuddleClientProvider>
  );
}

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };
