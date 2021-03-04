import { Models } from '@rematch/core';
import { familyTreeData } from './treeModel';

export interface RootModel extends Models<RootModel> {
    familyTreeData: typeof familyTreeData
}

export const models: RootModel = { familyTreeData }