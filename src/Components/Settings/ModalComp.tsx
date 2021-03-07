import React from 'react';
import { Modal, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

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
            <BackDrop onPress={() => props.modalHandler(!props.modalShow)} />
            <ViewModal>
                {props.inputError !== '' ? <ErrorText>{props.inputError}</ErrorText> : null}
                <LabelText>Enter name:</LabelText>
                <Input 
                    onChangeText={text => props.modalDataChangeHandler(text,'name')}
                    value={props.data.name}
                    placeholder='Input ancestors name'
                />
                <LabelText>Enter last name:</LabelText>
                <Input 
                    onChangeText={text => props.modalDataChangeHandler(text,'lastName')}
                    value={props.data.lastName}
                    placeholder='Input ancestors last name'
                />
                <LabelText>Enter birth date:</LabelText>
                <Input 
                    onChangeText={text => props.modalDataChangeHandler(text,'bDate')}
                    value={props.data.bDate}
                    placeholder='Input ancestors birth date'
                />
                <TouchableHighlight activeOpacity={0.4} underlayColor='#fff' onPress={() => submitWrap()}>
                    <SubmitButton>
                        Submit
                    </SubmitButton>
                </TouchableHighlight>
            </ViewModal>
        </Modal>
    );
}

const SubmitButton = styled.Text`
    padding: 10px;
    margin: 20px;
    margin-top: 5px;
    margin-bottom: 0px;
    font-size: 14px;
    border: 1px solid black;
    border-radius: 14px;
    text-align: center;
    background-color: rgb(81, 173, 158);
`;

const BackDrop = styled.TouchableOpacity`
    background-color: #000;
    opacity: 0.7;
    flex: 1;
    justify-content: center; 
`;

const LabelText = styled.Text`
    text-align: left;
    padding-left: 10px;
`;

const ViewModal = styled.View`
    position: absolute;
    background-color: #fff;
    width: 300px;
    margin-top: 5%;
    height: 300px;
    align-self: center;
    justify-content: center;
    border-radius: 18px;
`;

const Input = styled.TextInput`
    height: 40px; 
    border-color: gray; 
    border-width: 1px;
    margin: 10px;
    margin-top: 2px;
    padding: 10px;
`;

const ErrorText = styled.Text`
    color: red;
    text-align: center;
`;

export default ModalComp;