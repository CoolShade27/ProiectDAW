<<<<<<< HEAD
import { action, observable } from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';
import { IProduct } from '../models/product';

class ProductStore {
    @observable products: IProduct[] = [];

    @action loadProducts = () => {
        agent.Products.list()
            .then(products => {
                products.forEach((product) => {
                    this.products.push(product)
                });
            });
    }
}

export default createContext(new ProductStore());
=======
import {observable} from 'mobx';
import { createContext } from 'react';

class ProductStore {
    @observable title = 'title'
}

export default createContext(new ProductStore())
>>>>>>> 187b0294781f7e48eaa06136ec4245d1e044af50
