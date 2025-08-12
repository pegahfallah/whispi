import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Animated, PanResponder, TouchableOpacity, Alert, Modal, Platform, Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

const FACTS = [
  'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.',
  'Bananas are berries, but strawberries are not. In botanical terms, a berry is a fruit produced from the ovary of a single flower with seeds embedded in the flesh.',
  'Octopuses have three hearts and blue blood. Two hearts pump blood to the gills, while a third pumps it to the rest of the body.',
];

const SWIPE_THRESHOLD = width * 0.25;

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [showWidgetHelp, setShowWidgetHelp] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

  const rotate = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-12deg', '0deg', '12deg'],
  });

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      bounciness: 8,
    }).start();
  };

  const advanceCard = (direction: 'left' | 'right') => {
    Animated.timing(pan, {
      toValue: { x: direction === 'right' ? width : -width, y: 0 },
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      setIndex((prev) => (prev + 1) % FACTS.length);
    });
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (_evt, gesture) => {
          if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
            advanceCard(gesture.dx > 0 ? 'right' : 'left');
          } else {
            resetPosition();
          }
        },
      }),
    []
  );

  const handleAddWidget = () => {
    if (Platform.OS === 'ios') {
      setShowWidgetHelp(true);
    } else {
      Alert.alert(
        'Widgets on Android',
        'Home screen widgets for Android are coming soon.'
      );
    }
  };

  const openAppleHowTo = () => {
    Linking.openURL('https://support.apple.com/en-us/HT207122').catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Whispi’s Daily pick for you:</Text>
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateX: pan.x as unknown as number },
                { translateY: pan.y as unknown as number },
                { rotate: rotate as unknown as string },
              ],
            } as any,
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.cardEmoji}>✨</Text>
          <Text style={styles.cardText}>{FACTS[index]}</Text>
        </Animated.View>
        <Text style={styles.hintText}>Swipe left or right</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.widgetButton} activeOpacity={0.85} onPress={handleAddWidget}>
          <Text style={styles.widgetButtonText}>Add widget to home screen</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showWidgetHelp}
        animationType="slide"
        transparent
        onRequestClose={() => setShowWidgetHelp(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Whispi as a widget</Text>
              <Text style={styles.modalSubtitle}>iPhone steps</Text>
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.step}>1. Go to your iPhone Home Screen.</Text>
              <Text style={styles.step}>2. Touch and hold anywhere until apps jiggle.</Text>
              <Text style={styles.step}>3. Tap the ➕ icon in the top-left corner.</Text>
              <Text style={styles.step}>4. Search for “Whispi”.</Text>
              <Text style={styles.step}>5. Choose a size, then tap “Add Widget”.</Text>
              <Text style={styles.stepNote}>Tip: You can place it on any screen you like.</Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={openAppleHowTo}>
                <Text style={styles.secondaryBtnText}>View Apple’s guide</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowWidgetHelp(false)}>
                <Text style={styles.primaryBtnText}>Got it</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: width - 40,
    minHeight: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 26,
  },
  hintText: {
    marginTop: 16,
    fontSize: 13,
    color: '#888888',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  widgetButton: {
    backgroundColor: '#1F7AE0',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  widgetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  modalHeader: {
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  modalContent: {
    marginTop: 8,
  },
  step: {
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
    lineHeight: 22,
  },
  stepNote: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#1F7AE0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default HomeScreen;