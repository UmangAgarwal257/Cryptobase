import { CoinSearch } from "../components/CoinSearch"
import { Trending } from "../components/Trending"
import type { Coin } from "../types/Coin"

interface HomeProps {
  coins : Coin[]
}

export const Home = ({coins} : HomeProps) => {
  return (
    <div>
      <CoinSearch coins = {coins}/>
      <Trending/>
    </div>
  )
}
