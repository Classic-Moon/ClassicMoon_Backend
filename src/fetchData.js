const graph = require('./db/graph')
let counter = 0
let isRunning = false;

const fetchData = async () => {
    try {
        if (isRunning) {
            return;
        }

        isRunning = true;
        counter++;
        console.log(`===========fetchData counter===========${counter}`);
        // TODO
        let luncPrice;
        let clsmPrice;
        let ustcPrice;
        const graphItem = new graph({
            timestamp: Date.now(),
            luncPrice: luncPrice,
            clsmPrice: clsmPrice,
            ustcPrice: ustcPrice,
        })

        try {
            const savedItem = await graphItem.save();
            console.log("new graph object saved: ", savedItem);
        } catch (error) {
            console.log('Error saving item:', error);
        }
        isRunning = false;
    } catch (error) {
        console.log('fetchData catch error: ', error)
    }
}

module.exports = async () => {
    try {
        console.log("start fetchData");
        setInterval(async () => { await fetchData() }, 60000);
    } catch (error) {
        console.log('fetchData catch error: ', error);
    }
}
