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
            const id = payload[0].id;
            const updateNode = (nodes) => {
                return nodes.map((node) => {
                    if (node.id === id) {
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

            console.log(payload);
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
                        blocks: deleteNode(state.reportData[0].blocks),
                    },
                ],
            };
        },
        [deleteReportBlockWithChildren.rejected]: (state, { payload }) => {
            state.error = payload
        },
    }
})

export default reportBlockSlice.reducer