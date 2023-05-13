const games = [];

const covers = [
  {
    "id": "c1Jp-fo53U8",
    "src": "https://images.unsplash.com/photo-1499002238440-d264edd596ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "lavender field"
  },
  {
    "id": "LNYdZutqsi0",
    "src": "https://images.unsplash.com/photo-1496769336828-c522a3a7e33c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "shallow focus photography of grass leaf"
  },
  {
    "id": "y2azHvupCVo",
    "src": "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "landscape photography of black mountain"
  },
  {
    "id": "XxvXRmsH860",
    "src": "https://images.unsplash.com/photo-1462216589242-9e3e00a47a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "white dandelion closeup photography"
  },
  {
    "id": "6ArTTluciuA",
    "src": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "body of water under sky"
  },
  {
    "id": "-rSka4Bw-EU",
    "src": "https://images.unsplash.com/photo-1475656106224-d72c2ab53e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "green grass during golden hour"
  },
  {
    "id": "bBiuSdck8tU",
    "src": "https://images.unsplash.com/photo-1491147334573-44cbb4602074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "green and white leafed plants"
  },
  {
    "id": "lsoogGC_5dg",
    "src": "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "silhouette of trees near body of water during sunset"
  },
  {
    "id": "UCd78vfC8vU",
    "src": "https://images.unsplash.com/photo-1472396961693-142e6e269027?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "two brown deer beside trees and mountain"
  },
  {
    "id": "v4bkVOl1sTI",
    "src": "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "shallow focus photography of tree with pink flowers"
  },
  {
    "id": "BXasVMRGsuo",
    "src": "https://images.unsplash.com/photo-1508669232496-137b159c1cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "aerial view of brown fores and black mountains"
  },
  {
    "id": "WJkc3xZjSXw",
    "src": "https://images.unsplash.com/photo-1473773508845-188df298d2d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "low angle photo of pine trees"
  },
  {
    "id": "Zm2n2O7Fph4",
    "src": "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "landscape photography of field"
  },
  {
    "id": "8Ogfqvw15Rg",
    "src": "https://images.unsplash.com/photo-1513553404607-988bf2703777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "iPhone wallpaper"
  },
  {
    "id": "tMzCrBkM99Y",
    "src": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "black concrete road surrounded by brown rocks"
  },
  {
    "id": "UFnHt94r91w",
    "src": "https://images.unsplash.com/photo-1527701963793-33e969bca5ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "green trees"
  },
  {
    "id": "hpTH5b6mo2s",
    "src": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "assorted hot air balloons flying at high altitude during daytime"
  },
  {
    "id": "ugnrXk1129g",
    "src": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "aerial photo of green trees"
  },
  {
    "id": "hX_hf2lPpUU",
    "src": "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "green leaf"
  },
  {
    "id": "v4e3JI7DDHI",
    "src": "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "empty road between trees on forest"
  },
  {
    "id": "tGTVxeOr_Rs",
    "src": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "green leaf tree under blue sky"
  },
  {
    "id": "gooBgyq17i0",
    "src": "https://images.unsplash.com/photo-1544084944-15269ec7b5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "trees on hill under yellow sky at daytime"
  },
  {
    "id": "4rDCa5hBlCs",
    "src": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "low angle photography of trees at daytime"
  },
  {
    "id": "mOcdke2ZQoE",
    "src": "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "body of water wave photo during golden time"
  },
  {
    "id": "2RJB9Euaj7M",
    "src": "https://images.unsplash.com/photo-1507692812060-98338d07aca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "a close up of a rock formation in the desert"
  },
  {
    "id": "-G3rw6Y02D0",
    "src": "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "trees under cloudy sky during sunset"
  },
  {
    "id": "-SO3JtE3gZo",
    "src": "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "green hills with forest under cloudy sky during daytime"
  },
  {
    "id": "Bkci_8qcdvQ",
    "src": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "green mountain across body of water"
  },
  {
    "id": "IicyiaPYGGI",
    "src": "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "orange flowers"
  },
  {
    "id": "hnw3Al47-KE",
    "src": "https://images.unsplash.com/photo-1553114836-026cecec9778?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDgwNDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM5ODgyNDh8&ixlib=rb-4.0.3&q=80&w=1080",
    "alt": "trees surrounded by body water during daytime"
  },
  {
    "id": "C3T8KTZxTFM",
    "src": "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "alt": "person's left palm about to catch black dice"
  }
]


for (let i = 1; i < 31; i++) {
  const id = covers[i]?.id
  const src = covers[i]?.src
  const alt = covers[i]?.alt

  const game = {
    id,
    cover: {
      src,
      alt
    },
    title: alt,
    rating: (Math.random() * 4 + 1).toFixed(1),
    price: (Math.random() * 50).toFixed(2), 
    tags: [`tag${i % 5 + 1}`, `tag${i % 3 + 1}`]
  };

  games.push(game);
}

  
export default async function handler(req, res) {
  
  if (req.method === 'GET') {
    res.status(200).json(games)
  } else {
    res.status(405).end(); // 返回错误状态码，表示不支持的请求方法
  }
}
  