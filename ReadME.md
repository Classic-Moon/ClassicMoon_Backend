# classicmoon-backend

## API

```text
get
/api/graph/getPriceHistory
startTime
endTime

return: [
    {
        timestamp,
        luncPrice,
        clsmPrice,
        ustcPrice,
    }
]

get
/api/price/getPrices
    timestamp

return: {
    timestamp,
    luncPrice,
    clsmPrice,
    ustcPrice,
}
```
