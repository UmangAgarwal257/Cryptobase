import axios from "axios"
import { useEffect, useState } from "react"



type TrendingCoin = {
    item: {
        id: string;
        name: string;
        symbol: string;
        small: string;
        price_btc: number;
    };
};

export const Trending = () => {
    const [trending, setTrending] = useState<TrendingCoin[]>([])

    const url = 'https://api.coingecko.com/api/v3/search/trending'
    
    useEffect(() => {
        axios.get(url).then((response) => {
            setTrending(response.data.coins)
            // console.log(response.data.coins)
        })
    }, [url])
    // console.log(trending)

    return (
    <div className="rounded-div my-12 py-8 text-primary">
        <h1 className="text-2xl font-bold py-4">Trending Coins</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.map((coin,idx) => (
                <div key={idx} className="rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex">
                            <img className="mr-4 rounded-full" src={coin.item.small} alt={coin.item.name} />
                            <p className="font-bold">{coin.item.name}</p>
                            <p>{coin.item.symbol}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img className="w-4 m-2" src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="/" />
                        <p>{coin.item.price_btc.toFixed(7)}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
