import { Address, beginCell, fromNano, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { op } from '../wrappers/common';

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();

    console.info('Lend');

    const addressString = await ui.input('Enter the friendly address of the contract');
    const amount = await ui.input('Enter the borrow amount in USDT');

    const confirm = await ui.input(`Send ${fromNano(toNano(amount))} USDT ? [yN]`);
    if (confirm.toLowerCase() !== 'y') {
        return;
    }

    await provider.sender().send({
        value: toNano(amount),
        to: Address.parse(addressString),
        body: beginCell().storeUint(op.NewBorrow, 32).storeUint(0, 64).endCell(),
    });

    ui.write('Done');
}
