import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: 700, height: 600 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

const itemData = [
  {
    img: 'https://www.qsac.com.au/getattachment/lower-boxes/Indoor-Sports-Arena/Indoor-Sports-Arena-Scroll-(1).jpg.aspx',
    title: 'BasketBallCourt',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://th.bing.com/th/id/OIP.o4ixrUW_fVAiSgK1ertMUQHaE6?pid=ImgDet&rs=1',
    title: 'TableTennis',
  },
  {
    img: 'https://www.foreverfit.in/wp-content/uploads/2017/07/bigstock-Table-Tennis-Player-5089937-e1504527821357.jpg',
    title: 'TableTennis',
  },
  {
    img: 'https://wallpapercave.com/wp/wp2302436.jpg',
    title: 'Badminton',
    cols: 2,
  },
  {
    img: 'https://www.jupiterroofing.in/imgs/FABRIC/sp2.jpg',
    title: 'Badminton',
    cols: 2,
  },
  {
    img: 'https://patch.com/img/cdn20/users/22253522/20161114/072431/styles/raw/public/article_images/badminton-9946-1479126262-8291.jpg?width=984',
    title: 'Badminton player',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://th.bing.com/th/id/OIF.BXHutLHlELhruwSiXGcMZA?pid=ImgDet&rs=1',
    title: 'Basketballkids',
  },
  {
    img: 'https://th.bing.com/th/id/OIP.K5_iofG7k1BNaR4XyvXEDwHaFi?pid=ImgDet&rs=1',
    title: 'Cricket',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://i.pinimg.com/originals/ba/fd/9b/bafd9bca9eb81decd7ddca46070290dc.jpg',
    title: 'Cricket',
  },
  {
    img: 'https://th.bing.com/th/id/OIP.K4lFSnPEzMoCtFL6_dDhPgHaFl?w=272&h=206&c=7&r=0&o=5&pid=1.7',
    title: 'Cricketbats',
  },
  {
    img: 'https://i.ytimg.com/vi/SyMSSdFK5OU/maxresdefault.jpg',
    title: 'Cricketplayer',
    cols: 2,
  },
]
