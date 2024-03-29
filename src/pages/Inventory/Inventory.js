import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Stack, Avatar, TextField, Card, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, Tooltip } from '@mui/material';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { enqueueSnackbar } from 'notistack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import { useMediaQuery, createTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import Navabar from '../Common/Navabar';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';

const theme = createTheme();

function Inventory() {
  const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false)
  const [image, setImage] = useState(null);
  const [userEnterValue, setUserEnterValue] = useState({
    productName: '',
    productID: '',
    category: '',
    buyingPrice: '',
    quantity: '',
    unit: '',
    expiryDate: '',
    threshold: ''
  })
  const [storeProducts, setStoreProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const reversedArray = [...storeProducts].reverse()
  const uiStoreProducts = reversedArray.slice(firstIndex, lastIndex);
  const npage = Math.ceil(storeProducts.length / recordsPerPage);

  const overall = [{
    title: 'Categories',
    color: '#458EF2',
    count: '14',
    days: 'Last 7 days'
  },
  {
    title: 'Total Products',
    color: '#E19234',
    count: '868',
    days: 'Last 7 days',
    amount: '₹25000',
    lastTitle: 'Revenue'
  },
  {
    title: 'Top Selling',
    color: '#8965BF',
    count: '5',
    days: 'Last 7 days',
    amount: '₹25000',
    lastTitle: 'Cost'
  },
  {
    title: 'Low Stocks',
    color: '#F4726A',
    count: '12',
    days: 'Orders',
    amount: '2',
    lastTitle: 'Not in stock'
  }]

  const addProducts = [{
    title: 'Product Name',
    placeholder: 'Enter product name',
    value: userEnterValue.productName,
    onChangeFn: (e) => setUserEnterValue((pre) => ({
      ...pre,
      productName: e.target.value
    }))
  }, {
    title: 'Product ID',
    placeholder: 'Enter Product ID',
    value: userEnterValue.productID,
    onChangeFn: (e) => setUserEnterValue((pre) => ({
      ...pre,
      productID: e.target.value
    }))
  }, {
    title: 'Category',
    placeholder: 'Select product category',
    value: userEnterValue.category,
    onChangeFn: (e) => setUserEnterValue((pre) => ({
      ...pre,
      category: e.target.value
    }))
  }, {
    title: 'Buying Price',
    placeholder: 'Enter buying price',
    value: userEnterValue.buyingPrice,
    onChangeFn: (e) => setUserEnterValue((pre) => ({
      ...pre,
      buyingPrice: e.target.value
    }))
  }, {
    title: 'Quantity',
    placeholder: 'Enter product quantity',
    value: userEnterValue.quantity,
    onChangeFn: (e) => setUserEnterValue((pre) => ({
      ...pre,
      quantity: e.target.value
    }))
  }, {
    title: 'Unit',
    placeholder: 'Enter product unit',
    value: userEnterValue.unit,
    onChangeFn: (e) => setUserEnterValue((pre) => ({
      ...pre,
      unit: e.target.value
    }))
  }, {
    title: 'Expiry Date',
    placeholder: 'Enter expiry date',
    value: userEnterValue.expiryDate,
    onChangeFn: (e) => setUserEnterValue((pre) => ({
      ...pre,
      expiryDate: e
    }))
  }, {
    title: 'Threshold Value',
    placeholder: 'Enter threshold value',
    value: userEnterValue.threshold,
    onChangeFn: (e) => setUserEnterValue((pre) => ({
      ...pre,
      threshold: e.target.value
    }))
  }]

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('fileInput').click();
  };

  const addProductBtn = () => {
    const currentDate = dayjs();
    const format = 'DD/MM/YYYY';
    if (Object.values(userEnterValue).includes('')) {
      enqueueSnackbar('Please enter all fields', { variant: 'error', preventDuplicate: true });
    }
    else if (dayjs(userEnterValue.expiryDate, format).isBefore(dayjs(currentDate, format))) {
      enqueueSnackbar('Please enter a valid expiry date', { variant: 'error', preventDuplicate: true });
    }
    else {
      const currentDate = new Date()
      const storeNewProduct = {
        ...userEnterValue,
        availability: userEnterValue.quantity > userEnterValue.threshold ? 'In- stock' : userEnterValue.quantity === '0' ? 'Out of stock' : 'Low stock',
        uniqueID: currentDate
      }
      setStoreProducts([...storeProducts, storeNewProduct])
      setUserEnterValue({
        productName: '',
        productID: '',
        category: '',
        buyingPrice: '',
        quantity: '',
        unit: '',
        expiryDate: '',
        threshold: ''
      })
      setImage(null)
      setOpenAddProductDialog(false)
      enqueueSnackbar('Product Added', { variant: 'success', preventDuplicate: true });
    }
  }

  const filterDate = (val) => {
    const a = new Date(val);
    const final = `${a.getDate().toString()}/${(a.getMonth() + 1).toString()}/${a
      .getFullYear()
      .toString().slice(2)}`;

    return final;
  };

  const deleteFn = (getUniqueID) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredArray = storeProducts.filter(obj => obj.uniqueID !== getUniqueID);
        setStoreProducts(filteredArray)
        Swal.fire({
          title: "Deleted!",
          text: "1 product has been deleted.",
          icon: "success"
        });
      }
    });
  }

  const closeAddProductDialog = () => {
    setOpenAddProductDialog(false)
    setUserEnterValue({
      productName: '',
      productID: '',
      category: '',
      buyingPrice: '',
      quantity: '',
      unit: '',
      expiryDate: '',
      threshold: ''
    })
    setImage(null)
  }
  useEffect(() => {
    setStoreProducts([{
      productName: 'Coca cola',
      buyingPrice: '205',
      quantity: '41',
      unit: 'Packets',
      threshold: '10',
      expiryDate: '2022-11-11T16:30:00.000Z',
      availability: 'Low stock',
      uniqueID: '2024-02-11T12:54:37.373Z'
    }, {
      productName: 'Scotch Brite',
      buyingPrice: '359',
      quantity: '43',
      unit: 'Packets',
      threshold: '8',
      expiryDate: '2023-06-06T16:30:00.000Z',
      availability: 'In- stock',
      uniqueID: '2024-02-11T12:53:37.373Z'
    }, {
      productName: 'Ariel',
      buyingPrice: '408',
      quantity: '23',
      unit: 'Packets',
      threshold: '7',
      expiryDate: '2023-12-15T16:30:00.000Z',
      availability: 'Out of stock',
      uniqueID: '2024-02-11T12:52:37.373Z'
    }, {
      productName: 'Harpic',
      buyingPrice: '605',
      quantity: '10',
      unit: 'Packets',
      threshold: '5',
      expiryDate: '2023-01-09T16:30:00.000Z',
      availability: 'In- stock',
      uniqueID: '2024-02-11T12:51:37.373Z'
    }, {
      productName: 'Horlicks',
      buyingPrice: '530',
      quantity: '5',
      unit: 'Packets',
      threshold: '5',
      expiryDate: '2023-01-09T16:30:00.000Z',
      availability: 'In- stock',
      uniqueID: '2024-02-11T12:50:37.373Z'
    }, {
      productName: 'Bourn Vita',
      buyingPrice: '502',
      quantity: '14',
      unit: 'Packets',
      threshold: '6',
      expiryDate: '2022-12-08T16:30:00.000Z',
      availability: 'Out of stock',
      uniqueID: '2024-02-11T12:49:37.373Z'
    }, {
      productName: 'Red Bull',
      buyingPrice: '405',
      quantity: '36',
      unit: 'Packets',
      threshold: '9',
      expiryDate: '2022-12-05T16:30:00.000Z',
      availability: 'In- stock',
      uniqueID: '2024-02-11T12:48:37.373Z'
    }, {
      productName: 'Bru',
      buyingPrice: '257',
      quantity: '22',
      unit: 'Packets',
      threshold: '11',
      expiryDate: '2022-12-21T16:30:00.000Z',
      availability: 'Out of stock',
      uniqueID: '2024-02-11T12:47:37.373Z'
    }, {
      productName: 'Maggi',
      buyingPrice: '430',
      quantity: '43',
      unit: 'Packets',
      threshold: '12',
      expiryDate: '2022-12-11T16:30:00.000Z',
      availability: 'In- stock',
      uniqueID: '2024-02-11T12:46:37.373Z'
    },
    ])
  }, [])


  return (
    <>
      <Stack alignItems={'center'}>
        <Box elevation={0} sx={{ width: { xs: '95%', md: '100%' }, pt: 2 }}>
          <Navabar />
          <Box sx={{ mt: 1.5, bgcolor: '#E6E8EC', }}>
            <Box sx={{ ml: { md: '200px', lg: "250px" }, mr: { md: '15px', lg: '25px' }, pt: 1.5, pb: 2 }}>
              <Card sx={{ p: 2, borderRadius: '10px' }}>
                <Typography sx={{ fontSize: { xs: 17, md: 18, lg: 20 } }}>Overall Inventory</Typography>
                <Stack mt={1.5} direction={'row'} gap={2} flexWrap={{ xs: 'wrap', sm: 'nowrap' }} justifyContent={'space-between'}>
                  {overall.map((items, index) => (
                    <Stack key={index} gap={1}>
                      <Typography sx={{ color: items.color, fontSize: { sm: 14, md: 15, lg: 17 } }}>{items.title}</Typography>
                      <Stack direction={'row'} gap={{ md: 3, lg: 5 }}>
                        <Stack gap={1}>
                          <Typography sx={{ fontSize: { sm: 12, md: 13, lg: 15 } }}>{items.count}</Typography>
                          <Typography sx={{ fontSize: { sm: 12, md: 13, lg: 15 } }}>{items.days}</Typography>
                        </Stack>
                        <Stack gap={1}>
                          <Typography sx={{ fontSize: { sm: 12, md: 13, lg: 15 }, alignSelf: index === 3 ? 'flex-end' : 'initial' }}>{items.amount}</Typography>
                          <Typography sx={{ fontSize: { sm: 12, md: 13, lg: 15 }, alignSelf: index === 2 ? 'flex-end' : 'initial', ml: { xs: 1, sm: 0 } }}>{items.lastTitle}</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Card>

              <Card sx={{
                mt: 1.5,
                borderRadius: '10px'
              }}>
                <Stack direction={'row'} justifyContent={'space-between'} sx={{ p: 2 }} >
                  <Typography sx={{ fontSize: { xs: 17, md: 18, lg: 20 } }}>Products</Typography>
                  <Stack direction={'row'} gap={{ xs: 1, sm: 2 }}>
                    <Button variant='contained' size='small' onClick={() => setOpenAddProductDialog(true)} sx={{ textTransform: 'capitalize', bgcolor: '#1366D9', ':hover': { bgcolor: '#1366D9' } }}>{matchesSM ? <AddIcon /> : 'Add Product'}</Button>
                    <Button variant='outlined' size='small' startIcon={<FilterListOutlinedIcon sx={{ display: { xs: 'none', sm: 'initial' } }} />} sx={{ textTransform: 'capitalize', borderColor: '#DADBE0', color: '#5E6779', ':hover': { borderColor: '#DADBE0' } }}>{matchesSM ? <FilterListOutlinedIcon /> : 'Filters'}</Button>
                    <Button variant='outlined' size='small' sx={{ textTransform: 'capitalize', borderColor: '#DADBE0', color: '#5E6779', ':hover': { borderColor: '#DADBE0' } }}>{matchesSM ? <GetAppOutlinedIcon /> : 'Download all'}</Button>
                  </Stack>
                </Stack>
                <TableContainer>
                  <Table sx={{ minWidth: 650, }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Products</TableCell>
                        <TableCell>Buying Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Threshold Value</TableCell>
                        <TableCell>Expiry Date</TableCell>
                        <TableCell>Availability</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {uiStoreProducts.map((row, index) => (
                        <Tooltip title="Click to Delete Product">
                          <TableRow
                            key={index}
                            sx={{ cursor: 'pointer', ':hover': { bgcolor: '#F1F2F4' } }}
                            onClick={() => deleteFn(row.uniqueID)}
                          >
                            <TableCell component="th" scope="row">
                              {row.productName.charAt(0).toUpperCase() + row.productName.slice(1)}
                            </TableCell>
                            <TableCell>{`₹${row.buyingPrice}`}</TableCell>
                            <TableCell>{`${row.quantity} ${row.unit}`}</TableCell>
                            <TableCell>{`${row.threshold} ${row.unit}`}</TableCell>
                            <TableCell>{filterDate(row.expiryDate)}</TableCell>
                            <TableCell sx={{ color: row.availability === 'In- stock' ? '#3EB87F' : row.availability === 'Low stock' ? '#E7A75B' : '#E1655C' }}>{row.availability}</TableCell>
                          </TableRow>
                        </Tooltip>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack direction={'row'} justifyContent={'space-between'} sx={{ p: 2 }}>
                  <Button size='small' variant='outlined' onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)} sx={{ textTransform: 'capitalize', color: '#707680', borderColor: '#707680', ':hover': { borderColor: '#707680' } }}>Previous</Button>
                  <Typography sx={{ color: '#6F7580' }}>Page {currentPage} of {npage}</Typography>
                  <Button size='small' variant='outlined' onClick={() => currentPage !== npage && setCurrentPage(currentPage + 1)} sx={{ textTransform: 'capitalize', color: '#707680', borderColor: '#707680', ':hover': { borderColor: '#707680' } }}>Next</Button>
                </Stack>
              </Card>
            </Box>
          </Box>
        </Box>
      </Stack>


      <Dialog open={openAddProductDialog} PaperProps={{ sx: { p: 3, borderRadius: '10px' } }}>
        <Typography variant='h5'>New Product</Typography>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={3}
          justifyContent={'center'}
          mt={2}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {image ?
            <Avatar
              variant="square"
              alt="image"
              src={image}
              sx={{ width: 100, height: 100 }}
            /> :
            <CropFreeOutlinedIcon sx={{ fontSize: 100, color: '#99A0AD' }} />
          }

          <Stack alignItems={'center'}>
            <Typography sx={{ color: '#99A0AD' }}>Drag image here</Typography>
            <Typography sx={{ color: '#99A0AD' }}>or</Typography>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <Typography
              variant="body1"
              component="span"
              onClick={handleBrowseClick}
              sx={{ cursor: 'pointer', color: '#6CA5F4' }}
            >
              Browse image
            </Typography>
          </Stack>
        </Stack>
        {addProducts.map((items, index) => (
          <Stack direction={{ sm: 'row' }} alignItems={{ sm: 'center' }} key={index} mt={2}>
            <Typography sx={{ width: 150 }}>{items.title}</Typography>
            {index !== 6 ?
              <TextField
                size='small'
                type={index === 0 || index === 1 || index === 2 || index === 5 ? 'text' : 'number'}
                onInput={
                  index === 0 || index === 1 || index === 2 || index === 5
                    ?
                    (e) => e.target.value
                    :
                    (e) => (e.target.value = e.target.value.slice(0, 10))
                }
                placeholder={items.placeholder}
                value={items.value}
                onChange={items.onChangeFn}
                sx={{
                  width: '235px',
                  "& .MuiOutlinedInput-input": {
                    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                    },
                  },
                }} />
              :
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format='DD/MM/YYYY'
                  value={dayjs(items.value)}
                  onChange={items.onChangeFn}
                  disablePast
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: false,
                      sx: { width: '235px' }
                    },
                  }}
                />
              </LocalizationProvider>
            }
          </Stack>
        ))}
        <Stack direction={'row'} gap={3} alignItems={'center'} justifyContent={'flex-end'} mt={3}>
          <Button variant='outlined' onClick={closeAddProductDialog}
            sx={{ textTransform: 'capitalize', color: '#A6ACB8', borderColor: '#A6ACB8', ':hover': { borderColor: '#A6ACB8' } }}>Discard</Button>
          <Button variant='contained' onClick={addProductBtn} sx={{ textTransform: 'capitalize', bgcolor: '#1366D9', ':hover': { bgcolor: '#1366D9' } }}>Add Product</Button>
        </Stack>
      </Dialog >

    </>
  );
}

export default Inventory;
