import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Layout from "../components/Layout";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useNavigate } from "react-router-dom";
import { changePasswordPost } from "../api/common";

export default function EnterOTPs() {
 
  const [pwError, setPwError] = React.useState("");
  const [confirmPwError, setConfirmPwError] = React.useState("");
  const navigate = useNavigate();
  const handleSubmitPassword = async (event) => {
    setPwError("");
    setConfirmPwError("");

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
     password: data.get("password"),
    };

     if (data.get("password").length < 8) {
      setPwError("Password too short.");
    } else if (data.get("password") !== data.get("confirmPassword")) {
      setConfirmPwError("This field does not match with the password.");
    } else {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await changePasswordPost(postData, user._id);
        console.log(response);
        if (response.result.data) {
          const { user } = response.result.data;
          const userString = JSON.stringify(user);
          localStorage.setItem("user", userString);

          if (user.istotpenabled) {
            navigate("/totp/enter");
          } else {
              navigate("/totp/enable");
          }
          
        }
    }



    
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <VerifiedUserIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            sx={{
              mt: 2,
            }}
          >
            CHANGE YOUR PASSWORD
          </Typography>

          <hr
            style={{
              width: "20%",
              height: "2px",
              backgroundColor: "#243665",
              border: "none",
            }}
          />
          <Box
            component="form"
            onSubmit={handleSubmitPassword}
            noValidate
            sx={{ mt: 1 }}
          >
           

            <TextField
              required
              fullWidth
              name="password"
              label="Set a New Password"
              type="password"
              id="password"
              autoComplete="new-password"
              error={pwError === "" ? false : true}
              helperText={pwError === "" ? "" : pwError}
              sx={{
                  my: "1rem"
              }}
            />

            <TextField
              required
              fullWidth
              name="password"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              error={confirmPwError === "" ? false : true}
              helperText={confirmPwError === "" ? "" : confirmPwError}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 0 }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}