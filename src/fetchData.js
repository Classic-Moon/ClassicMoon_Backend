const axios = require('axios')
const { LCDClient } = require('@terra-money/terra.js');
const graph = require('./db/graph')

const TOKEN_CONTRACT = 'terra1rt0h5502et0tsx7tssl0c8psy3n5lxjvthe3jcgc9d66070zvh7qegu7rk'
const POOL_CONTRACT = 'terra1ffx3j5w2sf6yqysmyyhl2d4j80wxw9k3yxe3exleyjapqccxdg7sny4j8c'
const MAINNET = {
    id: "columbus-5",
    name: "classic",
    chainID: "columbus-5",
    lcd: "https://terra-classic-lcd.publicnode.com",
}

const CMC_API_KEYS = {
    mickey: '88ef5ccd-c342-4c22-a32a-0bdc1ec5d474', // topdirector2017@gmail.com
    prince: 'b7496d54-f528-42e0-89c1-ac043780d3c9', // cryptosnowprince@gmail.com
    cavelion: '1cf75c05-ff2a-4775-8a26-9905ac4d4608' // cavelionhunter@gmail.com
}

const terraClient = new LCDClient({
    URL: MAINNET.lcd,
    chainID: MAINNET.chainID,
    isClassic: true,
})

const getLuncBalance = async (account) => {
    try {
        const [luncBalanceData] = await terraClient?.bank.balance(account)
        const luncBalance = luncBalanceData.toData().find(item => item.denom === 'uluna').amount
        return luncBalance;
    } catch (error) {
        console.log("getNativeBalances err", error)
        return 0;
    }
}

const getTokenBalance = async (tokenAddress, account) => {
    try {
        const ret_balance = await terraClient?.wasm.contractQuery(
            tokenAddress,
            {
                balance: {
                    address: account
                }
            }
        )
        return ret_balance?.balance
    } catch (error) {
        console.log("getTokenBalance err", error)
        return 0;
    }
}

const getLuncPriceInUSD = async () => {
    try {
        const response = await axios.get(
            `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=LUNC`,
            {
                headers: {
                    'X-CMC_PRO_API_KEY': CMC_API_KEYS.prince,
                },
            }
        );

        return response.data.data.LUNC[0].quote.USD.price;
    } catch (error) {
        console.error(error);
    }
}

const getUstcPriceInUSD = async () => {
    try {
        const response = await axios.get(
            `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=USTC`,
            {
                headers: {
                    'X-CMC_PRO_API_KEY': CMC_API_KEYS.cavelion,
                },
            }
        );

        return response.data.data.USTC[0].quote.USD.price;
    } catch (error) {
        console.error(error);
    }
}

let counter = 0
let isRunning = false;

const fetchData = async () => {
    try {
        if (isRunning) {
            return;
        }

        isRunning = true;
        counter++;
        console.log(`===========fetchData counter ${counter}===========`);
        // TODO
        const pooledLunc = await getLuncBalance(POOL_CONTRACT)
        const pooledClsm = await getTokenBalance(TOKEN_CONTRACT, POOL_CONTRACT)
        const luncPriceInUSD = await getLuncPriceInUSD()
        const ustcPriceInUSD = await getUstcPriceInUSD()

        if (pooledLunc && pooledClsm && luncPriceInUSD && ustcPriceInUSD) {
            const clsmPriceInUSD = luncPriceInUSD * pooledLunc / pooledClsm;
            // console.log('luncPriceInUSD', pooledLunc)
            // console.log('luncPriceInUSD', pooledClsm)
            // console.log('luncPriceInUSD', luncPriceInUSD)
            // console.log('clsmPriceInUSD', clsmPriceInUSD)
            // console.log('ustcPriceInUSD', ustcPriceInUSD)
            const graphItem = new graph({
                timestamp: Date.now(),
                luncPrice: luncPriceInUSD,
                clsmPrice: clsmPriceInUSD,
                ustcPrice: ustcPriceInUSD,
            })

            await graphItem.save();
        }
        isRunning = false;
    } catch (error) {
        console.log('fetchData catch error: ', error)
    }
}

module.exports = async () => {
    try {
        console.log("start fetchData");
        setInterval(async () => { await fetchData() }, 300000); // 5 min
    } catch (error) {
        console.log('fetchData catch error: ', error);
    }
}
