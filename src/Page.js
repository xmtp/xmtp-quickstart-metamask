import React, { useState } from "react";
import { FloatingInbox } from "./FloatingInbox-hooks";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";

const InboxPage = () => {
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, ready, chainId } = useSDK();
  const [loggingOut, setLoggingOut] = useState(false); // Add this line

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await web3Provider.getSigner();
      setAccount(accounts?.[0]);
      setSigner(signer);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    sdk?.disconnect();
    setAccount("");
    setSigner("");
    setLoggingOut(false);
  };

  const isPWA = true;
  const styles = {
    uContainer: {
      height: "100vh",
      backgroundColor: "#f9f9f9",
      borderRadius: isPWA == true ? "0px" : "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    xmtpContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    btnXmtp: {
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#000",
      justifyContent: "center",
      border: "1px solid grey",
      padding: isPWA == true ? "20px" : "10px",
      borderRadius: "5px",
      fontSize: isPWA == true ? "20px" : "14px", // Increased font size
    },
  };

  if (!ready) return null;
  return (
    <div style={styles.uContainer}>
      {!signer && (
        <div style={styles.xmtpContainer}>
          <button style={styles.btnXmtp} onClick={connect}>
            Connect
          </button>
        </div>
      )}
      {signer && (
        <FloatingInbox isPWA={isPWA} wallet={signer} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default InboxPage;
