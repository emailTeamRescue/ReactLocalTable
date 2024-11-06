import React, { useEffect, useState } from 'react';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditForm from './components/EditForm';
import { EmployeeData } from './components/EmployeeDataType';
import { Backdrop, Box, Fade, Modal } from '@mui/material';

function App() {

  const [employees, setEmployees] = useState<any>(null);
  const [cols, setCols] = useState<string[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [employeeForm, setEmployeeForm] = useState<EmployeeData>();

  const filePath = './employee_data.json';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const fetchJson = () => {
    fetch(filePath)
      .then(response => {
        return response.json();
      }).then(data => {
        setEmployees(data.data);
        setCols(Object.keys(data.data[0]));
      }).catch((e: Error) => {
        console.log(e.message);
      });
  }
  useEffect(() => {
    fetchJson();
  }, [])

  function createFormGroup(id: any) {
    const row = employees.find((i: any) => i.id == id);
    return setEmployeeForm({
      id: row.id,
      name: row.name,
      emailId: row.emailId,
      aadharNumber: row.aadharNumber,
      panNumber: row.panNumber,
      employeeType: row.employeeType,
      joiningDate: formattedDate(row.joiningDate, false)
    });
  };

  function Edit(id: any) {
    createFormGroup(id);
    setFormVisible(true);
  }

  const updateEmployee = (data: EmployeeData) => {
    data.joiningDate = formattedDate(data.joiningDate, false);
    setEmployees(employees.map((emp: EmployeeData) => (emp.id === data.id ? data : emp)));
    setFormVisible(false);
    setOpen(false);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id: number) => {
    createFormGroup(id);
    setOpen(true)
  };

  const handleClose = () => setOpen(false);

  const close = () => {
    setOpen(false);
    setFormVisible(false);
  }

  const formattedDate = (dateString: any, toShow: boolean) => {
    const [day, month, year] = dateString.split('-');
    if (toShow) {
      return `${day}-${month}-${year}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  }

  return (
    <div className="App App-header">
      <h2>Employee table</h2>
      {!employees ? (<h4>No employees found.</h4>) :

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {cols.map(col =>
                  <TableCell key={col} >
                    {col.toLocaleUpperCase()}
                  </TableCell>
                )}
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {cols.map(col =>
                    <TableCell component="th" scope="row">
                      {row[col]}
                    </TableCell>
                  )}
                  <TableCell>
                    <Button variant="contained" size="small" onClick={() => Edit(row.id)}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small"  onClick={() => handleOpen(row.id)}>
                      Edit in modal
                    </Button>

                    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box  sx={style}>
        <div className='modal-area'>
          <EditForm formData={employeeForm} onUpdate={updateEmployee} reset={close} />
        </div>
        </Box>
        </Fade>
      </Modal>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      }


      {(isFormVisible && employeeForm) ? (
        <div className='form-area'>
          <EditForm formData={employeeForm} onUpdate={updateEmployee} reset={close} />
        </div>
      ) : ''}
    </div>
  );
}

export default App;
