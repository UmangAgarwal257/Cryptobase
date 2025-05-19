import { CoinSearch } from "../components/CoinSearch"
import { Trending } from "../components/Trending"
import type { MarketCoin } from "../types/Coin"

interface HomeProps {
  coins : MarketCoin[]
}

export const Home = ({coins} : HomeProps) => {
  return (
    <div>
      <CoinSearch coins = {coins}/>
      <Trending/>
    </div>
  )
}
