import {Address, beginCell, Cell, serializeTuple} from "@ton/core";
import {bigintAddressHash, createTupleItems} from "../ton-utils";


 interface IFullOracleInitData {
    halted: boolean
    minRequestAmount: bigint
    cacheTtl: number
    requestDataWalletAddress: Address
    adminAddress: Address
    signerCountThreshold: number
    consumers: Address[]
    signers: string[]
    initialTimestamp: number
}

export interface FullOracleConfig extends Partial<IFullOracleInitData> {}

export class FullOracleInitData {
     constructor(readonly data: IFullOracleInitData) {}

    toCell(): Cell {
        const consumerHashes = this.data.consumers.map(bigintAddressHash);
        const consumersTuple = createTupleItems(consumerHashes);
        const signersTuple = createTupleItems(this.data.signers);


        return beginCell()
            .storeBit(this.data.halted)
            .storeUint(this.data.minRequestAmount, 32)
            .storeUint(this.data.cacheTtl, 32)
            .storeAddress(this.data.requestDataWalletAddress)
            .storeAddress(this.data.adminAddress)
            .storeUint(this.data.signerCountThreshold, 8)
            .storeRef(serializeTuple(signersTuple))
            .storeRef(serializeTuple(consumersTuple))
            .storeRef(beginCell()
                .storeUint(this.data.initialTimestamp, 8 * 6)
                .endCell()
            )
        .endCell()
    }
}