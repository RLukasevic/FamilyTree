export type TreeDataType = {
    key:string,
    path:string[],
    name:string,
    lastName:string,
    bDate:string,
    children:Array<TreeDataType>,
}

export type ModalDataType = {
    name:string,
    lastName:string,
    bDate:string
}