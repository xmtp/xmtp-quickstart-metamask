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
