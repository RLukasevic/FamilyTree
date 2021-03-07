import React from 'react';
import FamilyTree from '../Components/FamilyTree/FamilyTree'
import { RootState, Dispatch } from '../store/store'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';
import { TreeDataType } from '../Types/types';
import { NavigationComponent, NavigationComponentProps } from 'react-native-navigation';


class FamilyTreeContainer extends NavigationComponent<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount = async () => {
        await this.props.initData()
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

    render() {
        const familyTree  = this.props.familyTreeState.data

        return (
            <>
                <FamilyTree openSettings={this.openSettings} data={familyTree} />
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    familyTreeState: state.familyTreeData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    initData: dispatch.familyTreeData.initDataAsync,
})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>
interface compProps extends NavigationComponentProps {}
type Props = StateProps & DispatchProps & compProps

export default connect(mapStateToProps,mapDispatchToProps)(FamilyTreeContainer);