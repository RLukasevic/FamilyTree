import React, {useState} from 'react';
import { TreeDataType } from '../../../Types/types';
import FamilyTree from '../FamilyTree';
import styled from 'styled-components/native';

const FamilyTreeNode  = (props:Props) => {

    const [childVisible,setChildVisible] = useState(false);

    return (
        <>
            <Card level={(String(props.level * 30 + 5)+'px')}>
                <MainBodyContainer onPress={() => setChildVisible(v => !v)}>
                    {props.data.children.length > 0 && (
                        <PlusMinusButton>
                            {childVisible ? '-' : '+'}
                        </PlusMinusButton>
                    )}
                    <NodeDataContainer>
                        <TextRow>
                            {props.data.name}
                        </TextRow>
                        <TextRow>
                            {props.data.lastName}
                        </TextRow>
                        <TextRow>
                            {props.data.bDate}
                        </TextRow>
                    </NodeDataContainer>
                </MainBodyContainer>

                <SettingsButton onPress={() => props.openSettings(props.data)} >
                    <SettingsText>Settings</SettingsText>
                </SettingsButton>
            </Card>

            {props.data.children && childVisible ? <FamilyTree openSettings={props.openSettings} data={props.data.children} /> : null}
        </>
    )
}

const Card = styled.View<CardProps>`
    flex-direction: row;
    text-align: center;
    border: 2px solid black;
    border-radius: 25px;
    font-size: 14px;
    height: 100px;
    max-width: 40%;
    margin: 5px 10px 5px 10px;
    margin-left: ${props => props.level};
    background: rgb(61, 163, 54);
`;

const MainBodyContainer = styled.TouchableOpacity`
    flex: 4;
    flex-direction: row;
`;

const PlusMinusButton = styled.Text`
    flex: 1;
    padding: 40px 0px 40px 5px;
    color: white;
    font-weight: bold;
`;

const NodeDataContainer = styled.View`
    flex: 12;
    flex-direction: column;
    padding: 0px 0px 3px 10px;
`;

const TextRow = styled.Text`
    flex: 1;
    color: white;
    font-weight: bold;
`;

const SettingsButton = styled.TouchableOpacity`
    flex: 1;
    border: 0px solid black;
    border-left-width: 2px;
`;

const SettingsText = styled.Text`
    flex: 1;
    width: 100px;
    height: 20px;
    text-align: center;
    transform: rotate(-90deg);
    overflow: visible;
    color: white;
    font-weight: bold;
`;

interface CardProps {
    level: string,
}

interface Props {
    data: TreeDataType,
    openSettings: (el:TreeDataType) => {},
    level: number,
}

export default FamilyTreeNode;