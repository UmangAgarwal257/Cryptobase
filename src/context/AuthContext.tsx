import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User as FirebaseUser, UserCredential } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import type { MarketCoin } from '../types/Coin';

// Define the context type
interface UserContextType {
  user: FirebaseUser | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  watchList: MarketCoin[];
  addToWatchList: (coin: MarketCoin) => Promise<void>;
  removeFromWatchList: (coinId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [watchList, setWatchList] = useState<MarketCoin[]>([]);

  useEffect(() => {
    if (!user?.email) {
      setWatchList([]);
      return;
    }
    const unsub = onSnapshot(doc(db, 'users', user.email), (docSnap) => {
      setWatchList(docSnap.data()?.watchList || []);
    });
    return () => unsub();
  }, [user]);

  const signUp = async (email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', email), {
          watchList: [],
      });
      return cred;
  };
  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const addToWatchList = async (coin: MarketCoin) => {
    if (!user?.email) return;
    const userRef = doc(db, 'users', user.email);
    await setDoc(userRef, { watchList: [...watchList, coin] }, { merge: true });
  };

  const removeFromWatchList = async (coinId: string) => {
    if (!user?.email) return;
    const userRef = doc(db, 'users', user.email);
    const filtered = watchList.filter((c) => c.id !== coinId);
    await setDoc(userRef, { watchList: filtered }, { merge: true });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ signUp, signIn, logout, user, watchList, addToWatchList, removeFromWatchList }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserAuth must be used within an AuthContextProvider');
  }
  return context;
};