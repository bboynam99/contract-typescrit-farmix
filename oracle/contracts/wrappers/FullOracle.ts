import {Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode} from "@ton/core";
import {FullOracleInitData} from "../src/full-oracle/FullOracleInitData";


export class FullOracle implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

    static createFromAddress(address: Address) {
       return new FullOracle(address);
    }

    static createFromConfig(initData: FullOracleInitData, code: Cell, workchain = 0) {
        const data = initData.toCell();
        const init = { code, data };
        return new FullOracle(contractAddress(workchain, init), init);;
    }


    async sendDeploy(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        })
    }
}