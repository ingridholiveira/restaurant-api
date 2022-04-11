import React, { Component, useState, useEffect } from 'react';
import $ from 'jquery';


class Orders extends Component {

constructor(props){
  super(props);
    this.state = {
    totalValue: 0,
    receivedValue: 50,
    changeValue: 0,
    clientName: '',
    orderNumber: '',
    textSearch: '',
    qtyProduct: '',
    cart: [],
    resultproduct:null
  }


  this.addCart = this.addCart.bind(this);
  this.searchProduct = this.searchProduct.bind(this);
  //this.exchange = this.exchange.bind(this);
}


addCart(event){
  //Função pra adicionar ao carrinho
  const valueItem =  parseFloat(this.state.resultproduct.price).toFixed(2);
  const product = {
    name:this.state.resultproduct.name,
    code:this.state.resultproduct.code,
    qty:this.state.qtyProduct,
    value:valueItem
  }
  var newCart = this.state.cart;
  newCart.push(product);
  this.setState({cart:newCart,resultproduct:null, qtyProduct:'',textSearch:'' });
  this.updateTotal();  

};

addCartFavorites(event){
  //Função pra adicionar ao carrinho
  console.log(event.target);

   const product = {
    name:event.target.id,
    code: event.target.dataset.code,
    qty:1,
    value: event.target.dataset.value
  }
  var newCart = this.state.cart;
  newCart.push(product);
  this.setState({cart:newCart});
  this.updateTotal();  

};

sendOrder(){
  //Função pra adicionar ao carrinho
  const sendOrder = {"order-number": Date.now() ,
    "client-name": this.state.clientName ,
    "total-order": this.state.totalValue,
    "received-value": this.state.receivedValue,
    "status": "send",
    "order-items": this.state.cart
  }
  var context = this;
  $.ajax({
    url: 'http://localhost:3001/orders/create',
    data: sendOrder,
    method: 'POST',
    success: function(response) {
        context.setState({
          cart: []
        });
        
    }
  });

  console.log(JSON.stringify(sendOrder));
};

searchProduct(event){
  //Funçãoa pra buscar produto
  var context = this;
  $.ajax({
    url: 'http://localhost:3001/products/'+context.state.textSearch,
    method: 'GET',
    success: function(response) {
      if(response.length<=0) alert("Produto não encontrado");
        var resultproductajax = {
          code:response[0].code,
          name:response[0].name,
          price: response[0].price
        }
        console.log(resultproductajax);
        context.setState({
          resultproduct: resultproductajax
        });
        
    }
  });
  console.log(this.state.resultproduct);
};

exchange(event){
  //Função de cálculo de troco
  var change = event.target.value - this.state.totalValue;
  this.setState({changeValue: change ,receivedValue:event.target.value });
};

updateItem(event){
  //atualiza qtd item carrinho
  var newCart = this.state.cart;
  newCart[event.target.dataset.index].qty = event.target.value;

  this.setState({cart:newCart});
  this.updateTotal();  
}

removeItem(event){
  //remove item do carrinho
 var newCart = this.state.cart;
 delete newCart[event.target.dataset.index];

  this.setState({cart:newCart});
  this.updateTotal();   
}

updateTotal(){
  var total = 0;
  this.state.cart.map((item, index) =>{
    total = total + (parseFloat(item.value)*parseInt(item.qty));
  });
  var newChangeValue = parseFloat(this.state.receivedValue) - parseFloat(total);
  this.setState({totalValue:total, changeValue:newChangeValue}); 
}

changeName(event){
  this.setState({clientName:event.target.value});
}

changeSearch(event){
  this.setState({textSearch:event.target.value});
}

changeQty(event){
  this.setState({qtyProduct:event.target.value});
}

  render() {
    return (
        <div>

    <section>
        <div class="container py-5">
            <div class="row">
                <div class="col">
                    <div class="input-group">
                        <input class="form-control" type="text" placeholder="Código do produto" defaultValue={this.state.textSearch} onChange={this.changeSearch.bind(this)}/>
                        {this.state.resultproduct!=null &&
                         <div className="position-absolute top-100 start-0 text-secondary" data-code={this.state.resultproduct.code} data-name={this.state.resultproduct.name} data-price={this.state.resultproduct.price}>{this.state.resultproduct.name} - R$ {this.state.resultproduct.price}</div>}
                        {<div class="input-group-text" onClick={this.searchProduct}>Buscar</div>}
                    </div>
                </div>
                <div class="col">
                  <div class="input-group">
                    <input class="form-control" type="number" placeholder="Quantidade do produto" defaultValue={this.state.qtyProduct} onChange={this.changeQty.bind(this)}/>                        
                  </div>
                </div>
                <div class="col-3 d-grid gap-2 mx-auto">
                  {<button type="button" class="btn btn-outline-success btn-lg" onClick={this.addCart.bind(this)}>Adicionar no carrinho</button>}
                </div>
        
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center py-5">
                <div class="col-3">
                    {<img src="/img/fritas.png" id="fritas" data-code="4" data-value="8" className="img-thumbnail" alt="fritas" onClick={this.addCartFavorites.bind(this)} />}
                </div>
                <div class="col-3">
                    {<img src="/img/refri.png" id="refrigerante"  data-code="5" data-value="5" className="img-thumbnail" alt="refrigerante" onClick={this.addCartFavorites.bind(this)} />}
                </div>
                <div class="col-3">
                    {<img src="/img/hamburguer.png" id="hamburguer"  data-code="1" data-value="15" className="img-thumbnail" alt="hamburguer" onClick={this.addCartFavorites.bind(this)} />}
                </div>
            </div>
            <div class="row justify-content-center py-5">
                <div class="col-3">
                    {<img src="/img/sorvete.png" className="img-thumbnail" id="sorvete" data-code="9" data-value="8" alt="sorvete" onClick={this.addCartFavorites.bind(this)} />}
                </div>
                <div class="col-3">
                    {<img src="/img/pizza.png" id="pizza"  data-code="3" data-value="13" className="img-thumbnail" alt="pizza" onClick={this.addCartFavorites.bind(this)} />}
                </div>
                <div class="col-3">
                    {<img src="/img/shake.png" id="shake" data-code="6" data-value="7" className="img-thumbnail" alt="shake" onClick={this.addCartFavorites.bind(this)} />}
                </div>
            </div>
        </div>

        
        
        <div class="container">
            <div class="input-group row justify-content-center">
                <div class="col">
                    <span class="input-group-text">Itens do pedido</span>
                </div>
            </div>
              {this.state.cart.map((item, index) => (   
                 <div class="input-group row justify-content-center">
                          <div class="col">
                              <input type="text" aria-label="Item" class="form-control" value={item.name} />
                          </div>
                          <div class="col">
                              <input type="number" aria-label="Value" data-index={index} class="form-control" defaultValue={item.qty} onChange={this.updateItem.bind(this)} />
                          </div>
                          <div class="col">
                              <input type="text" aria-label="Item" class="form-control" value={(parseFloat(item.value) * parseInt(item.qty))}  />
                        </div>
                        <div class="col-1">
                              <button class="btn btn-outline-danger" data-index={index} value={item.value} onClick={this.removeItem.bind(this)}>X</button>
                        </div>
                      </div>
                )
              )  
            } 
            
        </div>
        <div class="container py-5">
            <div class="row">
                <div class="col">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <input type="text" aria-label="Item" class="form-control" placeholder="Nome do cliente" defaultValue={this.state.clientName} onChange={this.changeName.bind(this)}/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                {<input type="number" aria-label="Item" class="form-control"
                                    placeholder="Total recebido" value={this.state.receivedValue} onChange={this.exchange.bind(this)} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div>Valor Total do Pedido</div>
                            </div>
                            <div class="col">                                
                                <span id="valor-total">R$ {this.state.totalValue}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                Total recebido
                            </div>
                            <div class="col">
                                <span id="valor-recebido">R$ {this.state.receivedValue}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                Troco
                            </div>
                            <div class="col">
                                <span id="valor-troco">R$ {this.state.changeValue}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="row py-3">
                <div class="col d-grid gap-2 col-6 mx-auto">
                    <button type="button" class="btn btn-outline-success btn-lg" onClick={this.sendOrder.bind(this)}>Finalizar pedido</button>
                </div>
            </div>
        </div>
    </section>

          
            
        </div>
    );
  }
}

export default Orders;