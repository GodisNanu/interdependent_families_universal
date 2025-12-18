import { useEffect, useState } from "react";
/* Will need to swap out react-slick */
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ClassCard from "./ClassCard.jsx";

import "@/src/blocks/class.css";
import { getClasses } from "@/src/utils/googleCalendarApi";

function ClassSection({ isLoggedIn, handleJoinClick }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getClasses()
      .then((data) => {
        const allClasses = data.items;
        const filteredClasses = allClasses.filter((event) => event.summary);
        const classData = filteredClasses.map((event) => {
          return {
            id: event.id,
            title: event.summary,
            description: event.description,
            meetLink: event.hangoutLink,
          };
        });
        setData(classData);
      })
      .catch(console.error);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 200000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="class__section">
      <h2 className="class__carousel-header"> Fall 2025 Classes</h2>
      <div className="class__carousel-feature">
        <Slider {...settings}>
          {data.map((event) => (
            <ClassCard
              key={event.id}
              isLoggedIn={isLoggedIn}
              item={event}
              handleJoinClick={handleJoinClick}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default ClassSection;
