import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from 'react';
import DataService from '../services/service'
import dayjs from 'dayjs';

const CreateUser = () => {
  const [divison_id, setDivisonID] = useState('');
  const [gender, setGender] = useState('');
  // const[role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [datejoin, setDateJoin] = useState(dayjs());
  const status = 1;
  const roles = [3, 4];
  const password = '12345678';

  const createListUser = () => {
    var data = {
      divison_id: divison_id,
      gender: gender,
      email: email,
      join_date: datejoin,
      name: name,
      status: status,
      roles: roles,
      password: password
    }



    DataService.create(data)
      .then(response => {
        this.setState({
          divison_id: response.data.divison_id,
          gender: response.data.gender,
          email: response.data.email,
          join_date: response.data.datejoin,
          name: response.data.name,
          roles: roles,
          status: status,
          password: password
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleAdd = e => {
    e.preventDefault();
    createListUser();
  };
  return (
    <>
      <h2>Create User</h2>
      <form onSubmit={handleAdd}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField id="standard-basic" label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="standard" fullWidth />
              <TextField id="standard-basic" type='email' label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" fullWidth />
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Division</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={divison_id}
                  label="Division"
                  onChange={(e) => setDivisonID(e.target.value)}
                >
                  <MenuItem value='1'>Division 1</MenuItem>
                  <MenuItem value='2'>Division 2</MenuItem>
                  <MenuItem value='3'>Division 3</MenuItem>
                </Select>
              </FormControl>
              <FormLabel sx={{ display: 'flex', fontStyle: 'bold' }}>Gender</FormLabel>
              <RadioGroup
                name="controlled-radio-buttons-group"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel value="1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }} control={<Radio />} label="Female" />
                <FormControlLabel value="2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }} control={<Radio />} label="Male" />
              </RadioGroup>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} fullWidth>
                  <DatePicker label="Date Join" value={datejoin} onChange={(newValue) => setDateJoin(newValue)} sx={{ width: '100%' }} />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button variant="contained" type='submit' sx={{ m: 4 }}>Save</Button>
        </Box>
      </form>
    </>

  )
};

export default CreateUser