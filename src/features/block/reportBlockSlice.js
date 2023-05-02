import { createSlice } from '@reduxjs/toolkit'
import {createReportBlock, getReportBlocksById, updateReportBlock, deleteReportBlock, deleteReportBlockWithChildren} from "./reportBlockActions";
import produce from 'immer';

const initialState = {
    loading: true,
    reportData: {},
    error: null
}

const reportBlockSlice = createSlice({
    name: 'reportBlock',
    initialState,
    reducers: {
        moveReportBlock: (state, action) => {
            const { movedBlock, targetBlock, isBefore } = action.payload;
            const firstId = movedBlock.id;
            const secondId = targetBlock.id;
            const secondParentId = targetBlock.parentId;

            let firstNode = null;
            let secondNode = null;
            let secondNodeParent = null;

            const findNodes = (node) => {
                if (node.id === firstId) {
                    firstNode = node;
                }
                if (node.id === secondId) {
                    secondNode = node;
                }

                if (node.id === secondParentId) {
                    secondNodeParent = node;
                }
                if (!firstNode || !secondNode) {
                    node.children.forEach(findNodes);
                }
            }

            const deleteNodeWithChildren = (nodes) => {
                return produce(nodes, (draftNodes) => {
                    for (let i = draftNodes.length - 1; i >= 0; i--) {
                        const node = draftNodes[i];
                        if (node.id === firstId) {
                            console.log("Matching id: " + node.id)
                            draftNodes.splice(i, 1);
                        } else if (node.children) {
                            node.children = deleteNodeWithChildren(node.children);
                        }
                    }
                });
            };

            state.reportData[0].blocks.forEach(findNodes);
            state.reportData[0].blocks = deleteNodeWithChildren(state.reportData[0].blocks, firstId);
            console.log(firstNode.title)
            console.log(secondNode.title)
            console.log(secondNodeParent.title)
            if (secondNodeParent != null){
                let index = secondNodeParent.children.indexOf(secondNode);
                if (!isBefore){
                    index += 1;
                }
                console.log(index);
                firstNode.parentId = secondNodeParent.id;
                console.log(firstNode.parentId)
                secondNodeParent.children.splice(index, 0, firstNode);
                console.log(secondNodeParent.children.indexOf(firstNode));
            }
            else {
                let index = state.reportData[0].blocks.indexOf(secondNode);
                if (!isBefore){
                    index += 1;
                }
                console.log(index);
                firstNode.parentId = null;
                state.reportData[0].blocks.splice(index, 0, firstNode);
            }
            console.log(state.reportData[0].blocks);
        },
    },
    extraReducers: {
        [getReportBlocksById.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getReportBlocksById.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.reportData = payload
        },
        [getReportBlocksById.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        [updateReportBlock.pending]: (state) => {
            state.error = null
        },
        [updateReportBlock.fulfilled]: (state, { payload }) => {
            const updateNode = (nodes) => {
                return nodes.map((node) => {
                    if (node.id === payload[0].id) {
                        return { ...node, ...payload[0] };
                    }
                    if (node.children) {
                        return { ...node, children: updateNode(node.children) };
                    }
                    return node;
                });
            };
            return {
                ...state,
                reportData: [
                    {
                        blocks: updateNode(state.reportData[0].blocks),
                    },
                ],
            };
        },
        [updateReportBlock.rejected]: (state, { payload }) => {
            state.error = payload
        },


        [createReportBlock.pending]: (state) => {
            state.error = null
        },
        [createReportBlock.fulfilled]: (state, { payload }) => {
            const parentId = payload[0].parentId;
            if (parentId == null){
                state.reportData[0].blocks.push(payload[0]);
                return;
            }
            const createNode = (nodes) => {
                return nodes.map((node) => {
                    if (node.id === parentId) {
                        if (node.children) {
                            return { ...node, children: [...node.children, payload[0]] };
                        }
                        else{
                            return { ...node, children: [payload[0]] };
                        }
                    }
                    if (node.children) {
                        return { ...node, children: createNode(node.children) };
                    }
                    return node;
                });
            };
            return {
                ...state,
                reportData: [
                    {
                        blocks: createNode(state.reportData[0].blocks),
                    },
                ],
            };
        },
        [createReportBlock.rejected]: (state, { payload }) => {
            state.error = payload
        },


        [deleteReportBlock.pending]: (state) => {
            state.error = null
        },
        [deleteReportBlock.fulfilled]: (state, { payload }) => {
            const deleteNode = (nodes) => {
                return produce(nodes, (draftNodes) => {
                    for (let i = draftNodes.length - 1; i >= 0; i--) {
                        const node = draftNodes[i];
                        console.log(node.id)
                        if (node.id === payload) {
                            if (node.children) {
                                console.log("Deleting node with children with id: " + node.id);
                                draftNodes.splice(i, 1, ...node.children);
                            } else {
                                console.log("Deleting node with id: " + node.id);
                                draftNodes.splice(i, 1);
                            }
                        } else if (node.children) {
                            node.children = deleteNode(node.children);
                        }
                    }
                });
            };

            return {
                ...state,
                reportData: [
                    {
                        blocks: deleteNode(state.reportData[0].blocks),
                    },
                ],
            };
        },
        [deleteReportBlock.rejected]: (state, { payload }) => {
            state.error = payload
        },


        [deleteReportBlockWithChildren.pending]: (state) => {
            state.error = null
        },
        [deleteReportBlockWithChildren.fulfilled]: (state, { payload }) => {
            const deleteNode = (nodes) => {
                return produce(nodes, (draftNodes) => {
                    for (let i = draftNodes.length - 1; i >= 0; i--) {
                        const node = draftNodes[i];
                        if (node.id === payload) {
                            console.log("Matching id: " + node.id)
                            draftNodes.splice(i, 1);
                        } else if (node.children) {
                            node.children = deleteNode(node.children);
                        }
                    }
                });
            };
            return {
                ...state,
                reportData: [
                    {
                        blocks: deleteNode(state.reportData[0].blocks, payload),
                    },
                ],
            };
        },
        [deleteReportBlockWithChildren.rejected]: (state, { payload }) => {
            state.error = payload
        },
    }
})

export const { moveReportBlock } = reportBlockSlice.actions;

export default reportBlockSlice.reducer;