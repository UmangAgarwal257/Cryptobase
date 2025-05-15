import { CoinSearch } from "../components/CoinSearch"
import type { Coin } from "../types/Coin"

interface HomeProps {
  coins : Coin[]
}

export const Home = ({coins} : HomeProps) => {
  return (
    <div>
      <CoinSearch coins = {coins}/>
    </div>
  )
}
