import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { Sparklines, SparklinesLine } from "react-sparklines-typescript"
import type { MarketCoin } from "../types/Coin"
import { Link } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"


export const CoinItem = ({coin} : { coin: MarketCoin }) => {
  const { user, watchList, addToWatchList, removeFromWatchList } = UserAuth();
  const isSaved = watchList.some((c) => c.id === coin.id);

  const handleStarClick = () => {
    if (!user) return;
    if (isSaved) {
      removeFromWatchList(coin.id);
    } else {
      addToWatchList(coin);
    }
  };

  return (
    <tr className="h-[80px] border-b overflow-hidden" key={coin.id}>
        <td>
          <button onClick={handleStarClick} disabled={!user} title={user ? (isSaved ? 'Remove from Watchlist' : 'Add to Watchlist') : 'Sign in to use Watchlist'}>
            {isSaved ? <AiFillStar className="text-accent"/> : <AiOutlineStar />}
          </button>
        </td>
        <td>{coin.market_cap_rank}</td>
        <td>
            <Link to={`/coin/${coin.id}`} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <img className="w-6 mr-2 rounded-full" src={coin.image} alt={coin.id} />
                <p className="hidden sm:table-cell">{coin.name}</p>
            </div>
            </Link>
        </td>
        <td>{coin.symbol.toUpperCase()}</td>
        <td>{coin.current_price.toLocaleString()}</td>
        <td>
            <span className={`font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.price_change_percentage_24h > 0 ? '+' : ''}
                {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
        </td>
        <td className="w-[180px] hidden md:table-cell">${coin.total_volume.toLocaleString()}</td>
        <td className="w-[180px] hidden sm:table-cell">${coin.market_cap.toLocaleString()}</td>
        <td>
            <Sparklines data={coin.sparkline_in_7d.price} width={100} height={20}>
                <SparklinesLine color="teal" />
            </Sparklines>
        </td>
    </tr>
  )
}
