import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { IProduct } from '../models/product';
import { Navbar } from '../../features/nav/Navbar';
import './styles.css';
import { ProductDashboard } from '../../features/products/dashboard/ProductDashboard';
import agent from '../api/agent';
import { Loading } from './Loading';
import ProductStore from '../stores/productStore';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { AdaugareProdus } from './pages/AdaugareProdus';
import { Produse } from './pages/Produse';
import { Route, Routes, BrowserRouter } from 'react-router-dom';


const App = () => {
  const productStore = useContext(ProductStore);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectProduct = (id: string) => {
    setSelectedProduct(products.filter(a => a.id === id)[0])
    setEditMode(false);
  }

  const handleCreateForm = () => {
    setSelectedProduct(null);
    setEditMode(true);
  }

  const handleCreateProduct = (product: IProduct) => {
    setSubmitting(true);
    agent.Products.create(product).then(() => {
      setProducts([...products, product]);
      setSelectedProduct(product);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  }

  const handleEditProduct = (product: IProduct) => {
    setSubmitting(true);
    agent.Products.update(product).then(() => {
      setProducts([...products.filter(a => a.id !== product.id), product]);
      setSelectedProduct(product);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  }

  const handleDeleteProduct = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Products.delete(id).then(() => {
      setProducts([...products.filter(a => a.id !== id)])
    }).then(() => setSubmitting(false))
  }

  useEffect(() => {
    agent.Products.list()
      .then(response => {
        let products: IProduct[] = [];
        response.forEach((product) => {
          products.push(product);
        });
        setProducts(products);
      }).then(() => setLoading(false));
  }, []);

  /**if (loading) return <Loading content='Loading products...'/>**/

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
          submitting={submitting}
          target={target}
        />
      </Container>

      {/*
      <Routes>
        <Route path="/home">
          <Fragment>
            <Home />
          </Fragment>
        </Route>
        <Route path="/contact">
          <Fragment>
            <Contact />
          </Fragment>
        </Route>
        <Route path="/produse">
          <Fragment>
            <Produse />
          </Fragment>
        </Route>
        <Route path="/adaugare_produs">
          <Fragment>
            <AdaugareProdus />
          </Fragment>
        </Route>
      </Routes> 
      */}
    </Fragment>
  );
}

export default App;