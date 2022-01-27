import React from 'react';
import { Item, Button, Segment, Label } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';

interface IProps {
    products: IProduct[];
    selectProduct: (id: string) => void;
    deleteProduct: (id: string) => void;
}

export const ProductList: React.FC<IProps> = ({
    products,
    selectProduct,
    deleteProduct
}) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {products.map(product =>
                    <Item key={product.id}>
                        <Item.Image src={`/assets/${product.category}.jpg`} wrapped={false} />

                        <Item.Content>
                            <Item.Header as='a'>{product.name}</Item.Header>
                            <Item.Meta>{product.price} RON</Item.Meta>
                            <Item.Description>
                                <div>{product.description}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectProduct(product.id)}
                                    floated='right'
                                    content='Detalii'
                                    color='blue'
                                />
                                <Button onClick={() => deleteProduct(product.id)}
                                    floated='right'
                                    content='Sterge'
                                    color='red'
                                />
                                <Label basic content={product.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}
            </Item.Group>
        </Segment>
    );
};