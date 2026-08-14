import { createSlice } from "@reduxjs/toolkit";
import initialAssignments from "../../data/assignments.js";

const assignmentsSlice = createSlice({
  name: "assignments",

  initialState: initialAssignments,

  reducers: {
    addAssignment: (state, action) => {
      state.push(action.payload);
    },

    updateAssignmentStatus: (state, action) => {
      const { assignmentId, status } = action.payload;

      const assignment = state.find(
        (item) => item.id === assignmentId
      );

      if (assignment) {
        assignment.status = status;
      }
    },
  },
});

export const {
  addAssignment,
  updateAssignmentStatus,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;