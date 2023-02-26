import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet,
         goerli
        } from "wagmi/chains";

        import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";


const App = () => {

  const { chains, provider } = configureChains(
    [mainnet,
     goerli,
     
     
    ],

    [infuraProvider({ apiKey: ''}),
      publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "TurtleShell",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const customTheme = {
    fonts: {
      body: `'Oxanium', cursive`,
    },
    colors: {
      connectButtonBackground: "#FF5F08",
      connectButtonInnerBackground: "hsla(21, 100%, 50%, 0.58)",
      connectButtonText: "#FF5F08",
    },
    radii: {
      connectButton: "0.375rem",
    },
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    }
  ]);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#FF5F08",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;