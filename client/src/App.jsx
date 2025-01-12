import React, {useState, useEffect} from 'react'
import './App.css'
import Axios from "axios";
import Card from "./components/card";

function App() {

    const baseUrl = "http://localhost:3001"

    const [values, setValues] = useState();
    const [cliente, setCliente] = useState();

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const handleClickButton = () => {
        Axios.post(`${baseUrl}/register`, {
            nome: values.nome,
            email: values.email,
            fone: values.fone,
            data: values.data,
            hora: values.hora,
        }).then((response) =>{
            console.log(response)
        });
    }

    useEffect(() => {
        Axios.get(`${baseUrl}/cliente`)
            .then((response)=>{
            setCliente(response.data)
        })
        }
    )


  return (
    <div className="App">
      <div className="container">
          <h1 className="title">Barber Igor</h1>
          <h3>Agendamento</h3>
          <div className="register-box">
              <input className="register-input" type="text" name="nome" placeholder="Nome" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="email" placeholder="E-mail" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="fone" placeholder="Telefone" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="data" placeholder="Data" onChange={handleChangeValues} />
              <input className="register-input" type="text" name="hora" placeholder="Hora" onChange={handleChangeValues} />
              <button className="register-button" onClick={handleClickButton}>Agendar</button>
          </div>
          <br/>
          <div className="cards">
              {typeof cliente !== 'undefined' &&
                  cliente.map((cliente) => {
                      return <Card
                          key={cliente.id}
                          id={cliente.id}
                          nome={cliente.nome}
                          email={cliente.email}
                          fone={cliente.fone}
                          data={cliente.data}
                          hora={cliente.hora}

                      >
                      </Card>;
                  })}
          </div>
      </div>
    </div>
  )
}

export default App
