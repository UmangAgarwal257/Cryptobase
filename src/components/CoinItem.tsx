import { AiOutlineStar } from "react-icons/ai"
import { Sparklines, SparklinesLine } from "react-sparklines-typescript"
import type { Coin } from "../types/Coin"


export const CoinItem = ({coin} : { coin: Coin }) => {
  return (
    <tr key={coin.id}>
        <td><AiOutlineStar/></td>
        <td>{coin.market_cap_rank}</td>
        <td>
            <div>
                <img src={coin.image} alt={coin.id} />
                <p>{coin.name}</p>
            </div>
        </td>
        <td>{coin.symbol}</td>
        <td>{coin.current_price}</td>
        <td>{coin.price_change_percentage_24h}%</td>
        <td>{coin.total_volume}</td>
        <td>{coin.market_cap}</td>
        <td>
            <Sparklines data={coin.sparkline_in_7d.price} width={100} height={20}>
                <SparklinesLine color="teal" />
            </Sparklines>
        </td>
    </tr>
  )
}
