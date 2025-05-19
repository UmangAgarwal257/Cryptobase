import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  rank: number;
}

const SavedCoin: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (!user?.email) return;
    const unsub = onSnapshot(doc(db, 'users', `${user.email}`), (docSnap) => {
      setCoins(docSnap.data()?.watchList || []);
    });
    return () => unsub();
  }, [user?.email]);

  const coinPath = user?.email ? doc(db, 'users', `${user.email}`) : null;

  const deleteCoin = async (passedId: string) => {
    if (!coinPath) return;
    try {
      const result = coins.filter((item) => item.id !== passedId);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log('An unknown error occurred.');
      }
    }
  };

  return (
    <div>
      {coins.length === 0 ? (
        <p>You don't have any coins saved. Please save a coin to add it to your watch list. <Link to="/">Click here to search coins.</Link></p>
      ) : (
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th className="px-4">Rank #</th>
              <th className="text-left">Coin</th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="h-[60px] overflow-hidden">
                <td>{coin.rank}</td>
                <td>
                  <Link to={`coin/${coin.id}`}>
                    <div className="flex items-center">
                      <img src={coin.image} alt={coin.name} className="w-8 mr-4" />
                      <div>
                        <p className="hidden sm:table-cell">{coin.name}</p>
                        <p className="text-gray-500 text-left text-sm">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="pl-8">
                  <AiOutlineClose className="cursor-pointer" onClick={() => deleteCoin(coin.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;
