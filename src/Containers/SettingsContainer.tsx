import React from 'react';
import { RootState, Dispatch } from '../store/store'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';
import { NavigationComponent, NavigationComponentProps } from 'react-native-navigation';
import { TreeDataType, ModalDataType } from '../Types/types';
import ModalComp from '../Components/Settings/ModalComp';
import styled from 'styled-components/native'

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

    componentDidMount = () => {
        console.log(this.props)
    }

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

    render() {

        return (
            <>
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
                <View>
                    <Text>{this.props.element.name} {this.props.element.lastName}`s Children: </Text>
                </View>

                {this.props.element.children.length > 0 ? this.props.element.children.map(e => {
                    return <View key={e.key}><Text>{e.name}</Text><Button onPress={() => this.props.deleteChild(e)}><Text>Delete this child</Text></Button></View>
                }) : <Text>None</Text>}

                <Button onPress={() => this.modalHandler()} ><Text>Add child to this node</Text></Button>
                <Button onPress={() => this.modalHandler('edit')} ><Text>Change this node`s data</Text></Button>
                {/* <Button onPress={() => this.props.deleteNode(this.props.element)} ><Text>Delete this node</Text></Button> */}
            </>
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

const Button = styled.TouchableOpacity`
    background: black;
    width: 100px;
    color: red;
`
const Text = styled.Text`
    font-size: 18px;
    color: blue;
    font-weight: 500;
`;

export default connect(mapStateToProps,mapDispatchToProps)(SettingsContainer);