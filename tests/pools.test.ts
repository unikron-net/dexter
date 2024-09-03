import {
    Asset,
    BlockfrostConfig,
    BlockfrostProvider,
    Dexter,
    LiquidityPool,
    MockWalletProvider,
    RequestConfig,
} from '../src';

describe('Pools', () => {

    const blockfrostKey = process.env.BLOCKFROST_MAINNET_KEY || '';

    it('Finds the Blockfrost key', () => {
        expect(blockfrostKey).toBeTruthy();
    });

    const blockfrostConfig: BlockfrostConfig = {
        url: 'https://cardano-mainnet.blockfrost.io/api/v0',
        projectId: blockfrostKey,
    };

    const blockfrostProvider: BlockfrostProvider = new BlockfrostProvider(blockfrostConfig);

    const dexter: Dexter = (new Dexter())
        .withDataProvider(blockfrostProvider);

    const gens: Asset = new Asset('dda5fdb1002f7389b33e036b6afee82a8189becb6cba852e8b79b4fb', '0014df1047454e53', 6);

    it('Finds GENS pools', async () => {
        const pools = await dexter
            .newFetchRequest()
            .onAllDexs()
            .forTokens([gens])
            .getLiquidityPools();
        console.log('GENS Pools:', pools);
        expect(pools.length).toBeGreaterThan(0);
    }, 600000);

});
