import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [status, setStatus] = useState('Tersedia');
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/products', {
                name,
                model,
                status
            })
            navigate('/products')
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveProduct}>
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
                    <button type="submit" className='button is-success'>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddProduct
