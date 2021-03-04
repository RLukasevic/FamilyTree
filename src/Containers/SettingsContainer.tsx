import React, { Component } from 'react';
import FamilyTree from '../Components/FamilyTree/FamilyTree'
import { RootState, Dispatch } from '../store/store'
import { Text } from 'react-native'
import { connect } from 'react-redux'


class SettingsContainer extends Component {

    // componentDidMount = async () => {
    //     await this.props.initData()
    // }

    render() {

        // const familyTree  = this.props.familyTreeState.data

        return (
            <>
                <Text>Meme</Text>
            </>
        );
    }
}

// const mapStateToProps = (state: RootState) => ({
//     familyTreeState: state.familyTreeData,
// })

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     initData: dispatch.familyTreeData.initDataAsync,
// })

// type StateProps = ReturnType<typeof mapStateToProps>
// type DispatchProps = ReturnType<typeof mapDispatchToProps>
// type Props = StateProps & DispatchProps

export default SettingsContainer;