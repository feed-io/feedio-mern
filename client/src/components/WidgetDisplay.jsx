// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function WidgetDisplay({ token }) {
//   const [widgetHTML, setWidgetHTML] = useState("");

//   useEffect(() => {
//     const fetchWidgetConfig = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/api/widget/",
//           {},
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token,
//             },
//           }
//         );
//         console.log(response);
//         if (response.status === 200) {
//           setWidgetHTML(response.data.data);
//         } else {
//           console.error("Failed to fetch widget data.");
//         }
//       } catch (error) {
//         console.error("There was a problem with the fetch operation:", error);
//       }
//     };

//     fetchWidgetConfig();
//   }, [token]);

//   return <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />;
// }

// export default WidgetDisplay;
