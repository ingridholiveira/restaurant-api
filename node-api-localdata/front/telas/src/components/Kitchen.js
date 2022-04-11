import React, { Component, useState } from 'react';
import $ from 'jquery';

class Kitchen extends Component {
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
      url: 'http://localhost:3001/orders/send',
      method: 'GET',
      success: function(response) {
        context.setState({
          orders:response
        });
      }
    });
  
  }

  classItem(index){
    return index % 2 == 0 ? 'row bg-info' : 'row bg-light' ;
  }

  updateOrder(event){
  //Função pra adicionar ao carrinho
    const updateOrder = {"order-number": event.target.id ,
      "status": "ready"      
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
       {this.state.orders.length && this.state.orders.map((order, index) => (        
         
            <section>
              <div class="container">
                <div class="row bg-primary text-light py-3">
                  <div class="col h1">
                    Pedido nº {order["order-number"]}
                  </div>
                  <div class="col h1">
                    <span id="">Cliente: {order["client-name"]}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col h2">
                    <div>Produto</div>
                  </div>
                  <div class="col h2">
                    <div>Quantidade</div>
                  </div>
                </div>
                {order["order-items"].map((product, index) => (      
                   
                        <div className={this.classItem(index)}>
                          <div class="col h2">
                            <div>{product.name}</div>
                          </div>
                          <div class="col h2">
                            <div>{product.qty}</div>
                          </div>
                        </div>)
                  )
                }
              
              </div>
              <div class="container">
                <div class="row py-3">
                  <div class="col d-grid gap-2">
                    <button type="button" id={order["order-number"]} class="btn btn-outline-success btn-lg" onClick={this.updateOrder.bind(this)}>Pronto</button>
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

export default Kitchen;