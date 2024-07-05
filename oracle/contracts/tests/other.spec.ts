import {Address} from "@ton/core";
import crypto from 'node:crypto';
import {ethers} from "ethers";



describe('other tests', () => {
    it('address hash parsing', () => {
        const addrStr = 'EQCw66h3jilpKLm8HvmzccOuAVoR1RkxVMjHKrHEYNFpMuKD';
        const addr = Address.parse(addrStr);
        const hash = addr.hash.toString('hex')
        const bigintHash = BigInt(`0x${hash}`)
        console.log(bigintHash)
    })
    it('ethers private keys', () => {
        const id = crypto.randomBytes(32).toString('hex');
        const privateKey = "0x" + id;
        console.log(`PRIVATE KEY: ${privateKey}`)

        const wallet = new ethers.Wallet(privateKey);
        console.log(`eth addr: ${wallet.address}`);
        // this is how
    })
})