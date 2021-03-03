import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TreeDataType } from '../../../Types/types';
import FamilyTree from '../FamilyTree';

const FamilyTreeNode = (props:Props) => {

    const [childVisible,setChildVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setChildVisible(v => !v)}>
                {props.data.children && (
                    <Text>
                        {childVisible ? '-' : '+'}
                    </Text>
                )}
                <Text>
                    {props.data.label}
                </Text>
            </TouchableOpacity>

            {props.data.children && childVisible ? <FamilyTree data={props.data.children} /> : null}
        </>
    )
}

interface Props {
    data: TreeDataType
}

export default FamilyTreeNode;