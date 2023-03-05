export default function BadgeSvg({
    TOKEN_ID,
    RISK_LEVEL,
    TIMESTAMP,
    NETWORK,
    CONTRACT_ADDRESS,
    TYPES_VULNERABILITIES,
}) {
    return (
        <svg
            fill="none"
            viewBox="0 0 549 507"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <defs>
                <style type="text/css">
                    {`@import url('https://fonts.googleapis.com/css?family=Oxanium:400,100,300,300italic,400italic,500,500italic,600SemiBold,700Bold,700italic,900,900italic');`}
                </style>
            </defs>
            <rect
                x="100"
                y="48"
                width="353"
                height="400"
                rx="10"
                fill="#343434"
                stroke="url(#a)"
                stroke-width="3.5"
            />
            <image
                x="120"
                y="60"
                width="40"
                rx="100"
                href="https://i.ibb.co/bsbPB0J/favicon-1.png"
            />
            <text x="170" y="87" fill="#00FE47" font-family="Oxanium" font-size="17px" weight="700">
                {" "}
                TurtleShell{" "}
            </text>
            <text x="335" y="87" fill="#ffffff" font-family="Oxanium" font-size="15px" weight="600">
                #{TOKEN_ID}
            </text>
            {/* <text
                x="120"
                y="130"
                fill="#ffffff"
                font-family="Oxanium"
                font-size="15px"
                weight="600"
            >
                Audit for <tspan fill="#ffffff" font-weight="bold" /> TurtleShell
            </text> */}
            <circle cx="270" cy="220" r="70" fill="url(#b)" fill-opacity=".4" filter="url(#c)" />
            <foreignObject x="138" y="160" width="263" height="200">
                <div style={{ "text-align": "center" }}>
                    <br />
                    <span
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                            "font-size": "20px",
                            margin: "auto",
                            "text-align": "center",
                            "font-weight": 300,
                            color: "#ffffff",
                            "font-family": "Oxanium",
                        }}
                    >
                        Risk Level
                    </span>
                    <br />
                    <span
                        xmlns="http://www.w3.org/1999/xhtml"
                        style={{
                            "font-size": "32px",
                            margin: "auto",
                            "text-align": "center",
                            "font-weight": 600,
                            color: "#00fe47",
                            "font-family": "Oxanium",
                        }}
                    >
                        {RISK_LEVEL}
                    </span>
                </div>
            </foreignObject>
            <text
                x="122"
                y="320"
                fill="#AFAFAF"
                font-family="Oxanium"
                font-size="13px"
                font-weight="400"
            >
                Timestamp{" "}
            </text>
            <text
                x="122"
                y="337"
                fill="#FFFFFF"
                font-family="Oxanium"
                font-size="13px"
                font-weight="400"
            >
                {TIMESTAMP}{" "}
            </text>
            <text
                x="122"
                y="367"
                fill="#AFAFAF"
                font-family="Oxanium"
                font-size="13px"
                font-weight="400"
            >
                Network{" "}
            </text>
            <text
                x="122"
                y="384"
                fill="#FFFFFF"
                font-family="Oxanium"
                font-size="13px"
                font-weight="400"
            >
                {NETWORK}{" "}
            </text>
            <text
                x="122"
                y="414"
                fill="#AFAFAF"
                font-family="Oxanium"
                font-size="13px"
                font-weight="400"
            >
                Contract Address{" "}
            </text>
            <text
                x="122"
                y="431"
                fill="#FFFFFF"
                font-family="Oxanium"
                font-size="13px"
                font-weight="400"
            >
                {CONTRACT_ADDRESS}{" "}
            </text>
            <text
                x="305"
                y="367"
                fill="#AFAFAF"
                font-family="Oxanium"
                font-size="15px"
                font-weight="400"
            >
                Vulnarability Types{" "}
            </text>
            <text
                x="305"
                y="385"
                fill="#FFFFFF"
                font-family="Oxanium"
                font-size="13px"
                font-weight="400"
            >
                {TYPES_VULNERABILITIES}{" "}
            </text>
            <defs>
                <linearGradient id="a" y2="100%">
                    <stop stop-color="#00FE47" offset="0" />
                    <stop stop-color="#343434" offset="1" />
                </linearGradient>
                <radialGradient id="b">
                    <stop stop-color="#00FE47" offset="0" />
                    <stop stop-color="#343434" offset="1" />
                </radialGradient>
                <filter id="c">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                </filter>
            </defs>
        </svg>
    )
}

// {
//     <?xml version="1.0" encoding="UTF-8"?>
// <svg fill="none" viewBox="0 0 549 507" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
// <defs>
// <style type="text/css">@import
//                     url('https://fonts.googleapis.com/css?family=Oxanium:400,100,300,300italic,400italic,500,500italic,600SemiBold,700Bold,700italic,900,900italic');</style>
// </defs>
// <rect x="100" y="48" width="353" height="400" rx="10" fill="#343434" stroke="url(#a)" stroke-width="3.5"/>
// <image x="120" y="60" width="40" rx="100" href="https://i.ibb.co/bsbPB0J/favicon-1.png"/>
// <text x="170" y="87" fill="#00FE47" font-family="Oxanium" font-size="17px" weight="700">TurtleShell </text>
// <text x="335" y="87" fill="#ffffff" font-family="Oxanium" font-size="15px" weight="600">#{TOKEN_ID} </text>
// <text x="120" y="130" fill="#ffffff" font-family="Oxanium" font-size="15px" weight="600">Audit for <tspan fill="#ffffff" font-weight="bold"/> {PROTOCOL_NAME}</text>
// <circle cx="270" cy="220" r="70" fill="url(#b)" fill-opacity=".4" filter="url(#c)"/>
// <foreignObject x="138" y="160" width="263" height="200">
// <div text-align="center">
// <br/>
// <span color="#ffffff" font-family="Oxanium" font-size="20px" font-weight="300" text-align="center" style="margin:auto" xmlns="http://www.w3.org/1999/xhtml">Risk Level</span>
// <br/>
// <span color="#00fe47" font-family="Oxanium" font-size="32px" font-weight="600" text-align="center" style="margin:auto" xmlns="http://www.w3.org/1999/xhtml">{RISK_LEVEL}</span>
// </div>
// </foreignObject>
// <text x="122" y="320" fill="#AFAFAF" font-family="Oxanium" font-size="13px" font-weight="400">Timestamp </text>
// <text x="122" y="337" fill="#FFFFFF" font-family="Oxanium" font-size="13px" font-weight="400">{TIMESTAMP} </text>
// <text x="122" y="367" fill="#AFAFAF" font-family="Oxanium" font-size="13px" font-weight="400">Network </text>
// <text x="122" y="384" fill="#FFFFFF" font-family="Oxanium" font-size="13px" font-weight="400">{NETWORK} </text>
// <text x="122" y="414" fill="#AFAFAF" font-family="Oxanium" font-size="13px" font-weight="400">Contract Address </text>
// <text x="122" y="431" fill="#FFFFFF" font-family="Oxanium" font-size="13px" font-weight="400">{CONTRACT_ADDRESS} </text>
// <text x="305" y="367" fill="#AFAFAF" font-family="Oxanium" font-size="15px" font-weight="400">Vulnarability Types </text>
// <text x="305" y="385" fill="#FFFFFF" font-family="Oxanium" font-size="13px" font-weight="400">{TYPES_VULNERABILITIES} </text>
// <defs>
// <linearGradient id="a" y2="100%">
// <stop stop-color="#00FE47" offset="0"/>
// <stop stop-color="#343434" offset="1"/>
// </linearGradient>
// <radialGradient id="b">
// <stop stop-color="#00FE47" offset="0"/>
// <stop stop-color="#343434" offset="1"/>
// </radialGradient>
// <filter id="c">
// <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
// </filter>
// </defs>
// </svg>

// }
