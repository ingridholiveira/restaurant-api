import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';

class Delivery extends Component {
  constructor(props){
    super(props);
    this.state = {
      orders: []
    }
  }

componentDidMount() {
  
  setInterval(
    () => this.fetch(),
    3000
);
  
  }

  fetch() {
    var context = this;

    $.ajax({
      url: 'http://localhost:3001/orders/ready',
      method: 'GET',
      success: function(response) {
        context.setState({
          orders:response
        });
      }
    });
  
  }



  updateOrder(event){
  //Função pra adicionar ao carrinho
    const updateOrder = {"order-number": event.target.id ,
      "status": "closed"      
    }

    var context = this;
    $.ajax({
      url: 'http://localhost:3001/orders/update',
      data: updateOrder,
      method: 'POST',
      dataType:'json',
      
      success: function(response) {
        context.fetch();
      }
    });
    context.fetch();
  };

  render() {
    return (
      <div>
      {this.state.orders.map((order, index) => (      
        <section>
          <div class="container">
            <div class="row py-3">
              <div class="col h1">
                Pedido nº {order["order-number"]}
              </div>
              <div class="col h1">
                <span id="">Cliente: {order["client-name"]}</span>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row py-3">
              <div class="col d-grid gap-2">
                <button type="button" id={order["order-number"]} class="btn btn-outline-success btn-lg" onClick={this.updateOrder.bind(this)}>Entregue</button>
              </div>
            </div>
          </div>
        </section>)
      )
      }


      </div>
    );
  }
}

export default Delivery;