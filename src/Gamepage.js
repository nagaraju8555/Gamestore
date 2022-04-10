import React, { Component } from 'react'
const listgames=[
    {"id":1 , "game_name" : "Game-1", "cost" : 3500.000 , "description" : "mygame discription", "count" : 0},
    {"id":2 ,"game_name" : "Game-2", "cost" : 4500.000 , "description" : "mygame discription", "count" : 0},
    {"id":3 ,"game_name" : "Game-3", "cost" : 500.000 , "description" : "mygame discription", "count" : 0},
    {"id":4 ,"game_name" : "Game-4", "cost" : 400.000 , "description" : "mygame discription", "count" : 0},
    {"id":5 ,"game_name" : "Game-5", "cost" : 6500.000 , "description" : "mygame discription", "count" : 0},
    {"id":6 ,"game_name" : "Game-6", "cost" : 3800.000 , "description" : "mygame discription", "count" : 0},
    {"id":7 ,"game_name" : "Game-7", "cost" : 5800.000 , "description" : "mygame discription", "count" : 0},
    {"id":8 ,"game_name" : "Game-8", "cost" : 9500.000 , "description" : "mygame discription", "count" : 0},
    {"id":9 ,"game_name" : "Game-9", "cost" : 4599.000 , "description" : "mygame discription", "count" : 0},
    {"id":10 ,"game_name" : "Game-10", "cost" : 5999.000 , "description" : "mygame discription", "count" : 0},
    ]
export default class Gamepage extends Component {
    state={
        data :[],
        cart:[],
        nummberOfCount : 0,
        total : 0
    }
    componentDidMount(){
       
        if (JSON.parse(localStorage.getItem("Games")) === null){
            localStorage.setItem("Games", JSON.stringify(listgames))
        }
        this.setState({
            data : JSON.parse(localStorage.getItem("Games")),
            cart :  JSON.parse(localStorage.getItem("Games")).filter(e => e.count >0)
        })
        const count=JSON.parse(localStorage.getItem("Games")).filter(e => e.count >0)
        var tl=0
        var num=0
        count.map((items)=>{           
            num += items.count
            tl +=(items.cost) * items.count
           
        })
        console.log("total :",tl)
        console.log("count :",num)
        this.setState({
            nummberOfCount : num,
            total : tl
        })



      
    }

    incrementCart=(e)=>{
        console.log("increment" , e)
        const add=JSON.parse(localStorage.getItem("Games"))
        add[e].count = add[e].count +1
        localStorage.setItem("Games", JSON.stringify(add))
        this.componentDidMount()
        
    }
    decrementCart=(e)=>{
        console.log("Decrement",e)
        const add=JSON.parse(localStorage.getItem("Games"))
        add[e].count = add[e].count -1
        localStorage.setItem("Games", JSON.stringify(add))
        this.componentDidMount()
    }
    remove =(e)=> {
        console.log("Delete",e)
        const edit=JSON.parse(localStorage.getItem("Games"))
        edit[e].count=0
        localStorage.setItem("Games", JSON.stringify(edit))
        this.componentDidMount()
    }
    clearCart=()=>{
        console.log("clear")
        localStorage.setItem("Games", JSON.stringify(listgames))
        this.componentDidMount()

    }
  render() {
   const  store = this.state.data.map((val, indx) => {
        return (
            <div  style={content} key={indx}>
            <div className='col-12 pb-4' style={{lineHeight: "0.6"}}>
                <div className='row'>
                    <div className='col-8'>
                        <p>{val.game_name}</p>
                    </div>
                    <div className='col-4'>
                        <p>$ {val.cost}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8'>
                        <p>{val.description}</p>
                    </div>
                    <div className='col-4'>
                        {val.count <= 0 ? 
                    <button onClick={()=>this.incrementCart(val.id-1)} style={button}>Add Cart</button>
                    :<>
                    <button onClick={()=>this.incrementCart(val.id-1)} style={button}>+</button>
                    <button onClick={()=>this.decrementCart(val.id-1)} style={button}>-</button>
                    </>
                        }
                    </div>
                </div>
            </div>
        </div>
        )
      
    })
    const  cart = this.state.cart.map((val, indx) => {
        return (
            
            <div  style={content} key={indx}>
            <div className='col-12 pb-4' style={{lineHeight: "0.6"}}>
                <div className='row'>
                    <div className='col-2'>
                        <button onClick={()=>this.remove(val.id-1)} style={button}>x</button>
                    </div>
                    <div className='col-4 pt-2'>
                        <p>{val.game_name}</p>
                    </div>
                    <div className='col-2 pt-2'>
                        <p>{val.count}  &nbsp; x  &nbsp; $ {val.cost}</p>
                    </div>              
                   <div className='col-2 pt-2'>
                   <p>$ {(val.cost)*val.count}</p>
                   </div>
                    <div className='col-2'>
                        {val.count <= 0 ? 
                    <button onClick={()=>this.incrementCart(val.id-1)} style={button}>Add Cart</button>
                    :<>
                    <button onClick={()=>this.incrementCart(val.id-1)} style={button}>+</button>
                    <button onClick={()=>this.decrementCart(val.id-1)} style={button}>-</button>
                    </>
                        }
                    </div>
                </div>               
            </div>
        </div>
        )
      
    })
    return (
    <div className='container pt-5' style={{width : "100%" , height : "100%"}} > 
        <div className='row'>
            <div className='col-12'>
                <h2  style={headrename}><b>GAMES STORE</b></h2>
            </div>
        </div>
        <div className='row pt-5' style={container}>
            
            {store }
        </div>
        <div className='row'>
            <div className='col-5 mt-2' style={{backgroundColor : "white" , height : "2px"}}></div>
            <div className='col-2' style={{color : "white"}}>Game Store Cart</div>
            <div className='col-5 mt-2' style={{backgroundColor : "white" , height : "2px"}}></div>
        </div>
        {this.state.cart.length !==0 ? <>
        <div className='row pt-5'>                    
            {cart }
        </div>
        <div className='row' style={{backgroundColor : "white" , height : "2px"}}></div>
        <div className='row pt-2'>
            <div className='col-4 ' style={{color : "white"}}><b><span style={{paddingLeft : "50px"}}>Total</span></b></div>
            <div className='col-3 pl-5' style={{color : "white"}}><b><span style={{paddingLeft : "150px"}}>{this.state.nummberOfCount}</span></b></div>
            <div className='col-2' style={{color : "white"}}><b><span style={{paddingLeft : "50px"}}>$ {this.state.total}</span></b></div>
            <div className='col-3' style={{color : "white"}}>
            <button onClick={this.clearCart} style={button}>Clear Cart</button>
            </div>
        </div>
        </>
        : <div className='pt-5 pb-5'><h1  style={{color : "white"}}>Empty Cart</h1></div>}
    </div>
    
    )
  }
}

const headrename={
    color : "#FFD700"
}
const content ={
    color :"white",
    textAlign : "left"
}
const button = {
    backgroundColor: "#808080" ,
    border: "none",
    color: "white" ,
    padding:" 5px 15px ",
    textAlign: "center" ,
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer"
  }
  const container =  {
    display : "grid" ,
    gridTemplateColumns : "50% 50%" ,  
    // gridTemplateRows: "100px",
    gridColumnGap: "2px",
  }
  
  const cart =  {
    display : "grid" ,
    gridTemplateColumns : "100%" ,  
    // gridTemplateRows: "100px",
    gridColumnGap: "1px",
  }
