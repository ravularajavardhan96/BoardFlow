import react from 'react';
import CopyURL from '../utils/CopyUrl';
import SimplePaper from '../utils/SimplePaper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { makeid } from '../utils/Create';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useParams } from 'react-router-dom';

export default function Boards() {
    let navigate = useNavigate();
    const API = 'https://boardflow-xlhx.onrender.com/boards';
    const [boards, setBoards] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(API);
                console.log("This si wokring");
                console.log(resp.data.boards);
                setBoards([...resp.data.boards]);
            }
            catch (e) {
                console.log(e);
            }

        }
        fetchData();
    }, []);

    const handleInput = (e) => {
        // console.log(e);
        setTitle(e.target.value);
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        // const id = makeid();
        try {
            console.log("hello");

            const resp = await axios.post(`${API}/board`, {  title });
            
            console.log(resp);

            navigate(`/board/${resp.data.id}`);
            console.log("Board is created");
        } catch (e) {
            console.log(e);
        }



    }


    return (
        <div>
            <ul>
                {boards.map((board) => (<div key={board.title}>
                    <li>{board.title}</li>        <Link to={`/board/${board._id}`}>View <ArrowRightAltIcon/></Link>
                </div>
                ))}
            </ul>

            <form>
                <h2>Create a board</h2>

                <input type="text" value={title} onChange={(e) => handleInput(e)} placeholder='title' />

                <button onClick={(e) => handlesubmit(e)} type='submit'>submit</button>
            </form>


        </div>
    )
}