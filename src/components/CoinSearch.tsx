import { useState } from "react";
import type { Coin } from "../types/Coin";
import { CoinItem } from "./CoinItem"

interface CoinSearchProps {
  coins: Coin[];
}

export const CoinSearch = ({coins} : CoinSearchProps) => {
    const[searchText, setSearchText] = useState<string>("")

  return (
    <div className="rounded-div my-4">
        <div className="flex flex-col md:flex-row text-center justify-between pt-4 pb-6 md:text-right">
            <h1 className="text-2xl font-bold my-2">Search Crypto</h1>
            <form>
                <input 
                onChange={(e) => setSearchText(e.target.value)} 
                className="w-full px-4 py-2 bg-primary text-accent border border-input rounded-2xl shadow-xl"
                type="text" 
                placeholder="Search a coin" 
                />
            </form>
        </div>

        <table className="w-full border-collapse text-center">
            <thead>
                <tr>
                    <th></th>
                    <th className="px-4">#</th>
                    <th className="text-left">Coin</th>
                    <th></th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th className="hidden md:table-cell">24h Volume</th>
                    <th className="hidden md:table-cell">Market Cap</th>
                    <th>Last 7 Days</th>
                </tr>
            </thead>
            <tbody>
                {coins.filter((value) => {
                    if(searchText === "") {
                        return value
                    } else if(value.name.toLowerCase().includes(searchText.toLowerCase())) {
                        return value
                    }
                }).map((coin) => (
                    <CoinItem key={coin.id} coin={coin}/>
                ))}
            </tbody>
        </table>
    </div>
  )
}
