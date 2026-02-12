/* import "@/src//blocks/footer.css";*/
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get('window');
const isMobile = width <= 1080;

function Footer() {
  return (
    <View style = {styles.footer}>
      <Text style={styles.footer__signature}>
        Developed & Designed by Joanna Hazel
      </Text>
      <Text style={styles.footer__date}> 2025 </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    minHeight: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  }, 
  footer__signature: {
    fontFamily: 'londrinaSolid-Thin',
    fontWeight: '100',
    fontSize: isMobile ? 14 : 24,
    margin: 10,
    color: 'rgba(65, 65, 65, 1)'
  },
  footer__date: {
    fontFamily: 'LondrinaSolid-Thin',
    fontWeight: '100',
    fontSize: isMobile ? 14 : 24,
    margin: 10,
    color: 'rgba(65, 65, 65, 1)'
  },
  
})
export default Footer;
