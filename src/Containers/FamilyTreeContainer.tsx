import React, { Component } from 'react';
import {TreeDataType} from '../Types/types'
import FamilyTree from '../Components/FamilyTree/FamilyTree'

class FamilyTreeContainer extends Component {

    render() {

        let data:Array<TreeDataType> = [{
            key:'0_0',
            label:'First Node',
            children:[{
                key:'0_1',
                label:'First Nodes First Child'
            },
            {
                key:'0_2',
                label:'First Nodes Second Child'
            }],
        },
        {
            key:'1_0',
            label:'Second Node'
        },
        {
            key:'2_0',
            label:'Third Node',
            children:[{
                key:'2_1',
                label:'Third Nodes First Child'
            }]
        }]

        return (
            <>
                <FamilyTree data={data} />
            </>
        );
    }
}

export default FamilyTreeContainer;