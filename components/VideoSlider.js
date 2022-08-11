import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import YouTube from "react-youtube";
import "node_modules/slick-carousel/slick/slick.css";
import "node_modules/slick-carousel/slick/slick-theme.css";

const VideoSlider = ({ list }) => {
  const [dragging, setDragging] = useState(false);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onClick = (e, obj) => {
    if (dragging) {
      e.stopPropagation();
      return;
    }
  };

  const video_opts = {
    width: "350",
    height: "220",
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    draggable: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    cssEase: "linear",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider_bg">
      <div className="slider_wrap">
        <Slider {...settings}>
          {list.map((video) => (
            <div className="video_wrap" key={video.id}>
              <YouTube
                key={video.id}
                videoId={video.key}
                opts={{ ...video_opts }}
                onEnd={(e) => {
                  e.target.stopVideo(0);
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <style jsx global>
        {`
          .slider_wrap {
            overflow: visible;
            position: relative;
            width: calc(100vw - 8vw - 24px);
          }
          .slick-list {
            overflow: visible;
          }
          .slick-track {
            margin-left: 0;
          }
          .slick-slide {
            padding: 0 30px 0 0;
          }
          .video_wrap {
            position: relative;
            padding-bottom: 56%;
            max-width: 550px;
          }
          iframe {
            position: absolute;
            width: 100% !important;
            height: 100% !important;
          }
        `}
      </style>
    </div>
  );
};

export default VideoSlider;