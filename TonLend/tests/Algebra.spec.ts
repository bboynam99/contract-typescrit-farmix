import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Algebra } from '../wrappers/Algebra';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Algebra', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Algebra');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let algebra: SandboxContract<Algebra>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        algebra = blockchain.openContract(Algebra.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await algebra.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: algebra.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and algebra are ready to use
    });
});
