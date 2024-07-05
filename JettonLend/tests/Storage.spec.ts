import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Storage } from '../wrappers/Storage';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Storage', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Storage');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let storage: SandboxContract<Storage>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        storage = blockchain.openContract(Storage.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await storage.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: storage.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and storage are ready to use
    });
});
