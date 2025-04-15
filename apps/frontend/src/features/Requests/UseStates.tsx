import {useEffect, useState} from "react";
import axios from "axios";

export function getDepartments() {
    const [departmentOptions, setDepartmentOptions] = useState([]);

    useEffect(() => {
        async function retrieveDepartments(){
            try{
                const response = await axios.get("/api/enum/departments/");
                console.log("response from /api/enum/departments get", response.data)
                const departments = response.data.map((department:string) => <option key={department} value={department}>{department}</option>);
                console.log(departments);
                setDepartmentOptions(departments);
            }
            catch(error){
                console.log(error);
            }
        }
        console.log("f");
        retrieveDepartments();
    }, []);

    return departmentOptions;
}

