import { useCreateStream } from '@livepeer/react';
import { useState } from 'react';

export default function Stream () {
 const [streamName, setStreamName] = useState('');
 const {
 mutate: createStream,
 data: createdStream,
 status: createStatus,
 } = useCreateStream();

 return (
    <div className='mt-36'>
      <input
        type="text"
        placeholder="Stream name"
        onChange={(e) => setStreamName(e.target.value)}
      />
 
      <input
        type="submit"
        value="Create Stream"
        onClick={() => {
          createStream?.();
        }}
        disabled={createStatus === 'loading' || !createStream}
        />
        
      
    </div>
  );
};