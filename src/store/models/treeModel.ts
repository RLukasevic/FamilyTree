import { createModel } from '@rematch/core'
import { Alert } from 'react-native';
import type { RootModel } from '.'
import { TreeDataType } from '../../Types/types'

export type familyTreeDataStateType = {
    data: TreeDataType[],
}

export const familyTreeData = createModel<RootModel>()({
    state: {
        data: [],
    } as familyTreeDataStateType , // initial state
    reducers: {
        // handle state changes with pure functions
        initData(state, payload: TreeDataType[]) {
            return {...state, data: payload}
        },
    },
    effects: (dispatch) => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async initDataAsync(state) {
            let payload:TreeDataType[]
            payload = await fetch('http://192.168.0.104:5555/api/init').then(res => res.json()).then(res => {
                return res
            }).catch(e => {
                Alert.alert(e)
            })
            // payload = await fetch('http://192.168.0.104:5555/api/init').then(res => res.json()).then(res => {
            //     return res.data
            // })
            dispatch.familyTreeData.initData(payload)
        },
    }),
});