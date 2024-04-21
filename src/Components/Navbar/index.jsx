import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import InputBase from "@mui/material/InputBase";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Search } from "@mui/icons-material";
import {
  Badge,
  ButtonGroup,
  Drawer,
  List,
  ListItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import fetchApi from "../../Utils/fetchApi";
import { logout } from "../../Store/Slices/Auth";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["حساب کاربری", "ویرایش مشخصات فردی", "خروج از حساب کاربری"];



export default function Navbar() {
  const { token, user } = useSelector((state) => state.auth);
  const { list } = useSelector((state) => state.cart);
  const users = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [searchInp, setSearchInp] = useState();
  const [searchResult, setSearchResult] = useState();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const mobileSize = useMediaQuery("(max-width:425px)");
  const mobileSize2 = useMediaQuery("(max-width:568px)");
  const mobileSize3 = useMediaQuery("(max-width:768px)");

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  window.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
      setSearchInp("");
    }
  });


    const [position, setPosition] = useState(
      document.documentElement.scrollTop
    );
    const [visible, setVisible] = useState(true);
    useEffect(() => {
      const handleScroll = () => {
        let moving = document.documentElement.scrollTop;
        
          if(position > moving){
            setVisible(true)
          }
          else{
            setVisible(false);
          }
        
        setPosition(moving);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });
    
    const cls = visible ? "visible" : "hidden";


  const [category, setCategory] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetchApi("categories?populate=*");
      setCategory(res.data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const res = await fetchApi(
        `products?populate=*&filters[title][$containsi]=${searchInp}`
      );
      setSearchResult(res.data);
    })();
  }, [searchInp]);

  // console.log(category);
  const searchProduct = searchResult?.map((e, index) => (
    <Link
      key={index}
      to={`/${e?.attributes?.category}/product-detail/${
        e?.id
      }/${e?.attributes?.title.split(" ").join("-")}`}>
      <div className="result-wrapper">
        <span>{e?.attributes?.title.split(" ").slice(0, 7).join(" ")}</span>
        <img
          style={{ width: "50px", borderRadius: "0.3rem" }}
          src={
            import.meta.env.VITE_BASE_URL +
            e?.attributes?.image?.data[0]?.attributes?.url
          }
          alt=""
        />
      </div>
    </Link>
  ));

  const result = category?.map((e, index) => (
    <ListItem
      key={index}
      
      sx={{
        width: mobileSize2 ? "100%" : "fit-content",
        "&:hover": { borderBottom: "3px solid #388ce7" },
        height: "100%",
      }}>
      <Link
        to={`/products/${e?.attributes?.title}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          justifyContent: mobileSize2 ? "space-between" : "center",
        }}>
        <span>{e?.attributes?.name}</span>
        <img
          style={{ width: "20px" }}
          src={
            import.meta.env.VITE_BASE_URL +
            e?.attributes?.icon?.data[0]?.attributes?.url
          }
          alt=""
        />
      </Link>
    </ListItem>
  ));

  return (
    <>
      <AppBar
      className='header-wrapper'
        position="sticky"
        sx={{
          backgroundColor: "#ffffff",
          zIndex: "3 !important",
          height: "fit-content !important",
          // marginBottom:'4%',

        }}>
        <Container maxWidth="xl" sx={{ padding: "1rem" }}>
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack
              className="search-wrapper"
              flexDirection={"row"}
              alignItems={"center"}
              gap={"1rem"}
              sx={{ flexBasis: "60%" }}>
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                <IconButton
                  className="menu-icon"
                  sx={{ display: "none" }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => setDrawerOpen(true)}
                  color="black">
                  <MenuIcon />
                </IconButton>
                <img
                  src="../../../public/image/logo-7.png"
                  style={{ width: "150px" }}
                />
              </Box>
              <Box sx={{ position: "relative", width: "100%" }}>
                <InputBase
                  value={searchInp}
                  onChange={(e) => setSearchInp(e.target.value)}
                  className="search-input"
                  placeholder={
                    "محصول ، برند یا دسته بندی مورد نظرتان رو جستجو کنید ..."
                  }
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "0.5rem",
                    padding: "0.25rem 0.5rem",
                    fontSize: "14px",
                    height: "3rem",
                    width: "100%",
                    fontFamily: "vazir",
                  }}
                />

                {searchInp && (
                  <Stack
                    className="search-box"
                    sx={{
                      height: searchInp ? "300px" : "0",
                      boxShadow: searchInp
                        ? "3px 3px 10px 3px #dddddd"
                        : "none",
                      overflowY: searchInp ? "auto" : "hidden",
                      transition: "all 0.5s",
                    }}>
                    <div
                      style={{
                        padding: " 0.5rem",
                        borderBottom: "1px solid #388ce7",
                      }}>
                      <img
                        style={{ width: "20px" }}
                        src="../../../public/image/banner/footer/search.svg"
                        alt=""
                      />
                      <span style={{ color: "#000" }}>
                        جستجو برای{" "}
                        <mark style={{ color: "#388ce7" }}>{searchInp}</mark>
                      </span>
                    </div>
                    <div style={{ padding: "0.5rem 0" }}>{searchProduct}</div>
                  </Stack>
                )}
              </Box>
            </Stack>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                alignSelf: "flex-start",
              }}>
              {token ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <Box
                    sx={{
                      flexGrow: 0,
                      display: "flex",
                      gap: "0.5rem",
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    {/* <Typography sx={{ color: "#000" }}>{users}</Typography> */}
                    <Tooltip title="Open settings">
                      <IconButton
                        onMouseOver={handleOpenUserMenu}
                        sx={{ p: 0 }}>
                        <PersonOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{
                        mt: "45px",
                        position: "absolute !important",
                        left: "55px !important",
                      }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}>
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={handleCloseUserMenu}
                          sx={{ width: "250px", margin: "0.5rem 0" }}>
                          {setting === "خروج از حساب کاربری" ? (
                            <div
                              onClick={() => dispatch(logout())}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                width: "100%",
                                borderTop: "1px solid #ddd",
                                paddingTop: "0.5rem",
                                cursor: "pointer",
                              }}>
                              <img
                                style={{ width: "22px" }}
                                src="../../../public/image/banner/footer/logout.svg"
                                alt=""
                              />
                              <Typography
                                sx={{ fontFamily: "Vazir FD !important" }}
                                textAlign="center">
                                {setting}
                              </Typography>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                              }}>
                              <Typography
                                sx={{ fontFamily: "Vazir FD !important" }}
                                textAlign="center">
                                {setting}
                              </Typography>
                              <img
                                src="../../../public/image/banner/footer/arrow left.svg"
                                alt=""
                              />
                            </div>
                          )}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  <Badge badgeContent={list.length} color="error">
                    <Link to={"/cart"}>
                      <LocalMallIcon
                        sx={{ color: "#387ADF", fontSize: "2rem" }}
                      />
                    </Link>
                  </Badge>
                </Box>
              ) : (
                <div className="button-wrapper">
                  {mobileSize ? (
                    <div>
                      <Link to={"/login-register"}>
                        {/* <img
                          src="../../../public/image/banner/footer/login.svg"
                          style={{ width: "30px" }}
                          alt=""
                        /> */}
                        <button class="Btn2">
                          <div class="sign2">
                            <svg viewBox="0 0 512 512">
                              <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                            </svg>
                          </div>
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <Link to={"/login-register"}>
                      <ButtonGroup
                        sx={{
                          // border: "1px solid #40679E",
                          alignItems: "center",
                        }}>
                        {/* <button
                        className='button'
                          style={{
                            border: "none",
                            color: "#000",
                            fontFamily: "vazir",
                            "&:hover": {
                              backgroundColor: "none !important",
                              border: "none !important",
                            },
                          }}
                          >
                          ورود
                        </button> */}
                        {/* <span style={{ color: "#000", height: "100%" }}>|</span>
                        <button
                        className='button'
                          style={{
                            border: "none",
                            color: "#000",
                            fontFamily: "vazir",
                            "&:hover": {
                              backgroundColor: "none !important",
                              border: "none !important",
                            },
                          }}
                          >
                          ثبت نام
                        </button> */}

                        <button class="Btn">
                          <div class="sign">
                            <svg viewBox="0 0 512 512">
                              <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                            </svg>
                          </div>

                          <div class="text">ورود</div>
                        </button>
                      </ButtonGroup>
                    </Link>
                  )}
                  <Badge badgeContent={list.length} color="error">
                    <Link to={"/cart"}>
                      {/* <LocalMallIcon
                        sx={{ color: "#387ADF", fontSize: "2rem" }}
                      /> */}
                      <img
                        src="../../../public/image/banner/footer/cart.svg"
                        style={{ width: "30px" }}
                        alt=""
                      />
                    </Link>
                  </Badge>
                </div>
              )}
            </Box>
          </Toolbar>
        </Container>

        {!mobileSize2 && (
          <Box className={'active'}>
            <List
              className="navbar"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around !important",
                padding: "0 !important",
                height: "100%",

                "& a": {
                  color: "gray",
                  width: "100%",
                  fontSize: { xs: "14px", sm: "14px", md: "16px" },
                  transition: "0.3s all",
                  "&:hover": {
                    color: "#161616",
                  },
                },
                "& li": { textAlign: "center", padding: "0" },
              }}>
              <ListItem
                sx={{ width: "fit-content !important", height: "100%" }}>
                <Link
                  sx={{ color: "#000 !important", fontWeight: "bold" }}
                  to={"/"}>
                  صفحه اصلی
                </Link>
              </ListItem>

              {result}
            </List>
          </Box>
        )}
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="right">
        <Box sx={{ margin: "0 auto", padding: "0.5rem 0" }}>
          <img
            src="../../../public/image/logo-4.png"
            style={{ width: "150px", padding: "0.5rem" }}
          />
        </Box>
        <List
          sx={{
            width: "200px",
            "& a": {
              color: "gray",
              width: "100%",
              fontSize: "16px",
              transition: "0.3s all",
              "&:hover": {
                color: "#161616",
              },
            },
            "& li": { textAlign: "right" },
          }}>
          <ListItem>
            <Link
              sx={{ color: "#000 !important", fontWeight: "bold" }}
              to={"/"}>
              صفحه اصلی
            </Link>
          </ListItem>
          <ListItem sx={{ display: "flex", flexDirection: "column" }}>
            {result}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
