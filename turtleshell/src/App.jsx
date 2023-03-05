import "./App.css"
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LandingPage from "./LandingPage"
import Dashboard from "./Dashboard"
import AuditLayout from "./layout/AuditLayout"
import ChooseContracts from "./pages/ChooseContracts"
import MyAudits from "./pages/MyAudits"
import MintProof from "./pages/MintProof"
import InitializeAudit from "./pages/InitializeAudit"

import "./polyfills"
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet, goerli } from "wagmi/chains"



import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/keinberger/turtleshell",
    cache: new InMemoryCache(),
})

const App = () => {
    const { chains, provider } = configureChains(
        [mainnet, goerli],
        [infuraProvider({ apiKey: import.meta.env.VITE_INFURA_API_KEY }), publicProvider()]
    )

    const { connectors } = getDefaultWallets({
        appName: "TurtleShell",
        chains,
    })

    const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider,
    })

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage />,
        },
        
        {
            element: <Dashboard />,
            children: [
                {
                    path: "/new-audit",
                    element: <AuditLayout />,
                    children: [
                        {
                            path: "/new-audit/choose",
                            element: <ChooseContracts />,
                        },
                        {
                            path: "/new-audit/initialize-audit/:id",
                            element: <InitializeAudit />,
                        },
                        {
                            path: "/new-audit/mint-proof/:id/:hash/:auditDetailsParsed",
                            element: <MintProof />,
                        },
                    ],
                },
            ],
        },
    ])

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
                    <ApolloProvider client={client}>
                        <RouterProvider router={router} />
                    </ApolloProvider>
                </RainbowKitProvider>
            </WagmiConfig>
        </>
    )
}

export default App
