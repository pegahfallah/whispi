import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen: React.FC<any> = ({ navigation }) => {
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const topics = [
        { id: 'science', title: 'Science & Technology', emoji: '\ud83d\udd2c' },
        { id: 'history', title: 'History & Culture', emoji: '🏛️' },
        { id: 'nature', title: 'Nature & Environment', emoji: '\ud83c\udf3f' },
        { id: 'space', title: 'Space & Astronomy', emoji: '\ud83d\ude80' },
        { id: 'health', title: 'Health & Medicine', emoji: '\ud83c\udfe5' },
        { id: 'arts', title: 'Arts & Literature', emoji: '\ud83c\udfa8' },
        { id: 'politics', title: 'Politics & Current Events', emoji: '\ud83d\udcf0' },
        { id: 'sports', title: 'Sports & Athletics', emoji: '⚽' },
        { id: 'food', title: 'Food & Cuisine', emoji: '🍽️' },
        { id: 'travel', title: 'Travel & Geography', emoji: '✈️' },
    ];

    const toggleTopic = (topicId: string) => {
        setSelectedTopics(prev => 
            prev.includes(topicId) 
                ? prev.filter(id => id !== topicId)
                : [...prev, topicId]
        );
    };

    const handleContinue = () => {
        // TODO: Persist selectedTopics as needed
        navigation.replace('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>What do you want to learn about?</Text>
                    <Text style={styles.subtitle}>Select all that apply</Text>
                </View>

                <View style={styles.topicsContainer}>
                    {topics.map((topic) => (
                        <TouchableOpacity
                            key={topic.id}
                            style={[
                                styles.topicButton,
                                selectedTopics.includes(topic.id) && styles.topicButtonSelected
                            ]}
                            onPress={() => toggleTopic(topic.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                            <Text style={[
                                styles.topicText,
                                selectedTopics.includes(topic.id) && styles.topicTextSelected
                            ]}>
                                {topic.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        selectedTopics.length === 0 && styles.continueButtonDisabled
                    ]}
                    onPress={handleContinue}
                    disabled={selectedTopics.length === 0}
                    activeOpacity={0.8}
                >
                    <Text style={[
                        styles.continueButtonText,
                        selectedTopics.length === 0 && styles.continueButtonTextDisabled
                    ]}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 36,
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    topicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    topicButton: {
        width: (width - 60) / 2,
        backgroundColor: '#F8F8F8',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E8E8E8',
        minHeight: 100,
        justifyContent: 'center',
    },
    topicButtonSelected: {
        backgroundColor: '#E3F2FD',
        borderColor: '#2196F3',
    },
    topicEmoji: {
        fontSize: 32,
        marginBottom: 8,
    },
    topicText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666666',
        textAlign: 'center',
        lineHeight: 18,
    },
    topicTextSelected: {
        color: '#1976D2',
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
    },
    continueButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    continueButtonDisabled: {
        backgroundColor: '#E0E0E0',
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    continueButtonTextDisabled: {
        color: '#999999',
    },
});

export default OnboardingScreen; 