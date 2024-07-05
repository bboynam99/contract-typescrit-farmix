import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type AlgebraConfig = {};

export function algebraConfigToCell(config: AlgebraConfig): Cell {
    return beginCell().endCell();
}

export class Algebra implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Algebra(address);
    }

    static createFromConfig(config: AlgebraConfig, code: Cell, workchain = 0) {
        const data = algebraConfigToCell(config);
        const init = { code, data };
        return new Algebra(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
