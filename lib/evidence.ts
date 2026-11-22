/**
 * Public, source-linked product evidence.
 * Source: official DXJLabs/vinss README, section "Mainnet contracts".
 * "Documented" means the repo claims it; a live explorer must be consulted
 * before representing independent verification or trading data.
 */
export const vinssContracts = [
  { name: "VinssFeePolicy", address: "0x0319dc70e75d8bfe0f86f09bb32847791cf1630eb6c2fa6575b8e98f1c28f505", purpose: "Fee policy" },
  { name: "VinssMessageHelper", address: "0x00b7fcc80a6d07f2c73dea1006fc36f893a3a4d9805a26f99e22fc7e6fa0b584", purpose: "Encrypted messaging" },
  { name: "VinssInvite", address: "0x0098539b85ad2c8300538bca5ada276caf57527e7e1b709c82fb9a81a01fcc41", purpose: "Deal room invites" },
  { name: "VinssOfferHelper", address: "0x0793d2b7844f104653f43690c23c2e11d87b854da5e86cb2930ede1fac05c21f", purpose: "Private negotiation" },
  { name: "VinssPrivateEscrowHelper", address: "0x040fbf221167da09ffb325a990a0347a8f178a5a7fb214680e3ee97af9156054", purpose: "Privacy coordination" },
  { name: "VinssEscrowRekber", address: "0x047cf4ffb45ca246f13400fa3bd4c3b73e51b8b4e1f2c5b9d4d9be55ee565cea", purpose: "Escrow & settlement" },
  { name: "VinssSettlementCertificate", address: "0x0378f6cb263afdc0f0fd81101065baca49237afb2fcc581b1793390c50133a77", purpose: "Settlement evidence" },
] as const;

export const evidenceUrls = {
  vinssRepo: "https://github.com/DXJLabs/vinss",
  vinssMainnet: "https://github.com/DXJLabs/vinss#mainnet-verification",
  vinssSprint: "https://github.com/DXJLabs/vinss/blob/main/strk20.json",
  carelRepo: "https://github.com/DXJLabs/Carel",
  carelApp: "https://carel-v2-mock.vercel.app",
  carelTests: "https://github.com/DXJLabs/Carel#verified-baseline",
} as const;

export function contractExplorerUrl(address: string) {
  return "https://starkscan.co/contract/" + address;
}
