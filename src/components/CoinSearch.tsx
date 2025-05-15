import type { Coin } from "../types/Coin";
import { CoinItem } from "./CoinItem"

interface CoinSearchProps {
  coins: Coin[];
}

export const CoinSearch = ({coins} : CoinSearchProps) => {
    console.log(coins)
  return (
    <div>
        <div>
            <h1>Search Crypto</h1>
            <form>
                <input type="text" placeholder="Search a coin" className="w-full h-10 p-2 bg-primary text-accent border border-secondary rounded-2xl shadow-xl"/>
            </form>
        </div>

        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>#</th>
                    <th>Coin</th>
                    <th></th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>24h Volume</th>
                    <th>Market Cap</th>
                    <th>Last 7 Days</th>
                </tr>
            </thead>
            <tbody>
                {coins.map((coin) => (
                    <CoinItem key={coin.id} coin={coin}/>
                ))}
            </tbody>
        </table>
    </div>
  )
}
