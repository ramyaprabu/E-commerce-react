import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { base_url } from '../../../constants';

class BottomHeader extends Component{

    state = {
        categories: [],
        categoriesAr : []
    }

    componentDidMount() {
        fetch(`${base_url}/category`, {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            this.setState({
                  categories: jsonResponse.message
            })
        });
    }
    categoryTree(categories){
        var categoriesAr = [];
        for(var value of categories){
            console.log(value.slug)

            categoriesAr.push(
                    <li key={value.slug} className="Column">
                        <NavLink to={`/products/${value.slug}`}>{value.name}</NavLink>
                    </li>
            );
        }

        return categoriesAr;
    }

    render() {

        const cat = this.categoryTree(this.state.categories);

        return (
            <div className="BottomHeader">

                <ul className="Menu">
                    <li className="MenuItem">
                        <Link to="/products/all">Shop</Link>
                    </li>
                    <li className="MenuItem"><Link to="/categories">Categories</Link></li>
                </ul>
    
            </div>
        );
    }
}

export default BottomHeader;