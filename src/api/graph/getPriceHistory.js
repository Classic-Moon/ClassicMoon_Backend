const graph = require('../../db/graph');

module.exports = async (req_, res_) => {
    console.log("getPriceHistory: ", req_.query);
    const startTime = req_.query.startTime
    const endTime = req_.query.endTime

    console.log("startTime", startTime)
    console.log("endTime", endTime)

    if (!startTime || !endTime) {
        console.log("null: ", !startTime, !endTime);
        return res_.send({ result: false, status: "FAIL", message: "timestamp fail" });
    }

    try {
        const graphItems = await graph.find({ timestamp: {$gte: startTime, $lte: endTime} }).sort({timestamp: 1});
        console.log("graphItem: ", graphItems)

        if (graphItems) {
            return res_.send({
                result: graphItems,
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
