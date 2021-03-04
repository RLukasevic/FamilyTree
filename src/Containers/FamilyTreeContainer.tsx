import React, { Component } from 'react';
import FamilyTree from '../Components/FamilyTree/FamilyTree'
import { RootState, Dispatch } from '../store/store'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';


class FamilyTreeContainer extends Component<Props> {

    componentDidMount = async () => {
        await this.props.initData()
    }

    openSettings = async (key:string) => {
        console.log(this.props.componentId)
        await Navigation.push(this.props.componentId, {
            component: {
              name: 'Settings',
              options: {
                topBar: {
                    title: {
                        text: 'Settings of key: ' + key + ' node',
                    }
                }
            }
            }
        }).catch(e => console.log(e))
    }

    render() {

        const familyTree  = this.props.familyTreeState.data

        return (
            <>
                <FamilyTree openSettings={(key:string) => this.openSettings(key)} data={familyTree} />
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
type Props = StateProps & DispatchProps & {
    componentId:string
}

export default connect(mapStateToProps,mapDispatchToProps)(FamilyTreeContainer);