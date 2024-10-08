import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Divider } from "@mui/material";
import { orange } from "@mui/material/colors";
import PropertyIcons from "../PropertyIcons";

function RentSaleItem(props) {
  const { itemImg } = props;

  let encodedImgUrl = null;
  // if (itemImg) {
  //   const encodedFilename = encodeURIComponent(itemImg.split("/").pop());
  //   encodedImgUrl = `${process.env.REACT_APP_UPLOAD_URL}/${encodedFilename}`;
  // }

  if (itemImg) {
    // const encodedFilename = encodeURIComponent(itemImg.split("/").pop());
    // encodedImgUrl = `${process.env.REACT_APP_UPLOAD_URL}/${encodedFilename}`;
    encodedImgUrl = itemImg;
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Determine the justifyContent based on screen width
  const justifyContent = windowWidth <= 900 ? "center" : "flex-end"; // Adjust the breakpoint as needed

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Link
            to={`/${props.itemURL}property/${props.itemId}`}
            style={{ textDecoration: "none" }}
          >
            <h2
              style={{
                fontSize: "1.4em",
                fontWeight: "bold",
                color: "black",
                textTransform: "capitalize",
              }}
            >
              {props.itemTitle}
            </h2>
          </Link>
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.3em",
              textTransform: "uppercase",
              marginTop: "0.3rem",
            }}
          >
            {props.itemAddress}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.2em",
              textTransform: "uppercase",
              color: orange[500],
              marginTop: "0.5rem",
            }}
          >
            ${props.itemPrice}{" "}
            {props.itemURL === "rent" ? "Per Month" : "Full Price"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginY: "1rem",
            }}
          >
            {props.itemShortDescription}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PropertyIcons
              bedrooms={props.itemBedrooms}
              bathrooms={props.itemBathrooms}
              livingrooms={props.itemLivingrooms}
            />
            <Link to={`/${props.itemURL}property/${props.itemId}`}>
              <Button variant="contained" color="warning" size="large">
                Book Property
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            marginBottom: { xs: "2rem", md: "0" },
          }}
        >
          <Link
            to={`/${props.itemURL}property/${props.itemId}`}
            style={{
              display: "flex",
              justifyContent: justifyContent,
            }}
          >
            <img
              src={encodedImgUrl}
              alt="property img"
              style={{
                height: "250px",
                width: "500px",
                maxWidth: "75%",
                objectFit: "cover",
              }}
            />
          </Link>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}

export default RentSaleItem;

// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, Typography, Button, Divider } from "@mui/material";
// import { orange } from "@mui/material/colors";
// import PropertyIcons from "../PropertyIcons";

// function RentSaleItem(props) {
//   return (
//     <Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column-reverse", md: "row" },
//           marginTop: "2rem",
//           marginBottom: "2rem",
//         }}
//       >
//         <Box
//           sx={{
//             width: { xs: "100%", md: "50%" },
//           }}
//         >
//           <Link
//             to={`/${props.itemURL}property/${props.itemId}`}
//             style={{ textDecoration: "none" }}
//           >
//             <h2
//               style={{
//                 fontSize: "1.4em",
//                 fontWeight: "bold",
//                 color: "black",
//                 textTransform: "capitalize",
//               }}
//             >
//               {props.itemTitle}
//             </h2>
//           </Link>
//           <Typography
//             variant="h3"
//             sx={{
//               fontSize: "1.3em",
//               textTransform: "uppercase",
//               marginTop: "0.3rem",
//             }}
//           >
//             {props.itemAddress}
//           </Typography>
//           <Typography
//             variant="h4"
//             sx={{
//               fontSize: "1.2em",
//               textTransform: "uppercase",
//               color: orange[500],
//               marginTop: "0.5rem",
//             }}
//           >
//             ${props.itemPrice} per month
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{
//               marginY: "1rem",
//             }}
//           >
//             {props.itemShortDescription}
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <PropertyIcons
//               bedrooms={props.itemBedrooms}
//               bathrooms={props.itemBathrooms}
//               livingrooms={props.itemLivingrooms}
//             />
//             <Link to={`/${props.itemURL}property/${props.itemId}`}>
//               <Button variant="contained" color="warning" size="large">
//                 Full details
//               </Button>
//             </Link>
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             width: { xs: "100%", md: "50%" },
//             marginBottom: { xs: "2rem", md: "0" },
//           }}
//         >
//           <Link
//             to={`/${props.itemURL}property/${props.itemId}`}
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <img
//               src={props.itemImg}
//               alt="property img"
//               style={{
//                 height: "auto",
//                 maxWidth: "75%",
//               }}
//             />
//           </Link>
//         </Box>
//       </Box>
//       <Divider />
//     </Box>
//   );
// }

// export default RentSaleItem;
