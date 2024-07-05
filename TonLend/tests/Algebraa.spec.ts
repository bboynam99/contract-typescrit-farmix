import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Algebraa } from '../wrappers/Algebraa';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Algebraa', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Algebraa');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let algebraa: SandboxContract<Algebraa>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        algebraa = blockchain.openContract(Algebraa.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await algebraa.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: algebraa.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and algebraa are ready to use
    });
});
