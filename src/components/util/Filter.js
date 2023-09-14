const doFilter = (item, filter) => {
    let { value } = filter;
    if(value.size==0){
      console.log("vk0");
      return true;
    }
    //console.log("vk!0",value,item[ filter.property ]);
    if(value instanceof Set){
      return value.has(item[ filter.property ]);
    }
    else if(typeof(value) === 'number'){
      //console.log("vk!0",value,item[ filter.property ]);
      return (value <= item[ filter.property ]);
    }
    else if(filter.property === 'capacitymin'){
      return (value <= item[ filter.property ]);
    }
    else if(value>0 && filter.property === 'capacitymax'){
      return (value >= item[ filter.property ]);
    }
    else{
      //console.log("vk!0",value,item[ filter.property ]);
      return true;
    }
    
  }
  
  const createFilter = (...filters) => {
    if (typeof filters[0] === 'string') {
      filters = [
        {
          property: filters[0],
          value: filters[1]
        }
      ];
    }
  
    return item => filters.every(filter => doFilter(item, filter));
  };
  
  export { createFilter };