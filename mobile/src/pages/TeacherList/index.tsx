import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';


import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';


import styles from './styles';
import api from '../../services/api';

export default function TeacherList() {

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [favorites, setFavorites] = useState<number[]>([]);
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const id = favoritedTeachers.map((teac: Teacher) => { return teac.id });
                setFavorites(id);
            }
        });

    }



    function habdleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }


    async function handleFiltersSubmit() {
        loadFavorites();
        var response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        habdleToggleFiltersVisible();
    }

    return (
        <View style={styles.container} >
            <PageHeader title="Proffys disponíveis"
                headerRigth={(
                    <BorderlessButton onPress={habdleToggleFiltersVisible}>
                        <Feather name="filter" size={30} color="#fff" />
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput style={styles.input} placeholder="Qual a matéria?" value={subject} onChangeText={text => setSubject(text)} />


                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput style={styles.input} placeholder="Qual o dia?" value={week_day} onChangeText={text => setWeekDay(text)} />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput style={styles.input} placeholder="Qual horário?" value={time} onChangeText={text => setTime(text)} />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
            >
                {teachers.map((teacher: Teacher) => (
                    <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                    />
                )
                )}

            </ScrollView>
        </View>
    );
}