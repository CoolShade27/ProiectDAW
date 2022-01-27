import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';

interface IProps {
    product: IProduct
    setEditMode: (editMode: boolean) => void;
    setSelectedProduct: (product: IProduct | null) => void;
}

export const ProductDetails: React.FC<IProps> = ({
    product,
    setEditMode,
    setSelectedProduct
}) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta>
                    <span>{product.price} RON</span>
                </Card.Meta>
                <Card.Description>
                    {product.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button 
                    onClick={() => setEditMode(true)} 
                    basic 
                    color='blue' 
                    content='Editeaza' 
                    />
                    <Button 
                    onClick={() => setSelectedProduct(null)}
                    basic 
                    color='red' 
                    content='Inapoi' />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
