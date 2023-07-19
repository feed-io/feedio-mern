// import React, { useState, useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Stack, Box, Typography } from "@mui/material";
// import axios from "axios";

// import { AuthContext } from "../context/auth-context";
// import Feed from "../components/productProfile/Feed";
// import Sidebar from "../components/productProfile/Sidebar";

// export default function RoomPage() {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const auth = useContext(AuthContext);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/users/${auth.userId}/products/${productId}`,
//           {
//             headers: {
//               Authorization: "Bearer " + auth.token,
//             },
//           }
//         );

//         setProduct(response.data.product);
//       } catch (error) {
//         console.log("Error fetching product:", error.message);
//       }
//     };

//     fetchProduct();
//   }, [productId, auth.userId, auth.token]);

//   if (!product) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box>
//       <Stack direction={"row"}>
//         <Sidebar product={product} />
//         <Feed product={product} />
//       </Stack>
//     </Box>
//   );
// }

import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  AppBar,
  Container,
  Toolbar,
  SvgIcon,
  Tooltip,
  Divider,
} from "@mui/material";
import { Lock } from "@mui/icons-material";

import { AuthContext } from "../context/auth-context";
import ReviewRows from "../components/ReviewRows";

const RoomPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const auth = useContext(AuthContext);

  const WallOfLoveIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </SvgIcon>
  );

  const SingleTestimonialIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </SvgIcon>
  );

  const CollectingWidgetIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
    </SvgIcon>
  );

  const MetricsIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </SvgIcon>
  );

  const CustomIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </SvgIcon>
  );

  const links = [
    {
      href: `http://localhost:3000/reviewSpace/${productId}`,
      label: "Public landing page",
      tooltip: "",
    },
    {
      href: `http://localhost:3000/showRoom/${productId}`,
      label: "Show Room page",
      tooltip: "",
    },
  ];

  const buttons = [
    { Icon: WallOfLoveIcon, label: "Show Room" },
    { Icon: SingleTestimonialIcon, label: "Single review" },
    { Icon: CollectingWidgetIcon, label: "Collecting widget" },
    { Icon: MetricsIcon, label: "Metrics" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://feedio-server.vercel.app/api/users/${auth.userId}/products/${productId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );

        setProduct(response.data.product);
        console.log(response);
      } catch (error) {
        console.log("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productId, auth.userId, auth.token]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ py: 2, mt: 4, borderColor: "divider", borderBottom: 1 }}>
        <Container>
          <Toolbar disableGutters variant="dense">
            <Box display="flex" alignItems="center" flexGrow={1}>
              <Box display="flex" alignItems="center">
                <Box display="flex" flexDirection="column">
                  <Typography variant="h4" component="h1">
                    {product.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<SvgIcon></SvgIcon>}>
              Edit space
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        sx={{ paddingBottom: "500px", width: "100%" }}
        maxWidth={false}>
        <Grid container spacing={4} direction="row" justifyContent="center">
          <Grid item xs={12} md={3} sx={{ paddingBottom: "50px" }}>
            <Box component="list" sx={{ flexGrow: 1, width: "fit-content" }}>
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    mx: 2,
                    my: 2,
                    textTransform: "uppercase",
                    color: "gray.300",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}>
                  Links
                </Typography>
                {links.map(({ href, label, tooltip }) => (
                  <Tooltip title={tooltip} arrow>
                    <Button
                      href={href}
                      target="_blank"
                      fullWidth
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        px: 3,
                        py: 2,
                        fontSize: "1rem",
                        color: "gray.800",
                        "&:hover": {
                          color: "gray.600",
                          backgroundColor: "gray.100",
                        },
                        borderRadius: "md",
                        transition: "ease-in-out 0.15s",
                      }}>
                      <CustomIcon
                        sx={{
                          mr: 2,
                          width: 16,
                          height: 16,
                          stroke: "currentColor",
                          strokeWidth: 2,
                        }}
                      />
                      <Box sx={{ textAlign: "left" }}>{label}</Box>
                      {tooltip && (
                        <Box sx={{ px: 4, py: 1 }}>
                          <Lock
                            color="warning"
                            sx={{ width: 16, height: 16 }}
                          />
                        </Box>
                      )}
                    </Button>
                  </Tooltip>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{ pt: 0 }}>
            <Box component="list" sx={{ flexGrow: 1, width: "fit-content" }}>
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    mx: 2,
                    my: 2,
                    textTransform: "uppercase",
                    color: "gray.400",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}>
                  Integrations
                </Typography>
                <Button
                  fullWidth
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    px: 3,
                    py: 2,
                    fontSize: "1rem",
                    color: "gray.800",
                    "&:hover": {
                      color: "gray.600",
                      backgroundColor: "gray.100",
                    },
                    backgroundColor: "gray.200",
                    borderRadius: "md",
                    transition: "ease-in-out 0.15s",
                  }}>
                  COMING SOON
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{ pt: 0 }}>
            <Box component="list" sx={{ flexGrow: 1, width: "fit-content" }}>
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    mx: 2,
                    my: 2,
                    textTransform: "uppercase",
                    color: "gray.300",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}>
                  Embeds &amp; Metrics
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}>
                  {buttons.map(({ Icon, label }) => (
                    <Button
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        px: 3,
                        py: 2,
                        fontSize: "1rem",
                        color: "gray.800",
                        "&:hover": {
                          color: "gray.600",
                          backgroundColor: "gray.100",
                        },
                        borderRadius: "md",
                        transition: "ease-in-out 0.15s",
                      }}>
                      <Icon
                        sx={{
                          mr: 2,
                          width: 16,
                          stroke: "currentColor",
                          strokeWidth: 1.5,
                        }}
                      />
                      <Box sx={{ textAlign: "left" }}>{label}</Box>
                    </Button>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Divider
            variant="fullWidth"
            role="presentation"
            sx={{ borderWidth: 1, borderColor: "black" }}
          />
          <ReviewRows
            productId={productId}
            userId={auth.userId}
            token={auth.token}
          />
        </Grid>
      </Container>
    </>
  );
};
export default RoomPage;
