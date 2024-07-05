import { toNano, beginCell, Dictionary, Address } from '@ton/core';
import { compile, NetworkProvider } from '@ton/blueprint';
import NatLend from '../wrappers/Main';

export async function run(provider: NetworkProvider) {

    const sender = provider.sender();
    const admin: Address = sender.address!;

    const ltv = 75,
        liquidationThreshold = 80,
        liquidationBonus = 5,
        borrowingEnabled = 1,
        isActive = 1,
        liquidityRate = 1900000000,
        variableBorrowRate = 3200000000;

    const configuration = beginCell()
        .storeUint(ltv, 64)
        .storeUint(liquidationThreshold, 64)
        .storeUint(liquidationBonus, 64)
        .storeUint(borrowingEnabled, 64)
        .storeUint(isActive, 64)
        .storeUint(liquidityRate, 64)
        .storeUint(variableBorrowRate, 64)
        .endCell();

    const ondaCode = await compile('Main');

    const owner_address = Address.parse('0QAZWpJf_wKa71UQJ49e2exbTbvHaz67f4Ip8NIyXquH-Kdc');

    const oracle = Address.parse('kQDrEv0CxTpE8jLWjUSEO2mVoWmvatqv7ICK9LKg0riCJZGr');

    const jetton_wallet_x_address = Address.parse('kQCrk8qF6cVq8wJef_zYH9tjJm9VePINjEe6dBVbnIXMHuBn');

    const minter_otoken_address = Address.parse('kQDQw9-8FGsa7kI4evxi0C0lOvHoQVtVXuie2QuUWk2foxUE');

    const jetton_wallet_otoken_address = Address.parse('kQANz-TU8DSRVyYRZKkxrSSsUpJ0iD9fsCScntVW0jBxed3V');

    const onda = provider.open(
        NatLend.createForDeploy(
            ondaCode,
            jetton_wallet_x_address,
            minter_otoken_address,
            jetton_wallet_otoken_address,
            oracle,
            owner_address,
            configuration,
        ),
    );

    await onda.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(onda.address);
}
