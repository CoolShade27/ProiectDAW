import React, { FormEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  product: IProduct;
  createProduct: (product: IProduct) => void;
  editProduct: (product: IProduct) => void;
}

export const ProductForm: React.FC<IProps> = ({
  setEditMode,
  product: initialForm,
  createProduct,
  editProduct
}) => {

  const initForm = () => {
    if (initialForm) {
      return initialForm;
    } else {
      return {
        id: '',
        name: '',
        price: '',
        description: '',
        category: ''
      };
    }
  };

  const [product, setProduct] = useState<IProduct>(initForm);

  const handleSubmit = () => {
    if (product.id.length === 0) {
      let newProduct = {
        ...product,
        id: uuid()
      }
      createProduct(newProduct);
    } else {
      editProduct(product);
    }
  }

  const handleInput = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.currentTarget;
    setProduct({...product, [name]: value});
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input 
        onChange={handleInput}
        name='name'
        placeholder='Nume' 
        value={product.name}
        />
        <Form.Input 
        onChange={handleInput}
        name='price'
        placeholder='Pret' 
        value={product.price}
        />
        <Form.TextArea 
        onChange={handleInput}
        name='description'
        rows={3} 
        placeholder='Descriere' 
        value={product.description}
        />
        <Form.Input 
        onChange={handleInput}
        name='category'
        placeholder='Categorie' 
        value={product.category}/>
        <Button
          floated='right'
          positive
          type='submit'
          content='Adauga'
        />
        <Button
          onClick={() => setEditMode(false)}
          floated='right'
          type='button'
          content='Anulare'
        />
      </Form>
    </Segment>
  );
};
