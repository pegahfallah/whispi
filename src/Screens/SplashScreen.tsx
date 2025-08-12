import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  navigation: {
    replace: (screen: string) => void;
  };
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleContinue = () => {
        navigation.replace('OnboardingScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Hi. I'm Whispi.</Text>
                <Text style={styles.subtitle}>I find facts for curious minds like yours.</Text>
            </View>
            
            <TouchableOpacity
                style={[styles.continueButton, isPressed && styles.continueButtonPressed]}
                onPress={handleContinue}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                activeOpacity={0.8}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingTop: height * 0.2,
        paddingBottom: 60,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 40,
    },
    subtitle: {
        fontSize: 18,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    continueButton: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignSelf: 'center',
        minWidth: 120,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    continueButtonPressed: {
        backgroundColor: '#E8E8E8',
        transform: [{ scale: 0.98 }],
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666666',
    },
});

export default SplashScreen;