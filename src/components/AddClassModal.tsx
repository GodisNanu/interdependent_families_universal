import { useState } from "react";
import { Dimensions, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
/* import "@/src/blocks/add.css"; */
import Loading from "./Preloader.jsx";

let WebView: any;
if (Platform.OS !== 'web'){
  WebView = require("react-native-webview").WebView;
}

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get("window");
const isMobile = width < 1080;

const AddClassModal = ({ isOpen, onClose }: AddClassModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const addClassUrl = "https://docs.google.com/forms/d/e/1FAIpQLSefqHHr3H-GFKnxBv-1rMo3WSD9Gh9tTWfY1LIfU_6mrcJxoQ/viewform?embedded=true";
  const handleWebviewLoad = () => {
    setIsLoading(false);
  };

  return (
    <Modal
     visible={isOpen}
     transparent
     animationType="none"
     onRequestClose={onClose}
    >
      <View style={styles.addClassModal}>
      <View style={styles.addClassModalContent}>
        <Text style={styles.addClassModalTitle}> Proposed Class Form </Text>
        <Pressable
                    style= {({hovered}) => [
                      styles.addClassModalClose,
                      {
                        opacity: hovered ? 0.8 : 1,
                        transform: [
                          {perspective: 1000}, 
                          { rotateY: hovered ? "30deg" : "0deg"}]
                      }
                    ]} 
                    onPress={onClose}
                    hitSlop={20}
          >
                    <Text style={styles.closeText}>X</Text>
        </Pressable>
         {Platform.OS === 'web' ? (  
                    <iframe
                        src={addClassUrl}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        onLoad={handleWebviewLoad}
                        title="Google Calendar"
                      />
                    ) : (
                    <WebView
                      source={addClassUrl}
                      onLoadEnd={handleWebviewLoad}
                      style={styles.webview}
                      scalesPageToFit={true}
                    />)}
                  
        {isLoading && (
          <View style={styles.addClassPreloaderOverlay}>
            <Loading />
          </View>
        )}
      </View>
      </View>
    </Modal>
  );
}

export default AddClassModal;

const styles = StyleSheet.create({
  addClassModal: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    justifyContent: "center",
    alignItems: "center",
  },
  addClassModalContent: {
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
      android: { elevation: 5 }}),
  },
  addClassModalTitle: {
    fontFamily: "Londrina-Regular",
    fontWeight: "400",
    fontSize: isMobile ? 28 : 48,
    color: "white",
    padding: 26,
    textAlign: "center",
  },
  addClassModalClose: {
    position: "absolute", 
  top: 20,
  right: 28,
  width: 48,
  height: 48,
  backgroundColor: "transparent",
  zIndex: 1001,
  ...Platform.select({
    web: {
      cursor: "pointer"
    } as any,
  })
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
 addClassPreloaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1001,
  },
});