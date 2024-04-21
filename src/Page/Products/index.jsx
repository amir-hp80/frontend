import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import fetchApi from "../../Utils/fetchApi";
import "./style.css";
import { FallingLines } from "react-loader-spinner";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Drawer,
  Slider,
  TabScrollButton,
  useMediaQuery,
  Modal,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import LastPageIcon from "@mui/icons-material/LastPage";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useCollapse } from "react-collapsed";

function commafy(num) {
  var str = num.toString().split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}

export function ProductCard({
  image,
  name,
  price,
  id,
  discount,
  categoryTitle,
}) {
  return (
    <>
      <div className="card-wrapper2">
        <div className="image-card">
          <Link
            to={`/${categoryTitle}/product-detail/${id}/${name
              .split(" ")
              .join("-")}`}>
            <img src={image} alt="" />
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#ececec",
              width: "fit-content",
              padding: "0.1rem 0.2rem",
              borderRadius: "1.5rem",
              marginBottom: "0.5rem",
            }}>
            <img
              style={{ width: "18px", height: "fit-content", padding: "0" }}
              src="../../../public/image/banner/footer/post.svg"
              alt=""
            />
            <span style={{ fontSize: "10px" }}>ارسال رایگان</span>
          </div>
        </div>

        <div className="detail-wrapper">
          <div className="product-name">
            <Link
              to={`/${categoryTitle}/product-detail/${id}/${name
                .split(" ")
                .join("-")}`}>
              <h5>{name}</h5>
            </Link>
          </div>

          <div className="product-detail">
            <div className="product-point">
              <span>-</span>
              <img src="../../../public/image/banner/footer/star.svg" alt="" />
            </div>

            {discount ? (
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                    width: "100%",
                  }}>
                  <div>
                    <span className="percent">{discount}%</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      className="discount"
                      style={{
                        color: "#ff1a34",
                        fontSize: "22px",
                        fontWeight: "bold",
                      }}>
                      {commafy(price * (1 - discount / 100))}
                    </span>
                    <img
                      src="../../../../public/image/banner/svgexport-13.svg"
                      style={{ width: "19px", height: "19px" }}
                    />
                  </div>
                </div>
                <div
                  className="card-price"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    float: "left",
                  }}>
                  <span
                    className="price"
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                    }}>
                    {commafy(price)}
                  </span>
                  <img
                    style={{ width: "19px", height: "19px" }}
                    src="../../../public/image/banner/svgexport-13.svg"
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="card-price">
                <span>{commafy(price)}</span>
                <img
                  style={{ width: "19px", height: "19px" }}
                  src="../../../public/image/banner/svgexport-13.svg"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

export default function Product() {
  const { categoryName } = useParams();
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState("discount:desc");

  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  const handleClose = () => {
    setDrawerOpen(false);
    setShow(false);
  };
  const handleOpen = () => {
    if (mobileSize) {
      setDrawerOpen(true);
      setShow(true);
    } else {
      setShow(true);
    }
  };

  const [modal, setModal] = useState(false);
  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const [label, setLabel] = useState("بیشترین تخفیف");

  const handleChange3 = (event) => {
    setRadio(event.target.value);
  };



  const mobileSize = useMediaQuery("(max-width:790px)");
  const mobileSize2 = useMediaQuery("(max-width:500px)");

  let array1 = [];
  let array2 = [];
  let array3 = [];

  const handleChange = (event, newValue, inputProps) => {
    setSort(newValue);
    setLabel(event.target.name);
  };

  

  const [minimum, setMinimum] = useState("0");
  const [maximum, setMaximum] = useState("100000000");
  const [valueSlider, setValueSlider] = useState([minimum, maximum]);

  const handleChange2 = (event, newValue, minimum) => {
    setValueSlider(newValue);
  };

  const [filterName, setFilterName] = useState([]);

  const handleFilterChange = (name) => {
    if (filterName.includes(name)) {
      setFilterName(filterName.filter((filter) => filter !== name));
    } else {
      setFilterName([...filterName, name]);
    }
  };

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    (async () => {
      const res = await fetchApi(
        `products?populate=*&filters[category][$eqi]=${categoryName}&filters[price][$gte]=${valueSlider[0]}&filters[price][$lte]=${valueSlider[1]}&sort=${sort}`
      );
      setTimeout(() => {
        setProduct(res.data);
      }, 1500);

      const categoryFilter = await fetchApi(
        `products?populate=*&filters[RAM][$in]=`
      );
      setCategory(categoryFilter.data);
    })();
  }, [categoryName, valueSlider, sort, filterName]);

  if (product) {
    array1 =
      product[0]?.attributes?.categories?.data[0]?.attributes?.filter[0].name;
    array2 = Object.entries(
      product[0]?.attributes?.categories?.data[0]?.attributes?.filter[0]
    );
  }
  console.log(array3?.map((e) => e[1]));

  const filterItem = array2?.map((e, index) => (
    <Accordion sx={{ border: "none !important", boxShadow: "none" }}>
      <AccordionSummary
        sx={{ border: "none", padding: "0" }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header">
        <Typography sx={{ fontFamily: "Vazir FD" }}>{e[0]}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {e[1]?.map((e, index) => (
          <div style={{ display: "flex", aligItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              name={e}
              onChange={() => handleFilterChange(e)}
            />
            <label htmlFor={e}>{e}</label>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  ));

  const items =
    filterName.length > 0
      ? product
          ?.filter(
            (e) =>
              filterName.includes(e?.attributes?.RAM) ||
              filterName.includes(e?.attributes?.ROM) ||
              filterName.includes(e?.attributes?.internet) ||
              filterName.includes(e?.attributes?.Bluetooth) ||
              filterName.includes(e?.attributes?.group) ||
              filterName.includes(e?.attributes?.cpu) ||
              filterName.includes(e?.attributes?.company)
          )
          .map((e, index) => (
            <ProductCard
              key={index}
              id={e?.id}
              name={e?.attributes?.title}
              price={e?.attributes?.price}
              discount={e?.attributes?.discount}
              categoryTitle={e?.attributes?.category}
              image={
                import.meta.env.VITE_BASE_URL +
                e?.attributes?.image?.data[0]?.attributes?.url
              }
            />
          ))
      : product?.map((e, index) => (
          <ProductCard
            key={index}
            id={e?.id}
            name={e?.attributes?.title}
            price={e?.attributes?.price}
            discount={e?.attributes?.discount}
            categoryTitle={e?.attributes?.category}
            image={
              import.meta.env.VITE_BASE_URL +
              e?.attributes?.image?.data[0]?.attributes?.url
            }
          />
        ));

  return (
    <>
      {product ? (
        <div>
          {/* -------------------sort-tab ---------------------- */}
          {show ? (
            <div style={{ display: "flex", alignItems: "baseline" }}>
              {mobileSize ? (
                <div className="filter-tab-wrapper2">
                  <div className="filter-button">
                    <button onClick={handleOpen}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}>
                        <TuneIcon />
                        <span>فیلترها</span>
                      </div>
                    </button>
                  </div>

                  <Drawer
                    open={drawerOpen}
                    onClose={handleClose}
                    anchor="right"
                    sx={{}}>
                    <div className="filter-list" style={{ width: "250px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          justifyContent: "space-between",
                          padding: "0.5rem 0",
                          
                        }}>
                        <span>فیلتر ها</span>
                        <img
                          style={{ width: "30px" }}
                          onClick={handleClose}
                          src="../../../public/image/banner/footer/close.svg"
                          alt=""
                        />
                      </div>
                      
                      <Accordion
                        sx={{ border: "none !important", boxShadow: "none" }}>
                        <AccordionSummary
                          sx={{ border: "none", padding: "0" }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2-content"
                          id="panel2-header">
                          <Typography sx={{ fontFamily: "Vazir FD" }}>
                            فیلتر بر اساس قیمت
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                          }}>
                          <div className="content">
                            <div>
                              <Slider
                                getAriaLabel={() => "price range"}
                                value={valueSlider}
                                onChange={handleChange2}
                                valueLabelDisplay="auto"
                                min={0}
                                max={100000000}
                                step={500}
                              />

                              <FormControl
                                fullWidth
                                sx={{ m: 1 }}
                                variant="standard">
                                <span style={{ margin: "0.5rem 0" }}>از</span>
                                <Input
                                  className="input-range"
                                  value={commafy(valueSlider[0])}
                                  onChange={(e) => setMinimum(e.target.value)}
                                  id="standard-adornment-amount"
                                  endAdornment={
                                    <InputAdornment position="start">
                                      <img src="../../../public/image/banner/svgexport-13.svg" />
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                              <FormControl
                                fullWidth
                                sx={{ m: 1 }}
                                variant="standard">
                                <span style={{ margin: "0.5rem 0" }}>تا</span>
                                <Input
                                  className="input-range"
                                  value={commafy(valueSlider[1])}
                                  onChange={(e) => setMaximum(e.target.value)}
                                  endAdornment={
                                    <InputAdornment position="start">
                                      <img src="../../../public/image/banner/svgexport-13.svg" />
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      {filterItem}
                    </div>
                  </Drawer>
                </div>
              ) : (
                <div className="filter-tab-wrapper">
                  <div className="filter-tab">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}>
                        <TuneIcon />
                        <span>فیلترها</span>
                      </div>

                      <div>
                        <LastPageIcon
                          onClick={() => setShow(false)}
                          sx={{ color: "#0b6ebe", cursor: "pointer" }}
                        />
                      </div>
                    </div>

                    <div className="filter-list">
                      
                      <Accordion
                        sx={{ border: "none !important", boxShadow: "none" }}>
                        <AccordionSummary
                          sx={{ border: "none", padding: "0" }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2-content"
                          id="panel2-header">
                          <Typography sx={{ fontFamily: "Vazir FD" }}>
                            فیلتز بر اساس قیمت
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                          }}>
                          <div className="content">
                            <div>
                              <Slider
                                getAriaLabel={() => "price range"}
                                value={valueSlider}
                                onChange={handleChange2}
                                valueLabelDisplay="auto"
                                min={0}
                                max={100000000}
                                step={500}
                              />

                              <FormControl
                                fullWidth
                                sx={{ m: 1 }}
                                variant="standard">
                                <span style={{ margin: "0.5rem 0" }}>از</span>
                                <Input
                                  className="input-range"
                                  value={commafy(valueSlider[0])}
                                  onChange={(e) => setMinimum(e.target.value)}
                                  id="standard-adornment-amount"
                                  endAdornment={
                                    <InputAdornment position="start">
                                      <img src="../../../public/image/banner/svgexport-13.svg" />
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                              <FormControl
                                fullWidth
                                sx={{ m: 1 }}
                                variant="standard">
                                <span style={{ margin: "0.5rem 0" }}>تا</span>
                                <Input
                                  className="input-range"
                                  value={commafy(valueSlider[1])}
                                  onChange={(e) => setMaximum(e.target.value)}
                                  endAdornment={
                                    <InputAdornment position="start">
                                      <img src="../../../public/image/banner/svgexport-13.svg" />
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      {filterItem}
                    </div>
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "1rem",
                }}>
                <div className="sort-tab">
                  <Box className="tab-wrapper1">
                    <Tabs
                      className="tab-1"
                      sx={{
                        dir: "rtl !important",
                        fontFamily: "Vazir FD !important",
                      }}
                      value={sort}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons={true}
                      aria-label="scrollable auto tabs example">
                      <Tab value={"discount:desc"} label="بیشترین تخفیف" />
                      <Tab value={"price:desc"} label="بیشترین قیمت" />
                      <Tab value={"price:asc"} label="کمترین قیمت" />
                      <Tab value={"createdAt:asc"} label="جدید ترین" />
                    </Tabs>
                  </Box>
                  <span>{product && product.length}کالا</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    gap: "1rem",
                    padding: "0 1rem",
                  }}>
                  {items}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="btn-sort-wrapper">
                <div className="filter-button">
                  <button onClick={handleOpen}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}>
                      <TuneIcon />
                      <span>فیلترها</span>
                    </div>
                  </button>
                </div>
                {mobileSize2 ? (
                  <div className="sort-tab">
                    <Box className="tab-wrapper2">
                      <div>
                        <span
                          style={{
                            marginRight: "0.5rem",
                            fontSize: { md: "12px !important" },
                          }}>
                          به ترتیب :
                        </span>
                        <Button onClick={handleOpenModal}>{label}</Button>
                        <Modal
                          open={modal}
                          onClose={handleCloseModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description">
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2">
                              به ترتیب:
                            </Typography>
                            <FormControl sx={{ width: "100%" }}>
                              <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={sort}
                                onChange={handleChange}>
                                <FormControlLabel
                                  className="radio"
                                  value={"discount:desc"}
                                  control={<Radio name={"بیشترین تخفیف"} />}
                                  label="بیشترین تخفیف"
                                />
                                <FormControlLabel
                                  value={"price:desc"}
                                  control={<Radio name={"بیشترین قیمت"} />}
                                  label="بیشترین قیمت"
                                />
                                <FormControlLabel
                                  value={"price:asc"}
                                  control={<Radio name={"کمترین قیمت"} />}
                                  label="کمترین قیمت"
                                />
                                <FormControlLabel
                                  value={"createdAt:asc"}
                                  control={<Radio name={"جدیدترین"} />}
                                  label="جدید ترین"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Box>
                        </Modal>
                      </div>
                    </Box>
                    <span>{product && product.length}کالا</span>
                  </div>
                ) : (
                  <div className="sort-tab">
                    <Box className="tab-wrapper2">
                      <Tabs
                        className="tab-2"
                        sx={{ dir: "rtl !important", marginLeft: "0.5rem" }}
                        value={sort}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons={true}
                        aria-label="scrollable auto tabs example">
                        <Tab value={"discount:desc"} label="بیشترین تخفیف" />
                        <Tab value={"price:desc"} label="بیشترین قیمت" />
                        <Tab value={"price:asc"} label="کمترین قیمت" />
                        <Tab value={"createdAt:asc"} label="جدید ترین" />
                      </Tabs>
                    </Box>
                    <span>{product && product.length}کالا</span>
                  </div>
                )}
              </div>

              {/*-----------------product-card----------------------  */}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                  gap: "1rem",
                  padding: "0 1.7rem",
                }}>
                {items}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="loader">
          <FallingLines />
        </div>
      )}
    </>
  );
}
