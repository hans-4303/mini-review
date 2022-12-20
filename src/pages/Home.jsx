import '../css/Home.css'
import React, { useMemo, useEffect, useState } from 'react'
import Slider from "react-slick";
import HomeLink from '../components/HomeLink';

const Home = () => {
  const [time, setTime] = useState(new Date());
  /* 글귀 또는 명언 출력: 배열 안에 여러 문구를 넣어서 출력
  랜덤으로 하나의 값을 정해서 화면에 출력하기: 인덱스를 통해 접근 */
  const [words, setWords] = useState([
    {text: 'anyway, fuck then, now we move the crowd babe', author: '천재노창'},
    {text: '아무 말이나 일단 뱉고 나면 떼창을 하지 봐 임마 젠장 내 통장은 비 올 때마다 축복을 받아', author: '천재노창'},
    {text: '나래가 전화를 받지요 그럼 카니발이 가지요', author: '천재노창'},
  ]);

  const [imageList, setImageList] = useState([
    "background_1.jpg", "background_2.jpg", "background_3.jpg"
  ]);

  /* 페이지가 실행되었을 때 setInterval을 이용하여 시간 값을 1초마다 바꾸기 */
  useEffect(() => {
    setInterval(() => {
        setTime(new Date())
    }, 1000)
  }, [])

  /* 시계 내용을 출력하는 함수: return 값으로 시간을 문자열로 돌려주려 함 */
  const printClock = () => {
    /* 숫자 데이터를 문자로 캐스팅하고, 문자 데이터에 0을 채우면서 사용 */
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    return (
      `${hours} : ${minutes} : ${seconds}`
    );
  }

  /* 글귀를 랜덤하게 출력하는 메서드 작성, 배열의 인덱스만큼 지정되도록 하기 */
  const printWord = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
        <div>
        <Slider {...settings}>
          {/* {imageList.map((image) => (<div><img style={{width: "100%"}} src={require(`../img/${image}`)} alt="" /></div>))} */}
          {imageList.map((image, index)=>( 
            /* 컨테이너 요소 하나 차이 때문에 배경이 화면에 안 보이게 됐다? */
                <div key={index}>
                  <div 
                    style={{
                      width:"100%", 
                      height:"100vh",
                      backgroundImage : 'url('+require("../img/"+image)+')',
                      backgroundSize : "cover"
                    }}>
                    </div>
                </div>))}
        </Slider>
        </div>
        <div className='home-main'>
          <h1>{printClock()}</h1>
          <p>{printWord.text}</p>
          <p>{printWord.author}</p>
        </div>

        <HomeLink></HomeLink>
    </div>
  )
}

export default Home