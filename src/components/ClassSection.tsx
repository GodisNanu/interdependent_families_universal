import { useEffect, useState } from "react";
/* Will need to swap out react-slick */
/* import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css"; */
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import ClassCard from "./ClassCard";
/* import "@/src/blocks/class.css"; */
import { getClasses } from "@/src/utils/googleCalendarApi";

interface ClassItem {
  id: string;
  title: string;
  description: string;
  meetLink: string;
}

interface ClassSectionProps {
  isLoggedIn: boolean;
  handleJoinClick: () => void;
}

const {width} = Dimensions.get("window");

function ClassSection({ isLoggedIn, handleJoinClick }: ClassSectionProps) {
  const [data, setData] = useState<ClassItem[]>([]);

  useEffect(() => {
    getClasses()
      .then((data) => {
        const allClasses: any[] = data.items || [];
        const classData: ClassItem[] = allClasses.filter((event) => event.summary).map((event) => ({
          id: event.id,
          title: event.summary,
          description: event.description || "No description",
          meetLink: event.hangoutLink || "",
        })); 
        setData(classData);
        }).catch(console.error);
  }, []);

  /* const settings = {
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
  }; */

  return (
    <View style={styles.classSection}>
      <Text style={styles.classSectionHeader}>Fall 2025 Classes</Text>
    <View style={styles.carouselContainer}>
    <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal 
        snapToAlignment="center"
        snapToInterval={width * 0.45} 
        decelerationRate="fast"
        contentContainerStyle={styles.listPadding}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ClassCard
              isLoggedIn={isLoggedIn}
              item={item}
              handleJoinClick={handleJoinClick}
            />
            
          </View>
        )}
        />
        </View>
    </View>
  );
}

export default ClassSection;

const styles = StyleSheet.create({
  classSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  classSectionHeader: {
    fontFamily: 'LondrinaSolid-Light', 
    fontWeight: '300',
    fontSize: 48,
    padding: 26,
    width: '100%',
    textAlign: 'center',
    color: 'blue',
  },
  carouselContainer: {
    // .class__carousel-feature
    width: '90%',
    alignSelf: 'center', 
  },
  listPadding: {
    paddingHorizontal: width * 0.1, 
  },
  cardWrapper: {
    width: width * 0.8, 
    marginHorizontal: 10,
  },
  cardContent: {
    // .class__card-content
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '90%',
    
    aspectRatio: 1, 
    borderRadius: 999, 
    alignSelf: 'center',
    paddingTop: 20,
    borderWidth: 2,
    borderColor: 'rgba(89, 206, 89, 0.35)',
    justifyContent: 'center', 
    alignItems: 'center',    
  },
});
