import React from 'react';
import { FlatList, View } from 'react-native';
import FamilyTreeNode from './FamilyTreeNode/FamilyTreeNode';
import { TreeDataType } from '../../Types/types';

const FamilyTree = (props:Props) => {
    return (
        <View>
            <FlatList data={props.data} renderItem={({item}) => <FamilyTreeNode openSettings={props.openSettings} data={item} />} />
        </View>
    );
}

interface Props {
    data: Array<TreeDataType>
    openSettings: (el:TreeDataType) => {}
}

export default FamilyTree;