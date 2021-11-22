import React,{Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class App extends Component{
  constructor(props){
    super(props);
    this.state = ({
      prestamos:[],
      pos:null,
      titulo: 'Nuevo',
      id: 0,
      codigo: '',
      libro: '',
      usuario: '',
      fechaPrestamo: '',
      fechaDevolucion: ''
    })
    this.cambioCodigo = this.cambioCodigo.bind(this);
    this.cambioLibro = this.cambioLibro.bind(this);
    this.cambioUsuario = this.cambioUsuario.bind(this);
    this.cambioFechaPrestamo = this.cambioFechaPrestamo.bind(this);
    this.cambioFechaDevolucion = this.cambioFechaDevolucion.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.guardar = this.guardar.bind(this);
  }

  cambioCodigo(e){
    this.setState({
      codigo: e.target.value
    })
  }

  cambioLibro(e){
    this.setState({
      libro: e.target.value
    })
  }

  cambioUsuario(e){
    this.setState({
      usuario: e.target.value
    })
  }

  cambioFechaPrestamo(e){
    this.setState({
      fechaPrestamo: e.target.value
    })
  }

  cambioFechaDevolucion(e){
    this.setState({
      fechaDevolucion: e.target.value
    })
  }  

  componentDidMount(){
    axios.get('http://localhost:8000/prestamos')
    .then(res =>{
      console.log(res.data);
      this.setState({prestamos: res.data})
    })
  }

  mostrar(cod,index){
    axios.get('http://localhost:8000/prestamos'+cod)
    .then(res => {
      this.setState({
        pos: index,
        titulo: 'Editar',
        id: res.data.id,
        codigo: res.data.codigo,
        libro: res.data.libro,
        usuario: res.data.usuario,
        fechaPrestamo: res.data.fecPrestamo,
        fechaDevolucion: res.data.fecDevolucion
      })
    })
  }

  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    const datos = {
      codigo: this.state.codigo,
      libro: this.state.libro,
      usuario: this.state.usuario,
      fecPrestamo: this.state.fechaPrestamo,
      fecDevolucion: this.state.fechaDevolucion
    }
    if(cod>0){
      //edición de un registro
      axios.put('http://localhost:8000/prestamos'+cod,datos)
      .then(res =>{
        let indx = this.state.pos;
        this.state.prestamos[indx] = res.data;
        var temp = this.state.prestamos;
        this.setState({
          pos:null,
          titulo:'Nuevo',
          id:0,
          codigo: '',
          libro: '',
          usuario: '',
          fechaPrestamo: '',
          fechaDevolucion: '',
          prestamos: temp
        });
      }).catch((error) =>{
        console.log(error.toString());
      });
    }else{
      //nuevo registro
      axios.post('http://localhost:8000/prestamos',datos)
      .then(res => {
        this.state.prestamos.push(res.data);
        var temp = this.state.prestamos;
        this.setState({
          id:0,
          nombre:'',
          codigo: '',
          libro: '',
          usuario: '',
          fechaPrestamo: '',
          fechaDevolucion: '',
          prestamos: temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }

  eliminar(cod){
    let rpta = window.confirm("Desea Eliminar?");
    if(rpta){
      axios.delete('http://localhost:8000/prestamos'+cod)
      .then(res =>{
        var temp = this.state.prestamos.filter((prestamo)=>prestamo.id !== cod);
        this.setState({
          prestamos: temp
        })
      })
    }
  }

  render(){
    return(
    <div>
        <Container>
              <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Libro</th>
                  <th>Usuario</th>
                  <th>Fecha de Prestamo</th>
                  <th>Fecha de Devolución</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.prestamos.map( (prestamo,index) =>{
                  return (
                    <tr key={prestamo.id}>
                        <td>{prestamo.codigo}</td>
                        <td>{prestamo.libro}</td>
                        <td>{prestamo.usuario}</td>
                        <td>{prestamo.fecPrestamo}</td>
                        <td>{prestamo.fecDevolucion}</td>
                        <td>
                          <Button variant="success" onClick={() => this.mostrar(prestamo.id, index)}>Editar</Button>
                          <Button variant="danger" onClick={() => this.eliminar(prestamo.id, index)}>Eliminar</Button>
                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <hr />
            <h1>{this.state.titulo}</h1>
            <Form onSubmit={this.guardar}>
                      <input type="hidden" value={this.state.id} />
                      <Form.Group className="mb-3">
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control type="text" value={this.state.codigo} onChange={this.cambioCodigo} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Libro</Form.Label>
                        <Form.Control type="text" value={this.state.libro} onChange={this.cambioLibro} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" value={this.state.usuario} onChange={this.cambioUsuario} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de Prestamo</Form.Label>
                        <Form.Control type="date" value={this.state.fechaPrestamo} onChange={this.cambioFechaPrestamo} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de Devolucion</Form.Label>
                        <Form.Control type="date" value={this.state.fechaDevolucion} onChange={this.cambioFechaDevolucion} />
                      </Form.Group>
                  <Button variant="primary" type="submit">
                    Guardar
                  </Button>
             </Form>
        </Container>
    </div>)
  }
}

export default App;