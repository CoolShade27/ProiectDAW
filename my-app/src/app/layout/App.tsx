import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { IProduct } from '../models/product';
import { Navbar } from '../../features/nav/Navbar';
import 'primereact/resources/primereact.min.css';
import './styles.css';
import { ProductDashboard } from '../../features/products/dashboard/ProductDashboard';


const App = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectProduct = (id: string) => {
    setSelectedProduct(products.filter(a => a.id === id)[0])
    setEditMode(false);
  }

  const handleCreateForm = () => {
    setSelectedProduct(null);
    setEditMode(true);
  }

  const handleCreateProduct = (product: IProduct) => {
    setProducts([...products, product]);
    setSelectedProduct(product);
    setEditMode(false);
  }

  const handleEditProduct = (product: IProduct) => {
    setProducts([...products.filter(a => a.id !== product.id), product]);
    setSelectedProduct(product);
    setEditMode(false);
  }

  const handleDeleteProduct = (id: string) => {
    setProducts([...products.filter(a => a.id !== id)])
  }

  useEffect(() => {
    axios.get<IProduct[]>('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data)
      });
  }, []);

  return (
    <Fragment>
      <Navbar createForm={handleCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ProductDashboard
          products={products}
          selectProduct={handleSelectProduct}
          selectedProduct={selectedProduct}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedProduct={setSelectedProduct}
          createProduct={handleCreateProduct}
          editProduct={handleEditProduct}
          deleteProduct={handleDeleteProduct}
        />
      </Container>
    </Fragment>
  );
}

export default App;
