import React, {useState} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TreeDataType } from '../../../Types/types';
import FamilyTree from '../FamilyTree';

const FamilyTreeNode  = (props:Props) => {

    const [childVisible,setChildVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setChildVisible(v => !v)}>
                {props.data.children.length > 0 && (
                    <Text>
                        {childVisible ? '-' : '+'}
                    </Text>
                )}
                <Text>
                    {props.data.name}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.openSettings(props.data)} >
                <Text>Settings</Text>
            </TouchableOpacity>

            {props.data.children && childVisible ? <FamilyTree openSettings={props.openSettings} data={props.data.children} /> : null}
        </>
    )
}

interface Props {
    data: TreeDataType,
    openSettings: (el:TreeDataType) => {}
}

export default FamilyTreeNode;