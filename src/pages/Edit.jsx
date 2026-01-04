import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseur1 } from '../api';
export default function Edit() {
  // const params = useParams();
  // console.log(params.id)
  const {id} =useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    category: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const fetchSingleExpense=async()=>{
    try {
      const res=await axios.get(`${baseur1}/api/expense/view/${id}`)
      // console.log(res.data)
      if (res.data.success) {
        setFormData(res.data.expenseDetails)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(()=>{
    fetchSingleExpense();

  },[])
  // console.log(formData)
  const handleSubmit = async () => {
    setIsLoading(true);
    // console.log(formData);
    try {
      const res = await axios.put(`${baseur1}/api/expense/edit/${id}`, formData);
      //  console.log(res)
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(()=>{
          navigate("/")
        },2000);

      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setTimeout(()=>{
        setIsLoading(false);
      },2000)

    }

  };
  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">Add Expense Details</Typography>
      </Box>
      <Box sx={{ backgroundColor: "#c1bcbc", p: 4, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ width: "70%", p: 3 }}>
          <TextField value={formData.title} fullWidth onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter Expense Title here" label="Enter expense title" sx={{ mb: 2 }} />
          <TextField value={formData.amount} fullWidth type="number" onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="Enter Expense amount here" label="Enter expense amount" sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Expense category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Select Expense Category"
              // onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value={"transport"}>Transport</MenuItem>
              <MenuItem value={"Food items"}>Food Items</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} sx={{ mb: 1 }} variant="contained" fullWidth loading={isLoading}>Submit</Button>
          <Button component={Link} to="/" sx={{ mb: 1 }} variant="contained" color='secondary' fullWidth>View Entries</Button>
        </Paper>
      </Box>
    </Box>
  )
}
