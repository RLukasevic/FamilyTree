import { createModel } from '@rematch/core'
import { Alert } from 'react-native';
import type { RootModel } from '.'
import { TreeDataType, ModalDataType } from '../../Types/types'

export type familyTreeDataStateType = {
    data: TreeDataType[],
}

export const familyTreeData = createModel<RootModel>()({
    state: {
        data: [],
    } as familyTreeDataStateType , // initial state
    reducers: {
        initData(state:familyTreeDataStateType, payload: TreeDataType[]) {
            return {...state, data: payload}
        },
        deleteChild(state:familyTreeDataStateType,element:TreeDataType) {
            let newStateData:TreeDataType[] = state.data
            deleteChild(element.key,newStateData)
            return {...state, data: newStateData};
        },
        addChild(state:familyTreeDataStateType,element:TreeDataType,data:ModalDataType) {
            let newStateData:TreeDataType[] = state.data
            let newChildsKey:string;
            let biggestChildsKey:string = '0';

            if (element.children.length > 0) {

                // avoiding dupes
                for ( let i in element.children ) {
                    if ( Number(element.children[i].key[element.children[i].key.length-1]) > Number(biggestChildsKey[biggestChildsKey.length-1])) {
                        biggestChildsKey = element.children[i].key
                    }
                }

                let lastIndex:string | undefined = biggestChildsKey[biggestChildsKey.length-1]
                newChildsKey = biggestChildsKey.slice(0, -1) + String(Number(lastIndex) + 1)
            } else {
                newChildsKey = element.key + '_0'
            }
            let newPath:string[] = [...element.path]
            newPath.push(newChildsKey)

            let newChild:TreeDataType = {
                key: newChildsKey,
                path: newPath,
                name: data.name,
                lastName: data.lastName,
                bDate: data.bDate,
                children: []
            }

            pushChild(element.key, newChild, newStateData)

            console.log('newstate? = ', newStateData)

            return {...state, data: newStateData};
        },
        editNode(state:familyTreeDataStateType,element:TreeDataType,data:ModalDataType) {
            let newStateData:TreeDataType[] = state.data

            let editedChild:TreeDataType = {
                ...element,
                name: data.name,
                lastName: data.lastName,
                bDate: data.bDate
            }

            editSelf(editedChild, newStateData)

            return {...state, data: newStateData}
        }
    },
    effects: (dispatch) => ({
        async initDataAsync() {
            console.log('eeeeeeeeeeeeeeeeeeeeeeshkere')
            let payload:TreeDataType[]
            payload = await fetch('http://192.168.0.104:5555/api/init').then(res => res.json()).then(res => {
                return res
            }).catch(e => {
                Alert.alert(e)
            })
            dispatch.familyTreeData.initData(payload)
        },
    }),
});

const deleteChild = (key:string, tree:TreeDataType[]) => {
    for (let index in tree) {
        let numIndex = Number(index)
        if(tree[numIndex].key === key){
            tree.splice(numIndex,1)
            return 0;
        } else {
            if (tree[numIndex].children!.length > 0) {
                deleteChild(key, tree[numIndex].children)
            }
        }
    }
}

const pushChild = (key:string, newChild:TreeDataType, tree:TreeDataType[]) => {
    for (let index in tree) {
        let numIndex = Number(index)
        if (tree[numIndex].key === key) {
            tree[numIndex].children.push(newChild)
        } else {
            if (tree[numIndex].children.length > 0) {
                pushChild(key,newChild,tree[numIndex].children)
            }
        }
    }
}

const editSelf = (editedChild:TreeDataType, tree:TreeDataType[]) => {
    for (let index in tree) {
        let numIndex = Number(index)
        if (tree[numIndex].key === editedChild.key) {
            tree[numIndex] = editedChild
        } else {
            if (tree[numIndex].children.length > 0) {
                editSelf(editedChild,tree[numIndex].children)
            }
        }
    }
}