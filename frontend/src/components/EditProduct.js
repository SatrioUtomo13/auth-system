import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditProduct = () => {
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [status, setStatus] = useState('Tersedia');
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getProductById();
    },[]);

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/products/${id}`, {
                name,
                model,
                status
            })
            navigate('/products')
        } catch (error) {
            console.log(error);
        }
    }

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setModel(response.data.model);
        setStatus(response.data.status);
    }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateProduct}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        placeholder='Product Name...'
                        value={name}
                        onChange={(e) => setName(e.target.value) }
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Model</label>
                    <div className="control">
                        <input 
                        type="text"
                        className="input" 
                        placeholder='Product Model...'
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Status</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                        <select value={status} onChange={(e) => setStatus(e.target.value) }>
                                <option value="Tersedia">Tersedia</option>
                                <option value="Kosong">Kosong</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <button type="submit" className='button is-success mr-3'>Update</button>
                    <Link to={'/products'} className='button is-info'>Back</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditProduct
