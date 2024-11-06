import { TextField, Button, Stack, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { EmployeeData, EmployeeType } from "./EmployeeDataType";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import  
 {LocalizationProvider, DatePicker, AdapterFormats} from '@mui/x-date-pickers';


const EditForm = ({ formData, onUpdate, reset }: any) => {
    const form = useForm<EmployeeData>({
        defaultValues: formData,
    })

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const onSubmit = (data: EmployeeData) => {
        onUpdate(data);
    };

    return (<div>
        <h2> Edit employee</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

            <TextField className='text-field'
                label='Id' disabled
                {...register("id",
                    { required: "Errormessage" }
                )}
                inputMode="numeric"
                error={!!errors.id}
                helperText={errors.id?.message} />

            <TextField className='text-field' 
            label='Name'
                type="text"
                {...register("name",
                    { required: "Required name" })}
                error={!!errors.name}
                helperText={errors.name?.message} />

            <TextField className='text-field' 
            label='Email'
                inputMode="email"
                {...register("emailId",
                    {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                error={!!errors.emailId}
                helperText={errors.emailId ? "Invalid email address" : ""} />

            <TextField className='text-field' 
            label='Aadhar number' 
            pattern="^[0-9]*$" 
            {...register("aadharNumber",
                { required: true, pattern: new RegExp("^[0-9]*$"), minLength: 10, maxLength: 10 })}
                error={!!errors.aadharNumber}
                helperText={errors.aadharNumber ? "Invalid aadhar number" : ""} />

            <TextField className='text-field' 
            label='PAN number'  
            {...register("panNumber",
                {
                    required: true,
                    pattern: {
                        value: /^[A-Z0-9]{10}$/,
                        message: ""
                    }
                    ,
                    minLength: 10, maxLength: 10
                })}
                error={!!errors.panNumber}
                helperText={errors.panNumber ? "Invalid PAN number" : ""} />

            <TextField className='text-field' 
            label='Employee type'
                select
                defaultValue={formData.employeeType}
                {...register("employeeType",
                )}
                error={!!errors.employeeType}
                helperText={errors.employeeType?.message} >
                {EmployeeType.map((option) => (
                    <MenuItem value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            
      {/* <TextField
      type="date"
        label="Select Date"
        // defaultValue={register("joiningDate")}
        // onChange={(newValue: any) => {
        //   formData.joiningDate = newValue;
        // }}
        
      /> */}
            <TextField className='text-field' 
            type="date"
            defaultValue={register("joiningDate")}
            label='Joining date'  
            {...register("joiningDate",
                {
                    required: true,
                    
                })}
                error={!!errors.joiningDate}
                helperText={errors.joiningDate ? "Invalid date format" : "Please use DD-MM-YYYY"} />

            <div className="btn-section">

                <Button className="btn" onClick={reset} variant="contained" color="error">Cancel</Button>
                
                <Button className="btn" type="submit" variant="contained" color="primary">Save</Button>

            </div>

        </form>
    </div>
    )
};

export default EditForm;