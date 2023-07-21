const graph = require('./db/graph')
const { LCDClient } = require('@terra-money/terra.js');

const TOKEN_CONTRACT = 'terra1rt0h5502et0tsx7tssl0c8psy3n5lxjvthe3jcgc9d66070zvh7qegu7rk'
const POOL_CONTRACT = 'terra1ffx3j5w2sf6yqysmyyhl2d4j80wxw9k3yxe3exleyjapqccxdg7sny4j8c'
const MAINNET = {
    id: "columbus-5",
    name: "classic",
    chainID: "columbus-5",
    lcd: "https://terra-classic-lcd.publicnode.com",
}
const CMC_API_KEY = 'b7496d54-f528-42e0-89c1-ac043780d3c9' // cryptosnowprince@gmail.com
const CMC_API_KEY_2 = '88ef5ccd-c342-4c22-a32a-0bdc1ec5d474' // topdirector2017@gmail.com

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

}

const getUstcPriceInUSD = async () => {

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
        const poolLuncBalance = await getLuncBalance(POOL_CONTRACT)
        const poolClsmBalance = await getTokenBalance(TOKEN_CONTRACT, POOL_CONTRACT)
        console.log("poolLuncBalance: ", poolLuncBalance)
        console.log("poolClsmBalance: ", poolClsmBalance)
        let luncPrice;
        let clsmPrice;
        let ustcPrice;
        // const graphItem = new graph({
        //     timestamp: Date.now(),
        //     luncPrice: luncPrice,
        //     clsmPrice: clsmPrice,
        //     ustcPrice: ustcPrice,
        // })

        // try {
        //     const savedItem = await graphItem.save();
        //     console.log("new graph object saved: ", savedItem);
        // } catch (error) {
        //     console.log('Error saving item:', error);
        // }
        isRunning = false;
    } catch (error) {
        console.log('fetchData catch error: ', error)
    }
}

module.exports = async () => {
    try {
        console.log("start fetchData");
        setInterval(async () => { await fetchData() }, 1000);
        // setInterval(async () => { await fetchData() }, 60000);
    } catch (error) {
        console.log('fetchData catch error: ', error);
    }
}
