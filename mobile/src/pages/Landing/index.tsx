import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

//para as imagens não derem erro, precisa criar a pasta types e informa ao react q podemos usar o PNG
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';


import styles from './styles';
import api from '../../services/api';

export default function Landing() {

    const navigaton = useNavigation();

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            // const total = response.data.total;
            const { total } = response.data;

            setTotalConnections(total);
        });
    }, []);


    function handleNavigateToGiveClassesPage() {

        navigaton.navigate('GiveClasses');
    }

    function handleNavigateTostudyPages() {

        navigaton.navigate('Study');
    }


    return (
        <View style={styles.container}>

            <Image
                source={landingImg}
                style={styles.banner} />

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton onPress={handleNavigateTostudyPages} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar </Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Dar aulas </Text>
                </RectButton>

            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}