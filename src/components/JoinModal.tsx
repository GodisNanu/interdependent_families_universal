import { useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
/* import "@/src/blocks/join.css"; */
import Loading from "./Preloader";

let WebView: any;
if (Platform.OS !== 'web'){
  WebView = require("react-native-webview").webview;
}

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get("window");
const isMobile = width < 1080;

const JoinModal = ({ isOpen,  onClose }: JoinModalProps)  => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const calendarUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd5ei6TWf1pcebmK1O8W1ZY63GCHExonh_bBquXDtCtgvGoCA/viewform?embedded=true";
  const handleWebviewLoad = () => {
    setIsLoading(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
   <View style={styles.joinModal}>
   <View style={styles.joinModalContent}>
   <Text style={styles.joinModalTitle}>Membership Application Form</Text>
        <TouchableOpacity 
            style={styles.joinModalClose} 
            onPress={onClose}
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <View style={styles.webviewWrapper}>
          {Platform.OS === 'web' ? (  
            <iframe
                src={calendarUrl}
                style={{ width: '100%', height: '100%', border: 'none' }}
                onLoad={handleWebviewLoad}
                title="Google Calendar"
              />
            ) : (
            <WebView
              source={calendarUrl}
              onLoadEnd={handleWebviewLoad}
              style={styles.webview}
              scalesPageToFit={true}
            />)}
        {isLoading && (
          <View style={styles.joinPreloaderOverlay}>
            <Loading />
          </View>
        )}
    </View>
    </View>
    </View>
    </Modal>
  );
};

export default JoinModal;

const styles = StyleSheet.create({
  joinModal: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    justifyContent: "center",
    alignItems: "center",
  },
  joinModalContent: {
    padding: 26,
    width: Platform.OS === 'web' ? "60%" : "95%",
    height: "75%",
    borderWidth: 2,
    borderColor: "rgba(89, 206, 89, 0.35)",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.85)", 
    position: "relative",
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25 },
      android: { elevation: 5 }
    })
  },
  joinModalTitle: {
    fontFamily: "Londrina-Regular",
    fontWeight: "400",
    fontSize: isMobile ? 28 : 48,
    color: "white",
    padding: 26,
    textAlign: "center",
  },
  joinModalClose: {
    position: "absolute",
    top: 20,
    right: 28,
    zIndex: 1001,
  },
  closeText: {
    fontFamily: "Londrina-Black",
    fontWeight: "900",
    fontSize: isMobile ? 28 : 48,
    color: "white",
  },
  webviewWrapper: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10
  },
  webview: {
    flex: 1,
  },
  joinPreloaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1001,
  },
});