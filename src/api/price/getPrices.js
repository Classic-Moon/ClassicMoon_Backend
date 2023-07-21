const graph = require('../../db/graph');

module.exports = async (req_, res_) => {
    console.log("getPrices: ", req_.query);
    const timestamp = req_.query.timestamp

    console.log("timestamp", timestamp)

    if (!timestamp) {
        console.log("null: ", !timestamp);
        return res_.send({ result: false, status: "FAIL", message: "timestamp fail" });
    }

    try {
        const graphItemLte = await graph.find({ timestamp: { $lte: timestamp } }).sort({ timestamp: -1 }).limit(1);
        console.log("graphItemLte: ", graphItemLte)

        if (graphItemLte) {
            return res_.send({
                result: graphItemLte,
                status: 'SUCCESS',
                message: 'OK'
            });
        } else {
            return res_.send({ result: false, status: 'FAIL', message: 'get dbdata fail' });
        }
    } catch (error) {
        return res_.send({ result: false, status: 'FAIL', message: "get pricedata fail" });
    }
}
