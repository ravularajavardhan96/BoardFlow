import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './HomePage.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { makeid } from "../utils/Create.js";
import Boards from "./Boards.jsx";
import { Link, useNavigate } from "react-router-dom";







export default function HomePage() {
       let navigate = useNavigate();
    const handleclick = async () =>{
        const id = makeid();
     

        navigate(`/boards`);

        
      
    }

    return (
        <div id="parent">

            <div className="outer">
                <img src="/image.png" alt="collab" />
              
            </div>
           
              <div className="inner"><Button variant="contained" onClick={handleclick}>Create Board    <ArrowRightAltIcon/></Button></div>
          {/* {uuid} */}
        </div>

    )
}