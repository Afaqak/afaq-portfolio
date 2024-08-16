// import React from "react";
// import { useGesture, useHover, useMove } from "@use-gesture/react";

// const WorkItem = ({ imageData, work, index, dataLabel, setHoveredItem }) => {
//   const bind = useGesture({
//     onMove: (state) => {
//       console.log(state);
//       setHoveredItem({
//         isVisible: state.active,
//         position: {
//           x: state.event.clientX,
//           y: state.event.clientY,
//         },
//         imageData,
//       });
//     },
//     onMouseOver: (state) => {
//       console.log(state, "OVER");
//       console.log(state.xy);
//       setHoveredItem({
//         isVisible: state.active,
//         position: {
//           x: state.event.clientX,
//           y: state.event.clientY,
//         },
//         imageData,
//       });
//     },
//   });

//   return (
//     <div
//       key={index}
//       data-label={dataLabel}
//       {...bind()}
//       className="grid grid-cols-4 h-40 cursor-pointer place-content-center border-b border-gray-200"
//     >
//       <span className="text-xl font-semibold">{work.title}</span>
//       <span className="text-gray-600">{work.location}</span>
//       <span className="text-gray-600">{work.services}</span>
//       <span className="text-gray-600">{work.year}</span>
//     </div>
//   );
// };

// export default React.memo(WorkItem);
