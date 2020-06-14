import React, { useEffect, useState } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Main = ({navigation}) => {

    const [ books, setBooks ] = useState([]);
    // 1. Recuperar dados
    // 2. Listar estes dados

    useEffect(() => {
        // codigo de execução
        // recuperar os dados do AsyncStorage
        const books = AsyncStorage.getItem('books');

        books.then(data => {
            const book = JSON.parse(data);
            console.log('book => ', book);
            setBooks([book]);
        })

        console.log('userEfect')
    }, [])

    const data = [
        {
            id: "1",
            title: "Código Limpo",
            anotations: "Libro muito bom!",
            read: false,
            photo: null,
        },
        {
            id: "2",
            title: "C Completo total",
            anotations: "Libro muito bom!",
            read: false,
            photo: null,
        },
        {
            id: "3",
            title: "A bíblia do PHP",
            anotations: "Libro muito bom!",
            read: false,
            photo: null,
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.toolbox}>
                <Text style={styles.title}>Lista de Leitura</Text>
                <TouchableOpacity 
                    style={styles.toolboxButton}
                    onPress={() => {
                        navigation.navigate('Book');
                    }}
                    >
                    <Icon name="add" size={14} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList 
                data={books}
                keyExtractor={item => item.id} 
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.itemButton}>
                        <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    toolbox: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: '#3498bd',
    },
    toolboxButton: {
        backgroundColor: '#3498bd',
        borderRadius: 50,
        width: 22,
        height: 22, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemButton: {

    },
    itemText: {
        fontSize: 16
    }
})

export default Main;