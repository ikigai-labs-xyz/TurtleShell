// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import oai from 'openai';

// interface Vulnerability {
//   name: string;
//   funcName: string;
//   vunType: string;
// }

// interface Recommendation {
//   vunName: string;
//   vunType: string;
//   remedy: string;
// }

// const apiVul: Vulnerability[] = [
//   {
//     name: "reentrancy",
//     funcName: "deposit()",
//     vunType: "critical",
//   },
//   {
//     name: "sybil",
//     funcName: "constructor()",
//     vunType: "medium"
//   },
// ];

// const recommendations: Recommendation[] = [];

// async function openAIContent(): Promise<void> {
//   for (const vulnerability of apiVul) {

//     const vunDesc = await oai.openai.Completion.create({
//       engine: "davinci",
//       prompt: `Explain the ${vulnerability.name} solidity vulnerabilities in less than 200 words`
//     });

//     const vunRemedy = await openai.Completion.create({
//       engine: "davinci",
//       prompt: `What remedies are available for ${vulnerability.name} solidity vulnerability. Provide a response of 500 words`
//     });
//     recommendations.push({
//       vunName: vunDesc.choices[0].text,
//       vunType: vulnerability.vunType,
//       remedy: vunRemedy.choices[0].text,
//     });
//   }
// }

// // ingest the recommendations array in the data

// const data = {
//   title: 'Smart Contract Audit Report',
//   author: 'TurtleShell',
//   date: new Date(),
//   contractName: "${contractName}",
//   contractAddress: "${contractAddr}",
//   auditDate: new Date(),
//   auditor: 'Ikigai Labs PTY LTD',
//   sections: [
//     {
//       title: 'Executive Summary',
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sem euismod, dignissim tellus sed, facilisis libero.'
//     },
//     {
//       title: 'Scope of the Audit',
//       content: 'The audit covered the smart contract code for Example Token version 1.0, deployed at address 0x123456789abcdef on the Ethereum mainnet.'
//     },
//     {
//       title: 'Findings and Recommendations',
//       content: recommendations.map((recommendation) => ({
//         vunName: recommendation.vunName,
//         vunType: recommendation.vunType,
//         severity: recommendation.vunType, // You may want to change this field
//         remedy: recommendation.remedy,
//       })),
//     },
//     {
//       title: 'Conclusion',
//       content: 'Based on the findings of this audit....'
//     },
//     {
//       title: 'Appendix A: Audit Methodology',
//       content: 'The audit was conducted using a combination of automated and manual techniques...'
//     },
//     {
//       title: 'Appendix B: Glossary',
//       content: 'This appendix provides definitions of key terms used throughout the report...'
//     }
//   ]
// };

// const doc = new PDFDocument();

// doc.pipe(fs.createWriteStream('report.pdf'));

// doc.fontSize(25).text(data.title, { align: 'center' });
// doc.moveDown();

// doc.fontSize(14).text(`Author: ${data.author}`);
// doc.text(`Date: ${data.date.toLocaleDateString()}`, { align: 'right' });
// doc.moveDown();

// for (const section of data.sections) {
//   doc.fontSize(20).text(section.title);
//   doc.moveDown();
//   doc.fontSize(12).text(section.content);
//   doc.moveDown();
// }

// doc.end();
