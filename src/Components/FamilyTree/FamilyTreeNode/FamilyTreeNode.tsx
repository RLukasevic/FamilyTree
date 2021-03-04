import React, {useState} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TreeDataType } from '../../../Types/types';
import FamilyTree from '../FamilyTree';

const FamilyTreeNode  = (props:Props) => {

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

            <TouchableOpacity onPress={() => props.openSettings(props.data.key)} >
                <Text>Settings</Text>
            </TouchableOpacity>

            {props.data.children && childVisible ? <FamilyTree openSettings={props.openSettings} data={props.data.children} /> : null}
        </>
    )
}

interface Props {
    data: TreeDataType,
    openSettings: (arg:string) => {}
}

export default FamilyTreeNode;