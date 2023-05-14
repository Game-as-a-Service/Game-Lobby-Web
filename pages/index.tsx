import { SyntheticEvent } from "react";
import { GetStaticProps } from "next";
import Card from "@/shared/components/Card";
import axios from 'axios';

type Game = {
  id: string;
  cover: {
    src: string;
    alt: string;
  }
  title: string;
  price: number;
  rating: number;
  tags: string[];
}

export default function Home({ games }: { games: Game[] }) {

  // check actions
  const handleCardActions = (e: SyntheticEvent, type: string) => {
    switch(type) {
      case 'create':
        console.log('create new room');
        break;
      case 'join':
        console.log('join room');
        break;
      default:
        console.log('game id detail', type.split('-')[1]);
    }
  }

  return (
    <>
      <h1>遊戲大廳！</h1>
      
      <div 
        className="mx-auto grid grid-auto-fit gap-2.5 my-5 h-full"
      >
        {games ? (
          games.map((game) => (
            <Card 
              className="w-full h-full"
              key={game.id}
              {...game}
              onClick={handleCardActions}
            />
          ))
        ): null}
        
      </div>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {},
//   };
// };

export async function getServerSideProps() {
  
  try {
    const apiUrl = 'http://localhost:3030/api/games';
    const response = await axios.get(apiUrl);
    
    if (response.status === 200) {
      return {
        props: {
          games: response.data,
        },
      };
    }

  } catch (error) {
    console.error('請求錯誤', error);
    return {
      props: {}
    }
  }
}
