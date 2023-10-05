import { useState, useEffect } from "react";
import './ShoppingApp.css'; 
import {Link } from "react-router-dom";
const cartItems=[]
export default function ShoppingApp() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:4000/getartworks")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);
    

    return (
        <div>
        <ShopArtWorks categories={categories} />
        </div>
    );
}

export function ShopArtWorks({ categories }) {
    const [results, setResults] = useState([]);
    function handleAddtoCart(items){
        alert(`Item Added to Cart ${items._id}`);
        cartItems.push(items);
        console.log(cartItems)
    }

    useEffect(() => {
        async function fetchData() {
            const fetchedData = [];

            for (const item of categories) {
                
                 try {
                     const response = await fetch(item.url);
                     if (response.ok) {
                         const json = await response.json();
                         fetchedData.push({
                             _id: item.object,
                             data: json,
                         });
                     } else {
                         console.error(`Failed to fetch data for ${item.url}`);
                     }
                 } catch (error) {
                     console.error(`Error while fetching data for ${item.url}: ${error}`);
                 }
            }

            setResults(fetchedData);
        }

        fetchData();
    }, [categories]);

    return (
        <div className="App">
            <header className="bg-danger text-white text-center p-2">
                <h1><span className="bi bi-cart"></span>Shopping for art works</h1>
                <Link to="cart">Cart</Link>
            </header>
            <main className="card-container">
                {results.map(item => (
                    <div key={item._id} className="card" >
                        <img src={item.data.primaryImage} alt="" className="card-img-top" />
                        <div className="card-body">
                            <p className="card-text">{item.data.department}</p>
                            <p className="card-text">Price: {item.data.accessionYear}</p>
                            <button id={item._id} onClick={() => handleAddtoCart(item)} className="btn btn-danger">
                                <span className="bi bi-cart4"></span> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}


export function AddedCartItems(){
    return(
        <div>
             <button className="btn btn-danger w-100">
                            <span className="bi bi-cart3"></span>  Your Cart Items 
                            <button className="btn btn-danger">
                                <span className="bi bi-trash"></span>
                            </button>
                        </button>
                <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map(item=>
                                        <tr key={item._id}>
                                        <td>{item.data.department}</td>
                                        <td>{item.data.accessionYear}</td>
                                        <td>
                                            <img alt="" src={item.data.primaryImage} width="50" height="50" />
                                        </td>
                                        <td>
                                            <button className="btn btn-danger">
                                                <span className="bi bi-trash"></span>
                                            </button>
                                        </td>
                                        </tr>
                                        
                                    )
                                }
                            </tbody>
                        </table>
        </div>
    )
}

