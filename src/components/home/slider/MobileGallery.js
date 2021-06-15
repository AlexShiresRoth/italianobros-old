import React, { createRef, useEffect, useRef, useState } from "react"
import style from "./MobileGallery.module.scss"
const MobileGallery = ({ sliderImgs, reset }) => {
  let timeID

  const [currentIndex, setIndex] = useState(1)

  const [max, setMax] = useState(0)

  const indexChange = () => {
    //once transition is complete allow for next slide

    if (currentIndex >= max) {
      setIndex(1)
    }
    if (currentIndex <= 0) {
      setIndex(sliderImgs.length - 2)
    }
  }

  useEffect(() => {
    timeID = setTimeout(() => {
      setIndex(prevIndex => prevIndex + 1)
    }, 7000)

    return () => clearTimeout(timeID)
  }, [currentIndex])

  useEffect(() => {
    indexChange()
  }, [currentIndex])

  useEffect(() => {
    if (sliderImgs.length > 0) {
      setMax(sliderImgs.length - 1)
    }
  }, [sliderImgs])

  return (
    <>
      <div className={style.overlay} />

      <div className={style.slider}>
        <div className={style.inner}>
          {sliderImgs.map((img, i) => {
            return (
              <div
                className={
                  currentIndex === i
                    ? style.imgContainer
                    : style.imgContainer__hidden
                }
                key={i}
              >
                <img src={img.url} alt="work" />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default MobileGallery
