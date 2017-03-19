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

var Item = React.createClass({
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
    var divStyle = {
      backgroundImage: 'url(' + info.img + ')',
    }
        return(
        	<a onClick={this.readmoreClick} className='thumbnail'>
            <div className={'img ' + (!visible ? '': 'none')} style={divStyle}></div>
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
      if(item.name.toLowerCase().indexOf('')+1){
        return (
        	<div className='col-xs-12 col-sm-6 col-md-4' key={index}>
         		<Item data={item} />
         	</div>
        )
      }
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
  filterList: function(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      console.log(item)
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },
  getInitialState: function(){
     return {
       initialItems: goods,
       items: []
     }
  },
  componentWillMount: function(){
    this.setState({items: this.state.initialItems})
  },
  render: function() {
    return (
      <div className="container">
      	<h2>Каталог товаров</h2>
        <input
          className='form-control'
          placeholder='Поиск'
          value={this.state.value}
          ref={'searchInput'}
          onChange={this.filterList}
        />
        <Goods data={this.state.items} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);