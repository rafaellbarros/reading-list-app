import React, { useEffect, useState } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Main = ({navigation}) => {
    const [ books, setBooks ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("books").then(data => {
          const book = JSON.parse(data);
          setBooks(book);
        })
      }, []);

    const onNewEbook = () => {
        navigation.navigate('Book');
    }

    const onBookEdit = (bookId) => {
        const book = books.find(item => item.id === bookId);
        navigation.navigate('Book',  { book: book, isEdit: true})
    }

    const onBookDelete = async (bookId) => {
        const newBooks = books.filter(item => item.id !== bookId);
        await AsyncStorage.setItem('books', newBooks);
        setBooks(newBooks);
    }

    return (
        <View style={styles.container}>
            <View style={styles.toolbox}>
                <Text style={styles.title}>Lista de Leitura</Text>
                <TouchableOpacity 
                    style={styles.toolboxButton}
                    onPress={onNewEbook}
                    >
                    <Icon name="add" size={14} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList 
                data={books}
                keyExtractor={item => item.id} 
                renderItem={({item}) => (
                    <View style={styles.itensContainer}>
                        <TouchableOpacity style={styles.itemButton}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.editButton}
                            onPress={() => onBookEdit(item.id)}
                            >
                            <Icon name="create" size={14} color="#2ecc71" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={() => onBookDelete(item.id)}
                            >
                            <Icon name="delete" size={14} color="#e74c3c" />
                        </TouchableOpacity>
                    </View>
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
    itensContainer: {
        flexDirection: 'row',
    },
    itemButton: {
        flex: 1
    },
    itemText: {
        fontSize: 16
    },
    editButton: {},
    deleteButton: {}
})

export default Main;