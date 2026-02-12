import React from "react";
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import advertisement from "@/assets/images/IFMembershipOptions.png";
import heroImage from "@/assets/images/Interdependent-Families-Tree.png";
import ClassSection from "@/src/components/ClassSection";

const screenWidth = Dimensions.get('window').width;
interface HomepageProps {
  isLoggedIn : boolean;
  handleJoinClick: () => void;
}
function Homepage({ isLoggedIn, handleJoinClick }: HomepageProps) {
  return (
   
      <ScrollView style={styles.homepage} contentContainerStyle={{alignItems: "center"}}>
        <View style={styles.heroSection}>
        <Image source={heroImage} style={styles.heroImage} />
        </View>
        <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>
            About Our Homeschool Co-op{" "}
          </Text>
          <Text style={styles.aboutSectionDescription}>
            We are a group of homeschooling families dedicated to learning from
            and with one another to provide a richer experience for our
            children.
          </Text>
          <Text style={styles.aboutSectionDescription}>
            Families choose to homeschool for many reasons: to gain agency,
            offer culturally relevant education, protect children from
            discrimination and bias, provide a safer learning environment, and
            nurture a child’s holistic identity and mental well-being.
            </Text>
          <Text style={styles.aboutSectionDescription}>
            Homeschooling can be challenging, especially for American families
            with children who have special needs or who come from marginalized
            communities. Our virtual homeschool co-op, Interdependent Families,
            provides a much-needed supportive community.
            </Text>
          <Text style={styles.aboutSectionDescription}>
            Interdependent Families was created specifically for marginalized
            families who require additional support and accommodations that are
            often overlooked.
            </Text>
          <Text style={styles.aboutSectionDescription}>
            To maintain this safe space, we require an application and approval
            process for membership. Preference will be given to marginalized
            families.
            </Text>
          <Text style={styles.aboutSectionDescription}>
            Our goal is to build an inclusive future we can all be proud of by
            providing a safe space free from oppression and bias.
            </Text>
        </View>
        <View style={styles.availableClasses}>
          <ClassSection
            isLoggedIn={isLoggedIn}
            handleJoinClick={handleJoinClick}
          />
        </View>
        <View style={styles.membershipSection}>
        <TouchableOpacity onPress={handleJoinClick}>
          <Image source={advertisement} style={styles.membershipImage} />
          /* switch to Cards Slider */
        </TouchableOpacity>
      </View>
      </ScrollView>
    
  );
}

export default Homepage;

const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1A1A1A",
    paddingTop: Platform.OS === 'web' ? 150: 80, 
    minHeight: Dimensions.get("window").height,
  },
  heroSection: {
    width: "100%",
    alignItems: 'center', 
    justifyContent: 'center',
  },
  heroImage: {
    width: screenWidth, 
    height: screenWidth * 0.6, 
    resizeMode: "contain", 
    backgroundColor: '#1A1A1A',
  },
  aboutSection: {
    backgroundColor: "#1A1A1A",
    padding: 26,
  },
  aboutSectionTitle: {
    
    fontFamily: Platform.OS === 'web' ? "LondrinaSolid-Black" : undefined, 
    fontWeight: "900",
    fontSize: Platform.OS === 'web' ? 48 : 28, 
    color: "rgba(255, 255, 255, 1)",
    padding: 26,
    textAlign: "center",
  },
  aboutSectionDescription: {
    fontFamily: Platform.OS === 'web' ? "LondrinaSolid-Light" : undefined,
    fontWeight: "300",
    fontSize: Platform.OS === 'web' ? 38 : 18, 
    color: "rgba(255, 255, 255, 1)",
    padding: 26,
    width: "80%",
    alignSelf: 'center', 
    textAlign: "justify",
  },
  availableClasses: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    marginVertical: 26, 
  },
  membershipSection: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  membershipImage: {
    width: screenWidth,
    height: screenWidth * 1.2, 
    resizeMode: "contain",
    
  },
});