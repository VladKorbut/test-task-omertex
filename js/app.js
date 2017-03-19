'use strict';
var goods = [
  {
    name: 'Iphone 6',
    price: 500,
    img:'https://stiel.ru/wp-content/uploads/2015/04/apple-iphone-6-plus-gold-gallery-img-1-bp3-011215.jpg',
    description:'телефончик',
    inStock: false
  },
  {
    name: 'Bonaqua',
    price: 1,
    img:'http://www.sostav.ru/articles/rus/2011/14.12/news/images/bon00.jpg',
    description:'водичка',
    inStock: true
  },
  {
    name: 'Tetris',
    price: 5,
    img:'http://i.imgur.com/bm81f0p.png',
    description:'игрушка',
    inStock: false
  }
];

var Input = React.createClass({
  getInitialState: function() { 
    return {
      value: ''
    };
  },
  onChangeState: function(event){
  	console.log(event.target.value, ReactDOM.findDOMNode(this.refs.searchInput).value);
  	this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div>
	      <input
	      	className='form-control'
	      	placeholder='введите значение'
	      	value={this.state.value}
	      	ref='searchInput'
	      	onChange={this.onChangeState}
	      />
	  </div>
    );
  }
});

var Item =React.createClass({
	propTypes: {
	    data: React.PropTypes.shape({
	      name: React.PropTypes.string.isRequired,
	      price: React.PropTypes.number.isRequired,
	      img: React.PropTypes.string.isRequired,
	      description: React.PropTypes.string.isRequired,
	      inStock: React.PropTypes.bool.isRequired,
	    })
	  },
	getInitialState: function() {
	    return {
	      visible: false
	    };
	},
	readmoreClick: function(event) {
	    event.preventDefault();
	    this.setState({visible: !this.state.visible});
	},
	render:function(){
		var info = this.props.data;
		var visible = this.state.visible;
        return(
        	<a onClick={this.readmoreClick} className='thumbnail'>
        	  <img src={info.img} alt="..." />
        	  <div className='caption'>
		          <p><strong>Название: </strong>{info.name}</p>
		          <p><strong>Цена: </strong>{info.price} $</p>
		          <p className={visible ? '': 'none'}><strong>Описание: </strong>{info.description}</p>
		          <p className={visible ? '': 'none'}><strong>Наличие: </strong>{info.inStock ? 'В наличии' : 'Под заказ'}</p>
		      </div>
	        </a>
        )
	}
})

var Goods = React.createClass({
  render: function() {
    var data = this.props.data;
    var newsTemplate = data.map(function(item, index) {
      return (
      	<div className='col-xs-6 col-md-4' key={index}>
       		<Item data={item} />
       	</div>
      )
    })
    return (
      <div className="news">
        <div className='row'>
        	<strong>Всего Товаров: {data.length}</strong>
        </div>
        {newsTemplate}
      </div>
    );
  }
});
	
var App = React.createClass({
  render: function() {
    return (
      <div className="container">
      	<Input />
      	<h2>Каталог товаров</h2>
        <Goods data={goods} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);