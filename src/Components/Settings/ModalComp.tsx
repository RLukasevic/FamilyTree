import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text, TextInput, TouchableHighlight } from 'react-native';

const ModalComp = (props:any) => {

    const submitWrap = () => {
        props.modalSubmitHandler()
        props.modalHandler(!props.modalShow)
    }

    return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={props.modalShow}
            onRequestClose={() => {
                props.modalHandler();
            }}
        >
            <TouchableOpacity
                style={{ backgroundColor: '#000', opacity: 0.7, flex: 1,justifyContent:'center' }}
                onPress={() => props.modalHandler(!props.modalShow)}>
            </TouchableOpacity>
            <View style={styles.modal}>
                {props.inputError !== '' ? <Text style={styles.error}>{props.inputError}</Text> : null}
                <TextInput 
                    style={styles.input}
                    onChangeText={text => props.modalDataChangeHandler(text,'name')}
                    value={props.data.name}
                    placeholder='Input ancestors name'
                />
                <TextInput 
                    style={styles.input}
                    onChangeText={text => props.modalDataChangeHandler(text,'lastName')}
                    value={props.data.lastName}
                    placeholder='Input ancestors last name'
                />
                <TextInput 
                    style={styles.input}
                    onChangeText={text => props.modalDataChangeHandler(text,'bDate')}
                    value={props.data.bDate}
                    placeholder='Input ancestors birth date'
                />
                <TouchableHighlight activeOpacity={0.4} underlayColor='#fff' onPress={() => submitWrap()}>
                    <Text style={styles.button}>
                        Submit
                    </Text>
                </TouchableHighlight>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        backgroundColor: '#fff',
        width: 300,
        marginTop: '10%',
        height: 280,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 18,
    },
    text: {
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    button: {
        borderWidth: 1,
        padding: 10,
        margin: 20,
        marginBottom: 0,
        fontSize: 14,
        borderRadius: 14,
        textAlign: 'center',
        borderColor: 'black',
        backgroundColor: 'cyan',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    }
});

export default ModalComp;