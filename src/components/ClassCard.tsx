
/* import "@/src/blocks/class.css"; */
import React from "react";
import { Dimensions, Linking, Pressable, StyleSheet, Text, View } from "react-native";

interface ClassItem {
  title: string;
  description: string;
  meetLink: string;
}

interface ClassCardProps {
  isLoggedIn: boolean;
  item: ClassItem;
  handleJoinClick: () => void;
}

const {width} = Dimensions.get('window');

function ClassCard({ isLoggedIn, item, handleJoinClick }: ClassCardProps) {
  return (
    <View style={styles.classCardContent}>
      <Text style={styles.classCardTitle}>{item.title}</Text>
      <Text style={styles.classCardLabel}>Description:</Text>
      <Text style={styles.classCardDescription}>{item.description}</Text>
      {isLoggedIn ? (
        <View style={styles.linkSection}>
          <Pressable onPress={() => Linking.openURL(item.meetLink)}>
            <Text style={styles.classCardLink}>Google Meet Link</Text>
          </Pressable>
        </View>
      ) : (
       <Pressable style={({ pressed }) => [
    styles.classCardJoinButton,
    { opacity: pressed ? 0.5 : 1 }
  ]} onPress={handleJoinClick}>
          <Text style={styles.joinButtonText}>Join</Text>
        </Pressable>
      )}
    </View>
  );
}

export default ClassCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: width * 0.55, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  classCardContent: { backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '50%',  
    aspectRatio: 1,           
    borderRadius: 1000, 
    borderWidth: 2,
    borderColor: 'rgba(89, 206, 89, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%' },
  classCardTitle: { fontFamily: "LondrinaSolid-Light",
    fontWeight: "300",
    fontSize: 24, 
    color: 'yellow',
    textAlign: 'center',
    padding: 10,},
  classCardLabel: { fontFamily: "LondrinaSolid-Thin",
    fontWeight: "100",
    fontSize: 22,
    color: '#fff', 
    paddingHorizontal: 10, },
  classCardDescription: { fontFamily: "LondrinaSolid-Thin",
    fontWeight: "100",
    fontSize: 18,
    color: '#fff',
    padding: 10,
    textAlign: 'center',},
  linkSection: { width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  classCardLink: { fontFamily: "LondrinaSolid-Light",
    fontWeight: "300",
    fontSize: 22,
    color: 'blue',
    textAlign: 'center', },
  classCardJoinButton: { backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'rgba(89, 206, 89, 0.35)',
    borderRadius: 8,
    padding: 10,
    marginTop: 10, },
  joinButtonText: { color: 'white',
    fontFamily: "LondrinaSolid-Light",
    fontWeight: "300",
    fontSize: 24,
    textAlign: 'center', },
});