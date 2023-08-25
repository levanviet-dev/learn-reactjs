import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState, useEffect } from 'react';
import DataService from '../services/service';
import { withRouter } from '../common/router';
import dayjs from 'dayjs';

const EditUser = (props) => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    division_id: '',
    gender: '',
    join_date: '',
  });

  useEffect(() => {
    getUser(props.router.params.id);
  }, [props.router.params.id]);

  function getUser(id) {
    DataService.get(id)
      .then(response => {
        const user = response.data.data;
        console.log(user);
        setUserData(user);
      })
      .catch(e => {
        console.error(e);
      });
  }

  // const handleEdit = async (data) => {
  //   try {
  //     await DataService.update(props.router.params.id, data);
  //     console.log("User updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };
  const handleChange = (name, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleChangeDiv = (value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      division_id: value,
    }));
  };

  const handleChangeGender = (value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      gender: value,
    }));
  };

  const handleDateJoin = (value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      join_date: dayjs(value).format("YYYY-MM-DD"),
    }));
  };
  console.log({ userData });

  const updateTutorial = () => {
    DataService.update(props.router.params.id, {
      ...userData, roles: [2]
    }
    )
      .then(response => {
        console.log(response.data);
        props.router.navigate('/');
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div>
      <h2>Update User</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='name'
              id="standard-basic"
              label="Name"
              variant="standard"
              fullWidth
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <TextField
              name="email"
              id="standard-basic"
              label="Email"
              variant="standard"
              fullWidth
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}

            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Division</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Division"
                value={userData.division_id}
                onChange={(e) => { handleChangeDiv(e.target.value) }}

              >
                <MenuItem value="1">Division 1</MenuItem>
                <MenuItem value="2">Division 2</MenuItem>
                <MenuItem value="3">Division 3</MenuItem>
              </Select>
            </FormControl>
            <FormLabel sx={{ display: 'flex', fontStyle: 'bold' }}>Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={userData.gender}
              onChange={(e) => handleChangeGender(e.target.value)}

            >
              <FormControlLabel value="1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }} control={<Radio />} label="Female" />
              <FormControlLabel value="2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }} control={<Radio />} label="Male" />
            </RadioGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} fullWidth>
                <DatePicker
                  label="Date Join"
                  value={dayjs(userData.join_date)}
                  sx={{ width: '100%' }}
                  onChange={(e) => handleDateJoin(e)}

                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button variant="contained" type='submit' sx={{ m: 4 }} onClick={updateTutorial}>Save</Button>
      </Box>
    </div>

  );
};

export default withRouter(EditUser);
