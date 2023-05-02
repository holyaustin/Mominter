import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from '@w3ui/react-keyring'
import { UploaderProvider } from '@w3ui/react-uploader'
import Image from './image';
import ContentPage from './ContentPage'

function Web3ui () {
  return (
    <AuthProvider>
      <UploaderProvider>
        <IdentityLoader>
          <div className='vh-100 flex flex-column justify-center items-center sans-serif light-silver bg-blue-900'>
            <header>
              <Image src="./images/logoonlyblue.png"  loading="lazy" alt="logo" />
    
            </header>
            <div className='w-90 w-50-ns mw6'>
              <ContentPage />
            </div>
          </div>
        </IdentityLoader>
      </UploaderProvider>
    </AuthProvider>
  )
}

function IdentityLoader ({ children }) {
  const { loadDefaultIdentity } = useAuth()
  // eslint-disable-next-line
  useEffect(() => { loadDefaultIdentity() }, []) // try load default identity - once.
  return children
}

export default Web3ui
