# classicmoon-backend

## Env

OS: windows 10, ubuntu 20.04, ubuntu 22.04
npm: 8.19.2
node: 16.18.0
yarn: 1.22.19

use yarn

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
