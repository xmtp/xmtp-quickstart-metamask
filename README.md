![Status](https://img.shields.io/badge/Deprecated-brown)

> [!CAUTION]
> This repo is no longer maintained.

The documentation below is provided for historical reference only.

---

# XMTP Quickstart Metamask SDK

![xmtp](https://github.com/xmtp/xmtp-quickstart-reactjs/assets/1447073/3f2979ec-4d13-4c3d-bf20-deab3b2ffaa1)

## Installation

```bash
yarn install
yarn dev
```

## Concepts

Head to our docs to understand XMTP's concepts

- [Get started](https://xmtp.org/docs/build/get-started/overview?sdk=react)
- [Authentication](https://xmtp.org/docs/build/authentication?sdk=react)
- [Conversations](https://xmtp.org/docs/build/conversations?sdk=react)
- [Messages](https://xmtp.org/docs/build/messages/?sdk=react)
- [Streams](https://xmtp.org/docs/build/streams/?sdk=react)

#### Troubleshooting

If you get into issues with `Buffer` and `polyfills` check out the fix below:

- [Check out Buffer issue](https://github.com/xmtp/xmtp-js/issues/487)

## Metamask

### Setup

For MetamaskSDK SDK to work as a fresh install you need to install this packages

```bash
bun install @metamask/sdk-react ethers@^5
```

### Setting up the MetaMask Provider

Wrap your application with the MetaMaskProvider from `@metamask/sdk-react`.

```jsx
import { useEffect, useState } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";
import Page from "./Page";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            checkInstallationImmediately: false,
            dappMetadata: {
              name: "Demo React App",
              url: window.location.host,
            },
          }}
        >
          <Page />
        </MetaMaskProvider>
      ) : null}
    </>
  );
}
```

### Connection

Use the `useSDK` hook from `@metamask/sdk-react` to manage MetaMask connections.

```jsx
import React, { useState } from 'react';
import { useSDK } from '@metamask/sdk-react';

export const App = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  // Function to connect to the SDK
  const connect = async () => {
    try {
      // Attempt to connect to the SDK
      const accounts = await sdk?.connect();
      // Create a new Web3 provider
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      // Get the signer from the provider
      const signer = await web3Provider.getSigner();
      // Set the account and signer state
      setAccount(accounts?.[0]);
      //The signer is what we are going to use for XMTP later
      setSigner(signer);
    } catch (err) {
      // Log any errors that occur during connection
      console.warn(`failed to connect..`, err);
    }
  };

};
```

Use the XMTP client in your components:

```jsx
import { useClient } from "@xmtp/react-sdk";

// Example usage
const { client, error, isLoading, initialize } = useClient();
// Initialize with signer obtained from MetaMask
await initialize({ signer });
```

- [Metamask Documentation](https://docs.metamask.io/wallet/how-to/connect/set-up-sdk/javascript/react/)

  That's it! You've now created an XMTP app with MetamaskSDK.
