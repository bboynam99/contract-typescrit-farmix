import { Address, beginCell, fromNano, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { op, query } from '../wrappers/common';

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();

    console.info('Lend');

    const addressString = await ui.input('Enter the friendly address of the contract');
    const amount = await ui.input('Enter the withdraw amount in USDT');

    const confirm = await ui.input(`Send ${fromNano(toNano(amount))} USDT ? [yN]`);
    if (confirm.toLowerCase() !== 'y') {
        return;
    }

    await provider.sender().send({
        value: toNano(amount),
        to: Address.parse(addressString),
        body: beginCell().storeUint(op.TransferNotification, 32).storeUint(query.deleteDeposit, 64).endCell(),
    });

    ui.write('Done');
}
