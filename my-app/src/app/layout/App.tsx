import React, { Component } from 'react';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        this.setState({
          products: response.data
        })
      })
  }

  render() {
    return (
      <div>
        <Header as='h2' icon>
          <Icon name='users' />
          Proiect DAW
          <Header.Subheader>
            Message
          </Header.Subheader>
        </Header>
        <List>
          {this.state.products.map((product: any) => (
            <List.Item key={product.id}>{product.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }

}

export default App;
