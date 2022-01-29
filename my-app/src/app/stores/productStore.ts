import {observable} from 'mobx';
import { createContext } from 'react';

class ProductStore {
    @observable title = 'title'
}

export default createContext(new ProductStore())