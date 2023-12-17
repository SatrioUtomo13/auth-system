import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

const ProductList = () => {
const [products, setProduct] = useState([]);

useEffect(() => {
    getProducts();
}, [])

const getProducts = async() => {
    const response = await axios.get('http://localhost:5000/products');
    setProduct(response.data);
}

const deleteUser = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/products/${id}`)
        getProducts();
    } catch (error) {
        console.log(error)
    }
}
  return (
    <div className='columns mt-5 is-centered'>
        <div className="column is-half">
            <Link to={`/add`} className='button is-success mr-3'>Add Product</Link>
            <Link to={`/dashboard`} className='button is-info'>Back to Dashboard</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>NAME</th>
                        <th>MODEL</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.model}</td>
                            <td>{product.status}</td>
                            <td className='is-flex'>
                                <Link to={`/edit/${product.id}`} className='button is-small is-info mr-3'>Edit</Link>
                                <button onClick={() => deleteUser(product.id)} className='button is-small is-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductList
