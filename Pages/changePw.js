import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Dhanush from '../assets/developers/Dhanush.jpg';
import Yuvaraj from '../assets/developers/yuvaraj.jpeg';
 
const developers = [
    {
        name: 'Yuvaraj V',
        image: Yuvaraj,
        email: 'mailto:yuvarajv787@gmail.com',
        linkedin: 'https://www.linkedin.com/in/yuvaraj-vetrivel-407275223/',
        github: 'https://github.com/Yuvaraj787'
    },
    {
        name: 'Dhanushkumar Sankar',
        image: Dhanush,
        email: 'mailto:dhanushit419@gmail.com',
        linkedin: 'https://www.linkedin.com/in/dhanushkumar-sankar-448a18270/',
        github: 'https://github.com/Dhanushit419',
    },
];

const AboutDevelopers = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.appName}>Welcome to Schedule<Text style={{ fontSize: 40 }}>IT</Text></Text>
            <Text style={styles.appDescription}>
                Developed by two enthusiastic IT students <Text style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>Yuvaraj Vetrivel</Text> & <Text style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>Dhanushkumar Sankar</Text> from Anna University,
                ScheduleIT is your go-to app for seamless time management.
                Our app provides a real-time view of your current and upcoming periods,
                a comprehensive weekly schedule, and an easy way to manage your absences.
                With ScheduleIT, staying organized and on top of your academic life has
                never been easier. Join us in making your schedule smarter!
            </Text>
            <Text style={styles.label}>Developers</Text>
            <View style={styles.cardsContainer}>
                {developers.map((developer, index) => (
                    <View key={index} style={styles.card}>
                        <Image source={developer.image} style={styles.image} />
                        <Text style={styles.name}>{developer.name}</Text>
                        <View style={styles.contactContainer}>
                            <TouchableOpacity onPress={() => Linking.openURL(developer.email)}>
                                <FontAwesome name="envelope" size={20} color="black" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL(developer.linkedin)}>
                                <FontAwesome name="linkedin" size={24} color="black" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL(developer.github)}>
                                <FontAwesome name="github" size={24} color="black" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={() => Linking.openURL('https://forms.gle/pfwfaU22LSy5SdGeA')} style={styles.feedbackLink}>
                <Text style={styles.feedbackText}>Provide Feedback</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                    Copyrighted © 2024 Yuvaraj V & Dhanushkumar Sankar. All rights reserved.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    appName: {
        fontSize: 32,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    appDescription: {
        fontSize: 20,
        //fontFamily: 'Roboto Mono',
        textAlign: 'justify',
        marginBottom: 20,
        paddingHorizontal: 10,
        lineHeight: 25
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: '45%',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        width: '100%',
        textAlign: 'center'
    },
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    icon: {
        marginHorizontal: 10,
    },
    feedbackLink: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#E1E1E1',
        borderRadius: 10,
    },
    feedbackText: {
        fontSize: 18,
        color: '#000',
    },
    footerContainer: {
        padding: 10,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#333',
    },
});

export default AboutDevelopers;