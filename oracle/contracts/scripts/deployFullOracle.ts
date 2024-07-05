import {compile, NetworkProvider} from "@ton/blueprint";
import {FullOracle} from "../wrappers/FullOracle";
import {FullOracleInitData} from "../src/full-oracle/FullOracleInitData";
import {Address, toNano} from "@ton/core";
import {ethers} from "ethers";


export async function run(provider: NetworkProvider) {
    const ui = provider.ui();

    const haltedPr = await ui.input('Should oracle be halted? [yN]')
    const halted = haltedPr === 'y';

    const cacheTtlStr = await ui.input('Enter the oracle cache ttl, in seconds')
    const cacheTtl = parseInt(cacheTtlStr);

    const minRequestAmountStr = await ui.input('Enter the minimum request amount in tons');
    const minRequestAmount = toNano(minRequestAmountStr)

    const signerCountThresholdStr = await ui.input('Enter the signer count threshold')
    const signerCountThreshold = parseInt(signerCountThresholdStr);

    const adminAddrStr = await ui.input('Enter the admin address')
    const adminAddress = Address.parse(adminAddrStr);

    const requestDataWalletAddrStr = await ui.input('Enter the request wallet address');
    const requestDataWalletAddress = Address.parse(requestDataWalletAddrStr)


    const consumers: Address[] = [];
    while (true) {
        const nextConsumer = await ui.input('[Trusted Oracle Consumers phase]: enter next trusted consumer addr, if no more consumer skip');
        if (!nextConsumer) {
            break;
        }
        consumers.push(Address.parse(nextConsumer))
    }
    const signers: string[] = [];
    while (true) {
        const nextSigner = await ui.input('[Trusted Oracle Signers (ETH addresses)]: enter next trusted signer addr, if no more signer skip');
        if (!nextSigner) {
            break
        }
        if (!ethers.isAddress(nextSigner)) {
            throw new Error(`${nextSigner} is not valid ether address`)
        }
        signers.push(nextSigner)
    }

    const initData = new FullOracleInitData({
        halted,
        cacheTtl,
        minRequestAmount,
        signerCountThreshold,
        initialTimestamp: 0,
        adminAddress,
        requestDataWalletAddress,
        consumers,
        signers,
    })

    // FIXME
    // console.log('final config');
    // console.dir(initData.data);
    const confirm = await ui.input('confirm final config [yN]');
    if (confirm.toLowerCase() !== 'y') {
        return
    }

    const fullOracle = provider.open(
        FullOracle.createFromConfig(
            initData,
            await compile('FullOracle')
        )
    )

    await fullOracle.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(fullOracle.address);

    await ui.write('Contract was deployed.')
}