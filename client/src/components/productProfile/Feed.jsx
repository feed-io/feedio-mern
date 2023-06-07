import React, { useContext } from "react";
import { Box } from "@mui/material";

import { AuthContext } from "../../context/auth-context";
import ReviewList from "./ReviewList";

const Feed = (props) => {
  const auth = useContext(AuthContext);
  return (
    <Box bgcolor="skyblue" flex={7} p={2}>
      <ReviewList
        productId={props.product._id}
        userId={auth.userId}
        token={auth.token}
      />
    </Box>
  );
};

export default Feed;

//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//               }}>
//               <ReviewList
//                 productId={productId}
//                 userId={auth.userId}
//                 token={auth.token}
//               />
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     ) : (
//       <Typography>Loading...</Typography>
//     )}
//   </Box>
// </Box>
