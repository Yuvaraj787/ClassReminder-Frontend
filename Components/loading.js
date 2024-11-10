import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoadingSpinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="extra-large" color="#4285F4" />
            <Text style={styles.loadingText}>Please wait while Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default LoadingSpinner;