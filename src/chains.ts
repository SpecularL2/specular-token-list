import { ethers } from 'ethers'

import { Chain, L1Chain, L2Chain, Network } from './types'


export const NETWORK_DATA: Record<Chain, Network> = {
  'specular': {
    id: 93481,
    name: 'Specular',
    provider: new ethers.providers.StaticJsonRpcProvider(
      'https://devnet.specular.network/',
      93481
    ),
    layer: 2,
  },
  'sepolia': {
    id: 11155111,
    name: 'Sepolia',
    provider: new ethers.providers.StaticJsonRpcProvider(`https://eth-sepolia-public.unifra.io`, 11155111),
    layer: 1,
  },
}

interface L2BridgeInformation {
  l2StandardBridgeAddress: string
}

interface L1BridgeInformation {
  l2Chain: L2Chain
  l1StandardBridgeAddress: string
}

export const L2_STANDARD_BRIDGE_INFORMATION: Record<
  L2Chain,
  L2BridgeInformation
> = {
  'specular': {
    l2StandardBridgeAddress: '0x4200000000000000000000000000000000000010',
  },
}

export const L2_TO_L1_PAIR: Partial<Record<L2Chain, L1Chain>> = {
  specular: 'ethereum',

}

export const L1_STANDARD_BRIDGE_INFORMATION: Record<
  L1Chain,
  L1BridgeInformation[]
> = {
  ethereum: [
    {
      l2Chain: 'specular',
      l1StandardBridgeAddress: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
    }
  ],
  sepolia: []

}
