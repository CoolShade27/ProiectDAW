import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { Grid } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';
import { ProductDetails } from '../details/ProductDetails';
import { ProductForm } from '../form/ProductForm';
import {ProductList} from './ProductList';

interface IProps {
    products: IProduct[];
    selectProduct: (id: string) => void;
    selectedProduct: IProduct | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedProduct: (product: IProduct | null) => void;
    createProduct: (product: IProduct) => void;
    editProduct: (product: IProduct) => void;
    deleteProduct: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

export const ProductDashboard: React.FC<IProps> = ({
    products,
    selectProduct,
    selectedProduct,
    editMode,
    setEditMode,
    setSelectedProduct,
    createProduct,
    editProduct,
    deleteProduct,
    submitting, 
    target
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ProductList
                    products={products}
                    selectProduct={selectProduct}
                    deleteProduct={deleteProduct}
                    submitting={submitting}
                    target={target}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedProduct && !editMode &&
                    <ProductDetails
                        product={selectedProduct}
                        setEditMode={setEditMode}
                        setSelectedProduct={setSelectedProduct}
                    />
                }
                {editMode &&
                    <ProductForm 
                    key={selectedProduct && selectedProduct.id || 0}
                    setEditMode={setEditMode} 
                    product={selectedProduct!}
                    createProduct={createProduct}
                    editProduct={editProduct}
                    submitting={submitting}
                    />}
            </Grid.Column>
        </Grid>
    );
};
