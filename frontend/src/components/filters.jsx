// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { FilterAction } from "../store/actions";

// export default function FilterArea({ area }) {
//   const [categ_list, setCategList] = useState([]);
//   const dispatch = useDispatch();
//   const getGroups = async () => {
//     console.log(area);
//     await axios.get("/api/category_list/" + area).then((res) => {
//       setCategList(res.data);
//     });
//   };
//   useEffect(() => {
//     getGroups(area);
//   }, []);

//   return (
//     <div className="filter-inputs">
//       <input type="text" placeholder="Search..." />
//       <select
//         onChange={(e) => {
//           dispatch(FilterAction("option", area, e.target.value));
//         }}
//         name=""
//         id=""
//       >
//         <option value="all" selected>
//           All Groups
//         </option>
//         {categ_list.map((cat) => {
//           return (
//             <option key={cat.slug} value={cat.slug}>
//               {cat.category}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// }
