import './App.css';
import db from './db.json'
import { Component } from 'react';

const data = db
let index = ()=>{for(let i = 0;i< data.length;i++){

            return i

                    }
                  }
                  
console.log(index)
export default class Tabela extends Component{

  renderTable(){
    return( 
      
      <table className='table mt-4'>
          <thead>{this.getKey(data[0].map(el => el))}</thead>
          <tbody>
            {this.getRows(data[0].map(el =>el))}
            {this.getRows(data[1].map(el => el))}
            {this.getRows(data[2].map(el => el))}
            {this.getRows(data[3].map(el => el))}
            {this.getRows(data[4].map(el => el))}
            {this.getRows(data[5].map(el => el))}
          </tbody>
      </table>
    )
  }
  getKey(data){
    
    return Object.keys(data[0]).map(key =>{
      return <th>{key}</th>
    })
  }
  getRows(data){
    
    return data.map(obj =>{
      
      const image = this.getCellsImage(obj)[0]
      const name = this.getCells(obj)[1]
      const chapter = this.getCells(obj)[2]
      const link = <a href={this.getCells(obj)[3]}><span className='btt'>Go</span></a>
  
      return <tr>{image}{name}{chapter}{link}</tr>
    })
  }
  getCellsImage(obj){
    return Object.values(obj).map(value =>{

      return <td><img src={value} alt=''/></td>
    })
  }
  getCells(obj){
    return Object.values(obj).map(value =>{

      return <td className='char'>{value}</td>
    })
  }
  render(){
    return(
     this.renderTable()
    )
  }
}
