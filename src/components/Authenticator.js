import React, { useState } from 'react'
import { useAuth, AuthStatus } from '@w3ui/react-keyring'

export default function Authenticator ({ children }) {
  const { authStatus, identity, registerAndStoreIdentity, cancelRegisterAndStoreIdentity } = useAuth()
  const [email, setEmail] = useState('')

  if (authStatus === AuthStatus.SignedIn) {
    return children
  }

  if (authStatus === AuthStatus.EmailVerification) {
    return (
      <div>
        <h1 className='near-white'>Verify your email address!</h1>
        <p>Click the link in the email we sent to {identity && identity.email} to sign in.</p>
        <form onSubmit={e => { e.preventDefault(); cancelRegisterAndStoreIdentity() }}>
          <button type='submit' className="items-center font-bold mt-2 bg-black text-white text-2xl rounded shadow-lg p-5">Cancel</button>
        </form>
      </div>
    )
  }

  const handleRegisterSubmit = async e => {
    e.preventDefault()
    try {
      await registerAndStoreIdentity(email)
    } catch (err) {
      throw new Error('failed to register', { cause: err })
    }
  }

  return (
    <form onSubmit={handleRegisterSubmit}>
      <div className='mb3'>
        <label htmlFor='email' className='db mb2'>Email address:</label>
        <input id='email' className=" border rounded p-4 w-100 mb-4" type='email' value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="mx-0 min-w-full flex flex-col items-center">
      <button type='submit' className="items-center font-bold mt-2 bg-black text-white text-2xl rounded shadow-lg p-5">Register</button>
      </div>
    </form>
  )
}

/**
 * Wrapping a component with this HoC ensures an identity exists.
 */
export function withIdentity (Component) {
  return props => (
    <Authenticator>
      <Component {...props} />
    </Authenticator>
  )
}
