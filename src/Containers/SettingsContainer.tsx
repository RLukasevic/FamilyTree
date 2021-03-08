import React from 'react';
import { RootState, Dispatch } from '../store/store'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';
import { NavigationComponent, NavigationComponentProps } from 'react-native-navigation';
import { TreeDataType, ModalDataType } from '../Types/types';
import ModalComp from '../Components/Settings/ModalComp';
import styled from 'styled-components/native';

type SettingsContainerStateType = {
    showEditModal:boolean,
    showAddModal:boolean,
    modalData:ModalDataType
}

class SettingsContainer extends NavigationComponent<Props> {

    state = {
        showEditModal: false,
        showAddModal: false,
        modalData: {
            name: '',
            lastName: '',
            bDate: '',
        },
    } as SettingsContainerStateType 

    inputOnChangeHandler = (text:string,mode:string) => {
        this.setState({
            ...this.state,
            modalData: {
                ...this.state.modalData,
                [mode]: text
            }
        })
    }

    modalHandler = (mode?:string) => {
        switch (mode) {
            case 'edit':
                this.setState({
                    ...this.state, 
                    showEditModal: !this.state.showEditModal,
                    modalData: {
                        name: this.props.element.name,
                        lastName: this.props.element.lastName,
                        bDate: this.props.element.bDate,
                    }
                })
                break;

            default:
                this.setState({
                    ...this.state, 
                    showAddModal: !this.state.showAddModal, 
                    modalData: {
                        name: '',
                        lastName: '',
                        bDate: '',
                    }
                })
                break;
        }
    }

    modalSubmitHandler = (mode?:string) => {
        switch (mode) {
            case 'edit':
                this.props.editNode(this.props.element,this.state.modalData)
                Navigation.updateProps(this.props.componentId, 
                    {
                        key: this.props.element.key, 
                        element: {
                            ...this.props.element, 
                            name:this.state.modalData.name, 
                            lastName:this.state.modalData.lastName, 
                            bDate:this.state.modalData.bDate
                        }
                    }
                )
                break;

            default:
                this.props.addChild(this.props.element,this.state.modalData)
                break;
        }
    }

    forwardToAncestor = async (element:TreeDataType) => {
        await Navigation.push(this.props.componentId, {
            component: {
                name: 'Settings',
                options: {
                    topBar: {
                        title: {
                            text: 'Settings',
                        }
                    }
                },
                passProps: {
                    key: element.key,
                    element: element
                  }
            }
        }).catch(e => console.log(e))
    }

    render() {

        return (
            <ScrollView>
                <ModalComp 
                    modalShow={this.state.showEditModal}
                    modalHandler={() => this.modalHandler('edit')}
                    modalSubmitHandler={() => this.modalSubmitHandler('edit')}
                    modalDataChangeHandler={(text:string,mode:string) => this.inputOnChangeHandler(text,mode)}
                    data={this.state.modalData}
                />
                <ModalComp 
                    modalShow={this.state.showAddModal}
                    modalHandler={() => this.modalHandler()}
                    modalSubmitHandler={() => this.modalSubmitHandler()}
                    modalDataChangeHandler={(text:string,mode:string) => this.inputOnChangeHandler(text,mode)}
                    data={this.state.modalData}
                />

                <ViewCont>
                    <Card>
                        <NodeParamRow>Name : {this.props.element.name}</NodeParamRow>
                        <NodeParamRow>Last name : {this.props.element.lastName}</NodeParamRow>
                        <NodeParamRow>Birth date : {this.props.element.bDate}</NodeParamRow>
                    </Card>
                    <ButtonsCont>
                        <MainCardButton onPress={() => this.modalHandler('edit')} ><ButtonText>Change this node</ButtonText></MainCardButton>
                        <MainCardButton onPress={() => this.modalHandler()} ><ButtonText>Add Relative</ButtonText></MainCardButton>
                    </ButtonsCont>
                </ViewCont>

                <View>
                    <Text>{this.props.element.name} {this.props.element.lastName}`s Ancestors </Text>
                </View>

                {this.props.element.children.length > 0 ? this.props.element.children.map(e => {
                    return (
                        <AncestorContainer key={e.key}>
                            <AncestorDataContainer onPress={() => this.forwardToAncestor(e)}>
                                <AncesstorParamRow>Name : {e.name}</AncesstorParamRow>
                                <AncesstorParamRow>Last name : {e.lastName}</AncesstorParamRow>
                                <AncesstorParamRow>Birth date : {e.bDate}</AncesstorParamRow>
                            </AncestorDataContainer>
                            <Button onPress={() => this.props.deleteChild(e)}>
                                <AncestorDeleteButtonText>X</AncestorDeleteButtonText>
                            </Button>
                        </AncestorContainer>
                    )
                }) : <Text>None</Text>}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    familyTreeState: state.familyTreeData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deleteChild: dispatch.familyTreeData.deleteChild,
    addChild: dispatch.familyTreeData.addChild,
    editNode: dispatch.familyTreeData.editNode,
})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>
interface compProps extends NavigationComponentProps {
    key: string,
    element:TreeDataType
}
type Props = StateProps & DispatchProps & compProps

const ViewCont = styled.View`
    flex-direction: row;
`;

const Card = styled.View`
    flex: 2;
    text-align: center;
    border: 2px solid black;
    border-radius: 25px;
    font-size: 14px;
    height: 150px;
    max-width: 60%;
    margin: 20px 10px 20px 20px;
    background: rgb(61, 163, 54);
    box-shadow: 0px 3px 3px rgba(0,0,0,0.5);
`;

const ButtonsCont = styled.View`
    flex: 1;
`;

const NodeParamRow = styled.Text`
    flex: 1;
    font-weight: 600;
    padding: 10px;
    color: #fff;
`;

const MainCardButton = styled.TouchableOpacity`
    flex: 1;
    flex-direction: column;
    width: 100px;
    margin: 20px 0px 20px 0px;
    background: rgb(61, 163, 54);
    border: 2px solid black;
    border-radius: 10px;
`;

const ButtonText = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    padding: 5px;
`;

const Text = styled.Text`
    font-size: 18px;
    text-align: center;
    color: #0f0f0f;
    font-weight: 500;
`;

const AncestorContainer = styled.View`
    flex-direction: row;
    border: 2px solid black;
    border-radius: 25px;
    font-size: 14px;
    height: 100px;
    margin: 20px 10px 20px 20px;
    background: rgb(81, 173, 158);
    box-shadow: 0px 3px 3px rgba(0,0,0,0.5);
`;

const AncestorDataContainer = styled.TouchableOpacity`
    flex: 4;
`;

const AncesstorParamRow = styled.Text`
    flex: 1;
    font-weight: 600;
    padding: 10px;
    padding-top: 4px;
    color: #fff;
`;

const Button = styled.TouchableOpacity`
    background: rgb(209, 27, 27);
    border-top-right-radius: 23px;
    border-bottom-right-radius: 23px;
    flex: 1;
`;

const AncestorDeleteButtonText = styled.Text`
    font-size: 18px;
    text-align: center;
    padding-top: 35px;
    color: #0f0f0f;
    font-weight: 500;
`;

export default connect(mapStateToProps,mapDispatchToProps)(SettingsContainer);