import React, { Component } from 'react';
import { createFilter } from './util/Filter';
import {stores} from '../shared/stores';
class List extends Component {
  state = {
    filters: this.props.filters,
    store:stores
  }

  static defaultProps = {
    filters: [{
        property: 'city',
      value: ['Erode',"Coimbatore"]
    }, {
      property: 'category',
      value: ["cardprinters","Jewellery","Dress"]
    }],
  }

  componentDidMount () {
    this.setState({
        data: stores
      });
  }

  render () {
    const { data } = this.state;

    return data ?
      this.renderData(data) :
      this.renderLoading();
  }
 
  renderData (data) {
    if (data && data.length > 0) {
      const { filters } = this.state;
        //data = this.filterItems(data,"category",["cardprinters","Jewellery"]);
        if (Array.isArray(filters) && filters.length) {
          data = data.filter(createFilter(...filters));
          console.log(data);
          console.log("vk4",...filters);
        }

      return (
        <div className="text-white">
          {
            data.map(item => (
              <div key={item.id}>
                <p>{item.name}</p>
                 <p>{item.category}</p>
              </div>
            ))
          }
        </div>
      );
    } else {
      return <div className="text-white">No items found</div>;
    }
  }

  renderLoading () {
    return <div>Loading...</div>;
  }
}

export default List;