import React from 'react';
import FamilyTree from '../Components/FamilyTree/FamilyTree';
import { TouchableHighlight } from 'react-native';
import { RootState, Dispatch } from '../store/store';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { TreeDataType } from '../Types/types';
import { NavigationComponent, NavigationComponentProps } from 'react-native-navigation';
import styled from 'styled-components/native';

class FamilyTreeContainer extends NavigationComponent<Props> {

    constructor(props:Props) {
        super(props);
    }

    componentDidMount = async () => {
        if (this.props.familyTreeState.data.length === 0) {
            await this.props.initDataFromApi()
        }
    }

    openSettings = async (element:TreeDataType) => {
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

    initFirstChild = () => {
        this.props.initChild()
    }

    render() {
        const familyTree  = this.props.familyTreeState.data

        return (
            <>
                {typeof this.props.familyTreeState.error === typeof null ? 
                    <FamilyTree openSettings={this.openSettings} data={familyTree} /> 
                    :
                    <>
                        <ErrorText>{this.props.familyTreeState.error}</ErrorText>
                        <TouchableHighlight activeOpacity={0.4} underlayColor='#fff' onPress={this.initFirstChild}>
                            <SubmitButton>
                                Init tree root element
                            </SubmitButton>
                        </TouchableHighlight>
                    </>
                }

            </>
        );
    }
}

const ErrorText = styled.Text`
    color: red;
    text-align: center;
    margin: 50px 0px 20px 0px;
    font-weight: bold;
`;

const SubmitButton = styled.Text`
    padding: 10px;
    margin: 20px;
    margin-top: 5px;
    margin-bottom: 0px;
    font-size: 16px;
    border: 1px solid black;
    border-radius: 14px;
    text-align: center;
    background-color: rgb(81, 173, 158);
`;

const mapStateToProps = (state: RootState) => ({
    familyTreeState: state.familyTreeData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    initDataFromApi: dispatch.familyTreeData.initDataAsync,
    initChild: dispatch.familyTreeData.initData,
})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>
interface compProps extends NavigationComponentProps {}
type Props = StateProps & DispatchProps & compProps

export default connect(mapStateToProps,mapDispatchToProps)(FamilyTreeContainer);