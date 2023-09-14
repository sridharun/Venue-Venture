import axios from 'axios';
import React, { Component,useState,useRef } from 'react';
import { FormControl, InputGroup ,Card ,CardImg,Button, Pagination,Form,Col,Row} from 'react-bootstrap';
import Header from './HeaderComponent';
import './accordian/accordian.css';
import Chevron from './accordian/Chevron';
import List from '@material-ui/core/List';
import {FormControlLabel, ListItem} from '@material-ui/core'; 
import Checkbox from '@material-ui/core/Checkbox';
import { createFilter } from './util/Filter';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


export default class Venues extends Component{
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state={
      venues:[],
      result:[],
      currentPage : 1,
      usersPerPage : 4,
      search:'',
      reloadpage:'',
      checked:false,
      category:['Freshersparty','Exhibition','Wedding','BirthdayParty','Conference','Anniversary'],
      checkedItems: new Set(),
      filters: '',
      ratingRadioValue:0,
      minCapacity:0,
      maxCapacity:0,
      
    }
    this.setState({filters: this.filterdata});
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.getItemCheckedStatus = this.getItemCheckedStatus.bind(this);
    this.RenderMenuItem = this.RenderMenuItem.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.filterdata = this.filterdata.bind(this);
  }
  filterdata =()=> {
    this.setState({filters: [{
      property: 'occations',
      value:this.state.checkedItems
    },
    {
      property: 'rating',
      value: this.state.ratingRadioValue,
    },
    {
      property: 'capacitymin',
      value: this.state.minCapacity,
    },
    {
      property: 'capacitymax',
      value: this.state.maxCapacity,
    }]
  },()=>{
    this.filterUpdate();
  });
  }
  addItem(item) {
    this.setState(({ checkedItems }) => ({
      checkedItems: new Set(checkedItems).add(item)
    }),() => {                              
      //callback
      console.log(this.state.checkedItems) // myname
      this.filterdata();
    });
    
  }
  getItemCheckedStatus(item) {
    return this.state.checkedItems.has(item);
  }
  removeItem(item) {
    this.setState(({ checkedItems }) => {
      const newChecked = new Set(checkedItems);
      newChecked.delete(item);
      
      return {
       checkedItems: newChecked
      };
    },() => {                              
      //callback
      console.log(this.state.checkedItems)
      this.filterdata();
    });
  }
  handleCategory = (id,name)=> {
    console.log(id);
    this.props.history.push({ 
      pathname: `/venues/${name}`,
      state: {id: id}
    });
  } 
  componentDidMount(){
    this.findAll();
  }
  findAll(){
    const url = 'http://localhost:8081/venue/getvenues';
    axios.get(url)
    .then((response)=>{
        this.setState({
          result:response.data,
          venues:response.data,
        })
    })
  }
  changePage = (a,event) => {
    console.log("vijay");
    this.setState({
        currentPage: a
    });
  };

  firstPage = () => {
      if(this.state.currentPage > 1) {
          this.setState({
              currentPage: 1
          });
      }
  };

  prevPage = () => {
      if(this.state.currentPage > 1) {
          this.setState({
              currentPage: this.state.currentPage - 1
          });
      }
  };

  lastPage = () => {
      if(this.state.currentPage < Math.ceil(this.state.venues.length / this.state.usersPerPage)) {
          this.setState({
              currentPage: Math.ceil(this.state.venues.length / this.state.usersPerPage)
          });
      }
  };

  nextPage = () => {
      if(this.state.currentPage < Math.ceil(this.state.venues.length / this.state.usersPerPage)) {
          this.setState({
              currentPage: this.state.currentPage + 1
          });
      }
  };

  RenderMenuItem ({dish}) {
    return (
        <Card className="p-2"  onClick={() => this.handleCategory(dish.id,dish.name)}>
          <div className="row no-gutters">
            <div className="col-md-4">
            <CardImg width="100%" src={dish.image} alt={dish.name} style={{maxHeight:"180px"}} /> 
            </div>   
            <div className="col-md-8">  
            <Card.Body>
              <h3>{dish.name} </h3>
              <p><span className="fa fa-map-marker"></span> {dish.location}, {dish.city}</p>
              <div className="row">
                <p className="col-md-4"><i class="fa fa-star"></i>Ratings {dish.rating}</p>
                <p className="col-md-5 ml-auto"><i class="fa fa-users"></i>{dish.capacitymin}-{dish.capacitymax} Guests</p>
              </div>
            </Card.Body>
            </div>  
          </div>
        </Card>
    );
  }
  setter = (svalue) =>{
    console.log("vijay",svalue);
    this.setState({
      venues:this.state.result.filter(item =>{
        return Object.keys(item).some(key=>
          item[key].toString().toLowerCase().includes(svalue.toString().toLowerCase()))
      }),
  });
  }
  searchChange = event => {
    console.log(event.target.value);
    this.setState({
        [event.target.name] : event.target.value,
    });
    this.setter(event.target.value);
    
  };

  cancelSearch =() => {
      this.setState({"search" : ''});
      this.setter('')
  };

  Accordian=()=> ()=> {
   
    const [active,setActive] = useState("active");
    const [height,setHeight] = useState("160px");
    const [rotate,setRotate] = useState("accordian_icon rotate");
    const content = useRef(null);
    const toggleAccordian = () =>{
      setActive(active==="active"? "":"active");
        setHeight(
            active==="active"? "0px":`${content.current.scrollHeight}px`
        );
        setRotate(
            active==="active"?"accordian_icon":"accordian_icon rotate"
        ) 
    } 
    const capacityclick = ()=>{
      
      this.setState({
        minCapacity:[document.getElementById('formmincap').value],
        maxCapacity:[document.getElementById('formmaxcap').value]
      },()=>{
        console.log(this.state.minCapacity);
        this.filterdata();
      });
    }
    const handleChange = (event) => {
      console.log(document.getElementById('formmincap').value);
      
    };
    return (
        <List className="m-0 p-0 fixed" style={{backgroundColor:'#eee'}}>
            <ListItem>
                <div className="accordian_section">
                    <button className={`accordian ${active} text-center`} onClick={toggleAccordian}>
                        <p className="accordian_title mt-3">Filter By Capacity</p>
                        <Chevron className={`${rotate}`} width={15} fill={"#777"} />
                        {/* <span className={`${icon}`}></span> */}
                    </button>
                    <div ref={content} className="accordian_content" style={{maxHeight:`${height}` ,overflow:'auto'}}>
                        <div className="accordian_text" >
                        <Form.Group as={Row} className="mb-2" controlId="formmincap">
                          <Form.Label column sm="4" style={{fontSize:'1.2rem'}}>
                            MIN
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control  name="minCapacity" type="number" placeholder="Maximum" />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formmaxcap">
                          <Form.Label column sm="4" style={{fontSize:'1.1rem'}}>
                            MAX
                          </Form.Label>
                          <Col sm="8">
                            <Form.Control type="number" name="maxCapacity" placeholder="Maximum" />
                          </Col>
                        </Form.Group>
                        <Button onClick={capacityclick}>Filter</Button>
                        </div>
                    </div>
                </div>
            </ListItem>
        </List>
    )}
    filterUpdate() {
      const {filters,venues,result} = this.state;
        console.log('k1',...filters);
        console.log('k2',venues.filter(createFilter(...filters)));
        if (Array.isArray(filters) && filters.length) {
          this.setState({
            venues:result.filter(createFilter(...filters))
          }); 
        }
    }
    Accordian1=()=> ()=> {
      const {category,checked,filters,venues,result} = this.state;
      const getItemCheckedStatus = this.getItemCheckedStatus;
      const [active,setActive] = useState("active");
      const [height,setHeight] = useState("160px");
      const [rotate,setRotate] = useState("accordian_icon rotate");
      const content = useRef(null);
      const toggleAccordian = () =>{
        setActive(active==="active"? "":"active");
          setHeight(
              active==="active"? "0px":`150px`
          );
          setRotate(
              active==="active"?"accordian_icon":"accordian_icon rotate"
          ) 
      } 
      const handleChange = (event) => {
        if(event.target.checked){
          this.addItem(event.target.name);
        }
        else{
          this.removeItem(event.target.name);
        }
        console.log('krishna',this.state.checkedItems);
        
      };
      const filterbycategory = category.map(function(name, index){
        return (
          <div key={ index }>
            <FormControlLabel
              control={
                <Checkbox
                  checked={getItemCheckedStatus(name)}
                  onChange={handleChange}
                  name={name}
                  color="primary"
                />
              } 
              label={name}
            /> 
          </div>
        );
      });
      return (
          <List className="m-0 p-0 fixed" style={{backgroundColor:'#eee'}}>
              <ListItem>
                  <div className="accordian_section" style={{width:'100%'}}>
                      <button className={`accordian ${active} text-center`} onClick={toggleAccordian}>
                          <p className="accordian_title mt-3">Filter By Occations</p>
                          <Chevron className={`${rotate}`} width={15} fill={"#777"} />
                          {/* <span className={`${icon}`}></span> */}
                      </button>
                      <div ref={content} className="accordian_content" style={{maxHeight:`${height}` ,overflow:'auto' }}>
                        <div className="accordian_text" >
                          {filterbycategory}
                        </div>
                      </div>
                  </div>
              </ListItem>
          </List>
      )}
      Accordian2=()=> ()=> {
        const [active,setActive] = useState("active");
        const [height,setHeight] = useState("220px");
        const [rotate,setRotate] = useState("accordian_icon rotate");
        const content = useRef(null);
        const toggleAccordian = () =>{
          setActive(active==="active"? "":"active");
            setHeight(
                active==="active"? "0px":`220px`
            );
            setRotate(
                active==="active"?"accordian_icon":"accordian_icon rotate"
            ) 
        } 
        const handleChange = (event) => {
          this.setState({ratingRadioValue:+event.target.value},()=>{console.log(this.state.ratingRadioValue);this.filterdata();});
        };
        return (
            <List className="m-0 p-0 fixed" style={{backgroundColor:'#eee'}}>
                <ListItem>
                    <div className="accordian_section" style={{width:'100%'}}>
                        <button className={`accordian ${active} text-center`} onClick={toggleAccordian}>
                            <p className="accordian_title mt-3">Filter By Rating</p>
                            <Chevron className={`${rotate}`} width={15} fill={"#777"} />
                            {/* <span className={`${icon}`}></span> */}
                        </button>
                        <div ref={content} className="accordian_content" style={{maxHeight:`${height}`,overflow:'auto'}}>
                            <div className="accordian_text">
                              <RadioGroup aria-label="ratingRadio" name="ratingRadio" value={this.state.ratingRadioValue} onChange={handleChange}>
                                <FormControlLabel value={4} control={<Radio color="primary" />} label="Above 4 stars" />
                                <FormControlLabel value={3} control={<Radio color="primary" />} label="Above 3 stars" />
                                <FormControlLabel value={2} control={<Radio color="primary" />} label="Above 2 stars" />
                                <FormControlLabel value={1} control={<Radio color="primary" />} label="Above 1 stars" />
                                <FormControlLabel value={0} control={<Radio color="primary" />} label="No Rating" />
                                
                              </RadioGroup></div>
                        </div>
                    </div>
                </ListItem>
            </List>
        )}
  render(){
    
    const Accordian = this.Accordian();
    const Accordian1 = this.Accordian1();
    const Accordian2 = this.Accordian2();
    const {venues, currentPage, usersPerPage,search} = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = venues.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(venues.length / usersPerPage);

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };
    
    const menu = currentUsers.map((dish) => {
      return (
          <div className="m-2"  key={dish.id}>
            
              <this.RenderMenuItem dish={dish} />
          </div>
      );
    });
    
    return (
        <div className="container" style={{marginTop:'5rem'}}>
          <Header navbg={"linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6))"} />
          <Card  className="bg-transparent">
            <Card.Body>
              <div className="row">
                <div className="col-md-3"><Accordian/><Accordian1/><Accordian2/></div>
                <div className="col-md-9">
                  <div className="col-md-5 text-left d-flex flex-column">
                     <InputGroup size="sm">
                        <FormControl placeholder="Search" name="search" value={search}
                            className={"info-border"}
                            onChange={this.searchChange}/>
                        <InputGroup.Text>
                            <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                              <i class="fa fa-times" aria-hidden="true"></i>
                            </Button>
                        </InputGroup.Text>
                      </InputGroup>        
                  </div>
                  {menu}
                  
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div style={{"float":"left"}}>
                Page {currentPage} of {totalPages}
              </div>
              <div style={{"float":"right"}}>

                <Pagination>
                  {/* <Pagination.First  disabled={currentPage === 1 ? true : false}  onClick={this.firstPage} /> */}
                  <Pagination.Prev   disabled={currentPage === 1 ? true : false}  onClick={this.prevPage}/>
                  {currentPage===1?<Pagination.Item active={currentPage === 1 ? true : false}  onClick={this.firstPage}>{1}</Pagination.Item>:<Pagination.Item  onClick={this.firstPage}>{1}</Pagination.Item>}
                  {totalPages>2 && currentPage<4 && <Pagination.Item active={currentPage === 2 ? true : false} onClick={() => this.changePage(2)}>{2}</Pagination.Item>}
                  {totalPages>3 && currentPage<4 && <Pagination.Item active={currentPage === 3 ? true : false} onClick={() => this.changePage(3)}>{3}</Pagination.Item>}
                  {totalPages>4 && currentPage<4 && <Pagination.Item active={currentPage === 4 ? true : false} onClick={() => this.changePage(4)}>{4}</Pagination.Item>}
                  {totalPages>4 && totalPages>5 && currentPage<4 && <Pagination.Ellipsis />}

                  {currentPage>3 && currentPage<=totalPages-3 && <Pagination.Ellipsis />}
                  {currentPage>3 && currentPage<=totalPages-3 && <Pagination.Item onClick={() => this.changePage(currentPage-1)}>{currentPage-1}</Pagination.Item>}
                  {currentPage>3 && currentPage<=totalPages-3 && <Pagination.Item active>{currentPage}</Pagination.Item>}
                  {currentPage>3 && currentPage<=totalPages-3 && <Pagination.Item onClick={() => this.changePage(currentPage+1)}>{currentPage+1}</Pagination.Item>}
                  {currentPage>3 && currentPage<=totalPages-3 && <Pagination.Ellipsis />}

                  {totalPages-1>0 && totalPages>5 && currentPage>totalPages-3 && <Pagination.Ellipsis />}
                  {totalPages-3>1 && currentPage>3 && currentPage>totalPages-3 && <Pagination.Item active={currentPage === totalPages-3 ? true : false} onClick={() => this.changePage(totalPages-3)}>{totalPages-3}</Pagination.Item>}
                  {totalPages-2>0 && currentPage>3 && currentPage>totalPages-3 && <Pagination.Item active={currentPage === totalPages-2 ? true : false} onClick={() => this.changePage(totalPages-2)}>{totalPages-2}</Pagination.Item>}
                  {totalPages-1>0 && currentPage>3 && currentPage>totalPages-3 && <Pagination.Item active={currentPage === totalPages-1 ? true : false} onClick={() => this.changePage(totalPages-1)}>{totalPages-1}</Pagination.Item>}
                  <Pagination.Item onClick={this.lastPage} active={currentPage === totalPages ? true : false}>{totalPages}</Pagination.Item>
                  <Pagination.Next disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}/>
                  {/* <Pagination.Last disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}/> */}
                </Pagination>
              </div>
            </Card.Footer>
          </Card>
        </div>
    );
  }
}
