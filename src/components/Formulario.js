import React, { useState } desde 'react';
Importar estilo desde '@emotion/styled';
importar PropTypes desde 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '.. /helper';

const Campo = estilizado. Div`
 Pantalla: Flex;
 margen-fondo: 1rem;
 align-items: centro;
`;
const Label = styled. etiqueta`
    flex: 0 0 100px;
`;
const Select = styled. escoger`
 Pantalla: bloque;
 ancho: 100%;
 relleno: 1rem;
 borde: 1px sólido #e1e1e1;
 -webkit-apariencia: ninguno;
`;
const InputRadio = estilo. entrada`
 margen: 0 1rem;
`;
const Boton = estilo. botón`
 fondo-color: #00838F;
 tamaño de fuente: 16px;
 ancho: 100%;
 relleno: 1rem;
    color: #fff;
 text-transform: mayúsculas;
 font-weight: negrita;
 borde: ninguno;
 transición: fondo-color .3s facilidad;
 margen superior: 2rem;
    &:hover {
 fondo-color: #26C6DA;
 cursor: puntero;
    }
`;
const Error = estilo. Div`
 fondo-color: rojo;
 color: blanco;
 relleno: 1rem;
 ancho: 100%;
 alineación de texto: centro;
 margen-fondo: 2rem;
`;
const Formulario = ({guardarResumen, guardarCargando}) => {
    const [ datos, guardarDatos ] = useState({
        marca: '',
        año: '',
        Planificar: ''
    });
    const [ error, guardarError ] = useState(false);
    extraer los valores del state
    const { marca, year, plan } = datos;
    Leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = e => {
        guardarDatos({
 ... datos,
            [e. objetivo. nombre] : e. objetivo. valor
        })
    }
    // cuando el usuario presiona submit
    const cotizarSeguro = e => {
        e. preventDefault();
        si(marca. trim() === '' ||  año. trim() === '' ||  plan. recortar() === '') {
            guardarError(true);
            devolución;
        }
        guardarError(false);
        // Una base de 2000
        let resultado = 2000;
        // obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(año);
        // por cada año hay que restar el 3%
        resultado -= (( diferencia * 3 ) * resultado) / 100  ;
        // Americano 15
        // Asiático 5%
        // Europeo 30%
         resultado = calcularMarca(marca) * resultado;
        // Basíco aumenta 20%
        // Completo 50%
        const incrementoPlan = obtenerPlan(plan);
         resultado = parseFloat( incrementoPlan * resultado ). aFijo(2);
        guardarCargando(true);
        setTimeout(() => {
            // Elimina el spinner
            guardarCargando(false);

            // pasa la información al componente principal
            guardarResumen({
                cotizacion: resultado,
                cotizacion: Number(resultado),
                datos
            });
        }, 3000);
    }
    devolución ( 
        <forma
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Todos los campos son obligatorios</Error> : null }
            <Campo>
                <Etiqueta>Marca</Etiqueta >
                <Escoger
                    name="marca"
                    valor={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option >
                    <option value="americano">Americano</option >
                    <option value="europeo">Europeo</option >
                    <option value="asiatico">Asiatico</option >
                </Escoger>
            </Campo>
            <Campo>
                <Etiqueta>Año</Etiqueta >
                <Escoger
                    nombre="año"
                    valor={año}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option >
                    < option value="2021">2021</option>
                    < option value="2020">2020</option>
                    < option value="2019">2019</option>
                    < option value="2018">2018</option>
                    < option value="2017">2017</option>
                    < option value="2016">2016</option>
                    < option value="2015">2015</option>
                    < option value="2014">2014</option>
                    < option value="2013">2013</option>
                    < option value="2012">2012</option>
                </Escoger>
            </Campo>
            <Campo>
                <Etiqueta>Plan</Etiqueta >
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                /> Básico
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                /> Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton >
        </forma>

     );
}

Formulario. propTypes = {
    guardarResumen: PropTypes. func. isRequired,
    guardarCargando: PropTypes. func. isRequired
}

exportar formulario predeterminado ;