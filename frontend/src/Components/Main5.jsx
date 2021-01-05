import React from 'react';
import '../Styles/Main5.css';
import { withRouter, Link } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import axios from 'axios';
let newDate;
let bool = true, bool2 = true, SubirUsu = new Array(), i = 0;
class Main5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataClase: [],
            DataClasef: [],
            array: [],
            actual: [],
            posicion: 0,
            despaginar: 0,
            tamaño: 0,
            DataClaseI: [],
            DataClaseIF: [],
            arrayI: [],
            actualI: [],
            posicionI: 0,
            despaginarI: 0,
            tamañoI: 0,
            Modal1: false,
            Modal2: false,
            Modal3: false,
            ModalClase: 0,
            Modalconusu: 0,
            CrearClase: [],
            UsuariosCrearClase: [],
            UnirseClase: {
                boolean: false
            }
        }
    }
    async componentDidMount() {
        await this.getClasesC();
        await this.getClasesI();
        /*CLASES CREADAS*/
        /*
        if (this.state.DataClase.length == 0) {
            document.getElementById("clasesP2").innerHTML = "<p>No hay clases creadas.</p>";
            document.getElementById("clasesP2").style.display = "flex";
            document.getElementById("clasesP2").style.justifyContent = "center";
        }

        if (this.state.DataClaseI.length == 0) {
            document.getElementById("contidU2").innerHTML = "<p>No participas en ningúna clase.</p>"
            document.getElementById("contidU2").style.display = "flex";
            document.getElementById("contidU2").style.justifyContent = "center";
        }*/
        document.getElementById("carga").style.display = "none";
    }
    componentDidUpdate = () => {
        document.getElementById("carga").style.display = "none";
    }
    /*METODOS SIMPLES*/
    /*Permite ocultar y/o mostrar las clases creadas*/
    Accion1 = () => {
        if (!bool) {
            document.getElementById("clasesP2").style.display = "flex";
            document.getElementById("ClasesC").value = "Clases creadas ▼";
            if (this.state.DataClase.length == 0) {
                document.getElementById("clasesP2").style.display = "flex";
                document.getElementById("clasesP2").style.justifyContent = "center";
                document.getElementById("clasesP2").innerHTML = "<p>No hay clases creadas.</p>";
            }
            bool = true
        } else {
            document.getElementById("ClasesC").value = "Clases creadas ►"
            document.getElementById("clasesP2").style.display = "none";
            bool = false
        }
    }
    /*Permite ocultar y/o mostrar las clases inscritas*/
    Accion2 = () => {
        if (!bool2) {
            document.getElementById("contidU2").style.display = "flex";
            document.getElementById("ClasesP").value = "Clases inscritas ▼";
            if (this.state.DataClaseI.length == 0) {
                document.getElementById("contidU2").style.display = "flex";
                document.getElementById("contidU2").style.justifyContent = "center";
                document.getElementById("contidU2").innerHTML = "<p>No participas en ningúna clase.</p>";
            }
            bool2 = true
        } else {
            document.getElementById("ClasesP").value = "Clases inscritas ►"
            document.getElementById("contidU2").style.display = "none";
            bool2 = false
        }
    }
    /*Este metodo hace el switch del modal en celular*/
    Switch = () => {
        let titl1 = document.getElementById("DisPrimero");
        if (titl1.style.display == "none" || titl1.style.display == "") {
            document.getElementById("DisSegundo").style.display = "none";
            titl1.style.display = "block";
            document.getElementById("PopUp1Apar").style.display = "block";
            document.getElementById("PopUp2Apar").style.display = "none";
        } else {
            document.getElementById("DisSegundo").style.display = "block";
            titl1.style.display = "none";
            document.getElementById("PopUp1Apar").style.display = "none";
            document.getElementById("PopUp2Apar").style.display = "grid";
        }
    }
    /*MODAL1*/
    /*Metodo que determina si el modal 1 se pinta o no*/
    Modal1 = () => {
        this.setState({
            Modal1: !this.state.Modal1,
            UsuariosCrearClase: [],
            CrearClase: []
        })
    }
    /*Metodo que retorna el modal 1*/
    Modal1Return = () => {
        if (this.state.Modal1) {
            return (
                <div className="Modal1ClasesR">
                    <div className="DisCom BotonesMoverCel">
                        <button className="BotonFlechita" onClick={() => this.Switch()}>◄</button>
                        <p id="DisSegundo">Crear clase</p>
                        <p id="DisPrimero">Unirse a una clase</p>
                        <button className="BotonFlechita" onClick={() => this.Switch()}>►</button>
                    </div>
                    <div className="PopUp2_ AparCom2" id="PopUp1Apar">
                        <div className="titleModal1Class DisCel">
                            <h2 className="titleModal1ClasH2">Unirse a una clase</h2>
                        </div>
                        <div className="ContainerPopUp2">
                            <div className="infoContainerModalClass">
                                <div className="infoContainerModalClass2">
                                    <p>Si quieres unirte a una clase debes ingresar la id de la clase y esperar que el creador acepte la petición de unirte o pedirle al creador que te una y debes aceptar la invitación a unirse.</p>
                                </div>
                            </div>
                            <div className="Group GroupC3">
                                <div>
                                    <div>
                                        <p className="Group">Id clase</p>
                                        <input type="text" className="inputCrearClase Group" id="UsuarioClase2" autoComplete="off" />
                                    </div>
                                </div>
                                <input type="button" className="inputCrearClase2" onClick={this.SubirUsuario2} />
                            </div>
                            <button className="BotonMadreClase bmargintop" onClick={this.Modal1}>Cancelar</button>
                        </div>
                    </div>
                    <div className="PopUp1_ AparCom" id="PopUp2Apar">
                        <div className="titleModal1Class titleModal1Class2 DisCel">
                            <h2 className="titleModal1ClasH2">Crear clase</h2>
                        </div>
                        <div id="PopUpPart1">
                            <div className="GroupC">
                                <p className="Group">Nombre</p>
                                <input type="text" id="NombreClase" className="Group inputCrearClase" autoComplete="off" onChange={() => {
                                    let valor = document.getElementById("NombreClase");
                                    if (valor.value.length >= 50) {
                                        valor.value = valor.value.substring(0, 49);
                                    }
                                }} />
                            </div>
                            <div className="GroupC">
                                <p className="Group">Usuario</p>
                                <div className="CositaCambiar">
                                    <input type="text" className="inputCrearClase3" id="UsuarioClase" autoComplete="off" />
                                    <input type="button" className="inputCrearClase2_" onClick={this.SubirUsuario1} />
                                </div>
                            </div>
                            <div className="GroupC">
                                <p className="Group">¿Quieres que los usuarios se puedan unir a tu clase sin consentimiento?</p>
                                <select className="Group selectCrearClaseOption" id="SelectCrearClase">
                                    <option value="null">Seleccionar</option>
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </select>
                            </div>
                        </div>
                        <div id="PopUpPart2">
                            <div id="UsuariosIN">
                            </div>
                        </div>
                        <div id="XimageCrearClase">
                            <button onClick={this.Modal1} className="BotonMadreClase">Cancelar</button>
                            <button onClick={this.CrearClase2} className="BotonMadreClase">Aceptar</button>
                        </div>
                    </div>
                </div>
            );
        }

    }
    /*MODAL2*/
    /*Metodo que determina si el modal 2 se pinta o no*/
    Modal2 = (prop) => {
        this.setState({
            Modal2: !this.state.Modal2,
            ModalClase: prop
        })
    }
    /*Metodo que retorna el modal 2*/
    Modal2Return = () => {
        if (this.state.Modal2) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp2">
                            <div className="TitleModal1Perfíl3">
                                <h2>¿Estas seguro de que quieres eliminar la clase?</h2>
                            </div>
                            <div className="MainModal2Perfíl">
                                <div className="BotonesCont">
                                    <button className="button SubImg2" onClick={() => { this.deleteClase() }}>Si</button>
                                    <button className="button SubImg2" onClick={() => this.Modal2(0)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    /*MODAL3*/
    /*Metodo que determina si el modal 3 se pinta o no*/
    Modal3 = (prop, prop2) => {
        this.setState({
            Modal3: !this.state.Modal3,
            ModalClase: prop,
            Modalconusu: prop2
        })
    }
    /*Metodo que retorna el modal 3*/
    Modal3Return = () => {
        if (this.state.Modal3) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp2">
                            <div className="TitleModal1Perfíl3">
                                <h2>¿Estas seguro de que quieres salirte de la clase?</h2>
                            </div>
                            <div className="MainModal2Perfíl">
                                <div className="BotonesCont">
                                    <button className="button SubImg2" onClick={() => { this.Salirclase() }}>Si</button>
                                    <button className="button SubImg2" onClick={() => this.Modal3(0, 0)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    /*METODOS DE CREACIÓN DE CLASE*/
    /*Este metodo sirve para subir los usuarios que se desean agregar a una clase*/
    SubirUsuario1 = async () => {
        let UsaurioSubir = document.getElementById("UsuarioClase");
        if (UsaurioSubir.value == "") {
            this.Time(UsaurioSubir, "text", "Dato vacio.");
        } else {
            let inner = document.getElementById("UsuariosIN").innerHTML;
            await this.getUsuarioNotifi(UsaurioSubir);
            if (this.state.CrearClase.length > 0) {
                if (UsaurioSubir.value.toLowerCase() == UsuarioI[0].usuario.toLowerCase()) {
                    this.Time(UsaurioSubir, "text", "Dato invalido");
                } else {
                    let UsuariosSubir = this.state.UsuariosCrearClase;
                    inner = inner + '<div class="Etiqueta"><p>Usuario:' + UsaurioSubir.value + '</p></div>';
                    document.getElementById("UsuariosIN").innerHTML = inner;
                    UsuariosSubir.push({
                        id: this.state.CrearClase[0].id_usuario,
                        usuario: UsaurioSubir.value
                    });
                    document.getElementById("UsuarioClase").value = "";
                    this.setState({
                        UsuariosCrearClase: UsuariosSubir
                    });
                }
            } else {
                this.Time(UsaurioSubir, "text", "Usuario invalido");
            }
        }
    }
    /*Este metodo sirve para crear una clase*/
    CrearClase2 = () => {
        let Nombre = document.getElementById("NombreClase");
        let auto_u = document.getElementById("SelectCrearClase");
        if (Nombre.value == "" || auto_u.value == "null") {
            if (Nombre.value == "") {
                this.Time(Nombre, "text", "Dato sin ingresar");
            } if (auto_u.value == "null") {
                auto_u.style.border = "2px solid #ff595e";
                setTimeout(function () {
                    auto_u.style.border = "1px solid black";
                }, 1500);
            }
        } else {
            let Fecha = new Date();
            let FechaY = Fecha.getFullYear();
            let FechaM = (Fecha.getMonth().toString()).padStart(2, 0);
            let FechaD = (Fecha.getDate().toString()).padStart(2, 0);
            let FechaH = FechaY + "-" + FechaM + "-" + FechaD + " ";
            let Horas = "" + (Fecha.getHours().toString()).padStart(2, 0);
            let minutos = "" + (Fecha.getMinutes().toString()).padStart(2, 0);
            let seconds = "" + (Fecha.getSeconds().toString()).padStart(2, 0);
            newDate = FechaH + Horas + ":" + minutos + ":" + seconds;
            let form = {
                titulo: Nombre.value,
                id_creador: UsuarioI[0].id_usuario,
                fecha_c: newDate,
                auto_u: auto_u.value
            }
            this.postNewClase(form);
        }
    }
    SubirUsuario2 = async () => {
        let i = document.getElementById("UsuarioClase2");
        if (i.value != "") {
            let clase = await this.getClaseForId(i.value);
            let bool = false;
            if (clase.data.length > 0) {
                if (clase.data[0].id_creador != UsuarioI[0].id_usuario) {
                    for (let x = 0; x < this.state.DataClaseI.length && !bool; x++) {
                        if (i.value == this.state.DataClaseI[x].id_clase) {
                            bool = true;
                        }
                    }
                    let notifi = await this.getNotificurso(i.value);
                    if (notifi.data[0].conteo == 0) {
                        if (clase.data[0].auto_u == 0) {
                            if (!bool) {
                                this.postNotificaciones0(clase.data[0].id_creador, i.value, clase.data[0].titulo, clase.data[0].usuario);
                            } else {
                                this.Time(i, "text", "Ya participas ahí");
                            }
                        } else {
                            if (!bool) {
                                this.postNewUsuarioClase(clase.data[0].id_clase);
                            } else {
                                this.Time(i, "text", "Ya participas ahí");
                            }
                        }
                    } else {
                        this.Time(i, "text", "Pendiente")
                    }
                } else {
                    this.Time(i, "text", "Dato invalido")
                }
            } else {
                this.Time(i, "text", "Dato invalido");
            }
        } else {
            this.Time(i, "text", "Dato sin ingresar");
        }
    }
    /*AXIOS*/
    /*GETS*/
    /*Este get trae las clases creadas*/
    getClasesC = async () => {
        await axios.get(`http://localhost:3883/Cla/Get-Clases-Creadas/${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.filtrando(res.data);
            }).catch(err => {
                console.error(err);
            })
    }
    /*Este get trae las clases inscritas*/
    getClasesI = async () => {
        await axios.get(`http://localhost:3883/UsuCla/get-usario_claseJOINclases-todo/${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.filtrandoI(res.data);
            }).catch(err => {
                console.error(err);
            })
    }
    /*Este get trae u nusuari por su nickname para programar su notificación*/
    getUsuarioNotifi = async (prop) => {
        let variable = prop.value.toLowerCase();
        await axios.get(`http://localhost:3883/Usu/get_clases_usuario-id/clases/${variable}`)
            .then(res => {
                this.setState({
                    CrearClase: res.data
                });
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*Este get trae un 1 si ya tenemos alguna invitacion de la case 0 si no*/
    getNotificurso = (prop) => {
        return axios.get(`http://localhost:3883/Not/get_notificaciones_uclase/clases/${prop}&${UsuarioI[0].id_usuario}`)
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Este get trae una clase por ID*/
    getClaseForId = async (prop) => {
        return axios.get(`http://localhost:3883/Cla/Get-Clases-id_Min/clases/${prop}`)
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Este get trae la id de una clase a partir de su fecha*/
    getFechaClase = async (prop) => {
        await axios.get(`http://localhost:3883/Cla/Get-Clases-id/clases/${newDate}&${UsuarioI[0].id_usuario}`)
            .then(res => {
                let data = res.data;
                this.postNotificaciones1(data[0].id_clase, prop);
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*PUTS*/
    /*Este put permite actualizar la cantidad de usaurios de una clase*/
    putUsariosClase = async () => {
        axios.put(`http://localhost:3883/Cla/Put-Clases-cantidad_usuarios/Clases/${this.state.ModalClase}`)
            .then(res => {
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*POST*/
    /*Este post sirve para crear una clase nueva*/
    postNewClase = async (form) => {
        await axios.post(`http://localhost:3883/Cla/Post-Clases-NuevaClase`, form)
            .then(res => {
                if (this.state.UsuariosCrearClase.length > 0) {
                    this.getFechaClase(form.titulo);
                } else {
                    this.getClasesC();
                    this.setState({
                        Modal1: !this.state.Modal1,
                        CrearClase: [],
                        UsuariosCrearClase: []
                    });
                }
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*Este post sirve para unirse a una clase*/
    postNewUsuarioClase = async (id_clase) => {
        document.getElementById("carga").style.display = "block";
        let Fecha = new Date();
        let FechaY = Fecha.getFullYear();
        let FechaM = (Fecha.getMonth().toString()).padStart(2, 0);
        let FechaD = (Fecha.getDate().toString()).padStart(2, 0);
        let FechaH = FechaY + "-" + FechaM + "-" + FechaD;
        let form = await {
            id_usuario: UsuarioI[0].id_usuario,
            id_clase: id_clase,
            fecha_u: FechaH
        }
        axios.post(`http://localhost:3883/UsuCla/post-usuario_clase-Info/Clases`, form)
            .then(res => {
                this.state.ModalClase = id_clase;
                this.putUsariosClase();
                this.getClasesI();
                this.setState({
                    Modal1: false,
                    UsuariosCrearClase: [],
                    CrearClase: []
                });
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*POST*/
    /*Este post sirve para crear las notificaciones de los usuarios que se agregan en la creación de clases*/
    postNotificaciones1 = async (id_clase, prop) => {
        for (let i = 0; i < this.state.UsuariosCrearClase.length; i++) {
            let form = {
                id_clase: id_clase,
                id_creador_clase: UsuarioI[0].id_usuario,
                id_otro_usuario: this.state.UsuariosCrearClase[i].id,
                titulo_clase: prop,
                usuario: UsuarioI[0].usuario,
                tipo_notificacion: 1,
                usuario2: this.state.UsuariosCrearClase[i].usuario
            }
            axios.post(`http://localhost:3883/Not/post_notificaciones_info/Clases`, form)
                .then(res => {

                }).catch(err => {
                    if (err) {
                        console.error(err);
                    }
                });
        }
        this.Modal1();
        this.getClasesC();
    }
    /*Este post sirve para crear las notificaciones de los usuarios que se quieran unir a una clase*/
    postNotificaciones0 = async (id_creador, id_clase, titulo_clase, usuario) => {
        let form = {
            id_clase: id_clase,
            id_creador_clase: id_creador,
            id_otro_usuario: UsuarioI[0].id_usuario,
            tipo_notificacion: 0,
            usuario: UsuarioI[0].usuario,
            titulo_clase: titulo_clase,
            usuario2: usuario
        }
        axios.post(`http://localhost:3883/Not/post_notificaciones_info/Clases`, form)
            .then(res => {
                this.Modal1();
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*DELETES*/
    /*Elimina clases creadas*/
    deleteClase = async () => {
        await axios.delete(`http://localhost:3883/Cla/Delete-Clases-todo/Clases/${this.state.ModalClase}`)
            .then(res => {
                this.getClasesC();
                this.setState({
                    Modal2: false
                });
            })
            .catch(err => {
                console.log(err);
            })


    }
    /*Permite salirse de una clase en la que se participa*/
    Salirclase = async () => {
        document.getElementById("carga").style.display = "block";
        await axios.delete(`http://localhost:3883/UsuCla/Delete-Clases-todo/Clases/${this.state.ModalClase}&${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.putUsariosClase();
                this.getClasesI();
                this.setState({
                    Modal3: false
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    /*METODOS DE PAGINACIÓN Y FILTRADO de las clases creadas*/
    /*Este metodo realiza la paginación y el filtrado de las clases creadas*/
    filtrando = (prop) => {
        let filtrado;
        let tamaño;
        let filtro = document.getElementById("filt").value;
        let tam = 3;
        if (filtro == "") {
            let x = Math.ceil(prop.length / tam);
            filtrado = prop.reverse();
            tamaño = x;

        } else {
            let arrays1 = prop.filter(Esito => ("" + Esito.cont_usuarios).toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || Esito.titulo.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || (new Date(Esito.fecha_c).toLocaleDateString()).includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()));
            let x = Math.ceil(arrays1.length / tam);
            filtrado = arrays1.reverse();
            tamaño = x;
        }

        let cont = 0;
        let arrays = [];
        for (let i = 0; i < tamaño; i++) {
            let array2 = [];
            for (let j = 0; j < tam && cont < filtrado.length; j++) {
                array2.push(filtrado[cont]);
                cont++;
            }
            arrays.push(array2);
        }
        if (arrays[0]) {
            this.setState({
                DataClasef: filtrado,
                tamaño: tamaño,
                array: arrays,
                actual: arrays[0],
                DataClase: prop,
                posicion: 0,
                despaginar: 0
            });
        } else {
            this.setState({
                DataClasef: filtrado,
                tamaño: tamaño,
                array: arrays,
                actual: [],
                DataClase: prop,
                posicion: 0,
                despaginar: 0
            });
        }
    }
    /*Determina renderizado de la flecha a la izquierda de las clases creadas*/
    flech = () => {
        if (this.state.despaginar == 0) {
            this.state.despaginar = 1;
        }
        if (this.state.despaginar == this.state.tamaño - 1) {
            this.state.despaginar = this.state.tamaño - 2;
        }
        if (this.state.despaginar != 1 && this.state.tamaño > 3) {
            return (
                <input className="botonescamb" type="button" value="◄" onClick={() => {
                    this.setState({
                        despaginar: this.state.despaginar - 1
                    });
                }} />
            );
        }
    }
    /*Determina renderizado de la flecha a la derecha de las clases creados*/
    flech2 = () => {

        if (this.state.despaginar != this.state.tamaño - 2 && this.state.tamaño > 3) {
            return (
                <input className="botonescamb" type="button" value="►" onClick={() => {
                    this.setState({
                        despaginar: this.state.despaginar + 1
                    });
                }} />
            );
        }
    }
    /*Metodo que determina el final de la paginación de las clases creadas*/
    final = () => {
        if (this.state.posicion >= this.state.tamaño - 1) {
            return (<div><p>No hay mas clases para mostrar</p></div>);
        }
    }
    /*METODOS DE PAGINACIÓN Y FILTRADO de las clases inscritas*/
    /*Este metodo realiza la paginación y el filtrado de las clases inscritas*/
    filtrandoI = (prop) => {
        let filtrado;
        let tamaño;
        let filtro = document.getElementById("filt").value;
        let tam = 3;
        if (filtro == "") {
            let x = Math.ceil(prop.length / tam);
            filtrado = prop.reverse();
            tamaño = x;
        } else {
            let arrays1 = prop.filter(Esito => ("" + Esito.cont_usuarios).toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || Esito.titulo.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || (new Date(Esito.fecha_c).toLocaleDateString()).includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || Esito.usuario.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()));
            let x = Math.ceil(arrays1.length / tam);
            filtrado = arrays1.reverse();
            tamaño = x;
        }

        let cont = 0;
        let arrays = [];
        for (let i = 0; i < tamaño; i++) {
            let array2 = [];
            for (let j = 0; j < tam && cont < filtrado.length; j++) {
                array2.push(filtrado[cont]);
                cont++;
            }
            arrays.push(array2);
        }
        if (arrays[0]) {
            this.setState({
                DataClaseIF: filtrado,
                tamañoI: tamaño,
                arrayI: arrays,
                actualI: arrays[0],
                DataClaseI: prop,
                posicionI: 0,
                despaginarI: 0
            });
        } else {
            this.setState({
                DataClaseIF: filtrado,
                tamañoI: tamaño,
                arrayI: arrays,
                actualI: [],
                DataClaseI: prop,
                posicionI: 0,
                despaginarI: 0
            });
        }
    }
    /*Determina renderizado de la flecha a la izquierda de las clases incritas*/
    flechI = () => {
        if (this.state.despaginarI == 0) {
            this.state.despaginarI = 1;
        }
        if (this.state.despaginarI == this.state.tamañoI - 1) {
            this.state.despaginarI = this.state.tamañoI - 2;
        }
        if (this.state.despaginarI != 1 && this.state.tamañoI > 3) {
            return (
                <input className="botonescamb" type="button" value="◄" onClick={() => {
                    this.setState({
                        despaginarI: this.state.despaginarI - 1
                    });
                }} />
            );
        }
    }
    /*Determina renderizado de la flecha a la derecha de las clases incritas*/
    flech2I = () => {

        if (this.state.despaginarI != this.state.tamañoI - 2 && this.state.tamañoI > 3) {
            return (
                <input className="botonescamb" type="button" value="►" onClick={() => {
                    this.setState({
                        despaginarI: this.state.despaginarI + 1
                    });
                }} />
            );
        }
    }
    /*Metodo que determina el final de la paginación de las clases inscritas*/
    finalI = () => {
        if (this.state.posicionI >= this.state.tamañoI - 1) {
            return (<div><p>No hay mas clases para mostrar</p></div>);
        }
    }
    /*TIMER PARA ALERTAS Y DATOS ERRADOS*/
    Time = (Propi, Propi2, Propi3) => {
        Propi.type = "text";
        Propi.style.color = "red";
        Propi.value = Propi3;
        Propi.style.border = "2px solid #ff595e";
        setTimeout(function () {
            Propi.type = Propi2;
            Propi.style.color = "black";
            Propi.value = "";
            Propi.style.border = "1px solid black";
        }, 1500)
    }
    render() {
        return (
            <>
                {this.Modal1Return()}
                {this.Modal2Return()}
                {this.Modal3Return()}
                <div className="Cargando" id="carga"></div>
                <div className="contM5">
                    <div className="buscadorClases">
                        <div className="filtroClasesSearch">
                            <div className="filtroClasesSearch2">
                                <input type="text" id="filt" autoComplete="off" className="FiltrosC2 buscadorClases2" onChange={async () => { this.filtrando(this.state.DataClase); this.filtrandoI(this.state.DataClase) }} placeholder="buscar"></input>
                            </div>
                        </div>
                        <div className="BotonMore">
                            <img className="BotonMoreImage" src="/Images/Mas.png" onClick={() => this.Modal1()} />
                        </div>
                    </div>
                    <div className="franja">
                        <div id="infop">
                            <div className="ButtonMisCursosC">
                                <input type="button" value="Clases creadas ▼" id="ClasesC" onClick={this.Accion1} />
                            </div>
                            <div id="clasesP">

                                <div id="clasesP2">
                                    {this.state.actual?.map((Esito, Index) => {
                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3 className="TitleCardClase">{Esito.titulo}</h3>
                                                    <div className="botoclassCreados">
                                                        <img className="botoneliminar" src="./images/Basura.png" onClick={() => this.Modal2(Esito.id_clase)} />
                                                        <Link to={{ pathname: "/Clase", state: { InfoClass: Esito, return: "/Clases" } }}><input type="button" value="Ir" /></Link>
                                                    </div>
                                                </div>
                                                <div className="botoncard">
                                                    <h4 className="FechaCClase">Fecha de creacion: <br />
                                                        {new Date(Esito.fecha_c).toLocaleDateString()}
                                                    </h4>
                                                    <div className="InfoClassCard">
                                                        <h4 className="InfoClassCardConte ">Usuarios: {Esito.cont_usuarios}</h4>
                                                        <h4 className="InfoClassCardConte">Id: {Esito.id_clase}</h4>
                                                    </div>

                                                </div>
                                            </div>
                                        </>);
                                    })}
                                    {this.final()}
                                    <div id="Paginacion2">
                                        {this.flech()}
                                        {this.state.array?.map((Esito, index) => {
                                            try {
                                                const f = index;
                                                if (f != this.state.posicion && (this.state.despaginar == f || this.state.despaginar == f - 1 || this.state.despaginar == f + 1)) {
                                                    return (<><input key={index} className="botonescamb" type="button" value={f + 1} onClick={() => {
                                                        this.setState({
                                                            posicion: f,
                                                            despaginar: f,
                                                            actual: this.state.array[f]
                                                        });
                                                    }} /></>);

                                                } else if (this.state.despaginar == f || this.state.despaginar == f - 1 || this.state.despaginar == f + 1) {
                                                    return (<><input key={index} className="botonescamb2" type="button" value={f + 1} /></>);
                                                }
                                            } catch (err) { }
                                        })}
                                        {this.flech2()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="conclases">

                            <div className="ButtonMisCursosC">
                                <input type="button" value="Clases inscritas ▼" id="ClasesP" onClick={this.Accion2} />
                            </div>
                            <div id="contidU">
                                <div id="contidU2">
                                    {this.state.actualI.map((Esito, Index) => {
                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3 className="TitleCardClase">{Esito.titulo}</h3>
                                                    <div className="botoclassCreados">
                                                        <img className="botoneliminar" src="./images/Salir.png" onClick={() => this.Modal3(Esito.id_clase, Esito.cont_usuarios)} />
                                                        <Link to={{ pathname: "/Clase", state: { InfoClass: Esito, return: "/Clases" } }}><input type="button" value="Ir" /></Link>
                                                    </div>
                                                </div>
                                                <div className="botoncard">
                                                    <h4 className="FechaCClase">Fecha de creacion:<br />
                                                        {new Date(Esito.fecha_c).toLocaleDateString()}
                                                    </h4>
                                                    <div className="InfoClassCard">
                                                        <h4 className="InfoClassCardConte ">Usuarios: {Esito.cont_usuarios}</h4>
                                                        <h4 className="InfoClassCardConte">Id: {Esito.id_clase}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </>);
                                    })}
                                    {this.finalI()}
                                    <div id="PaginacionI">
                                        {this.flechI()}
                                        {this.state.arrayI?.map((Esito, index) => {
                                            try {
                                                const f = index;
                                                if (f != this.state.posicionI && (this.state.despaginarI == f || this.state.despaginarI == f - 1 || this.state.despaginarI == f + 1)) {
                                                    return (<><input key={index} className="botonescamb" type="button" value={f + 1} onClick={() => {
                                                        this.setState({
                                                            posicionI: f,
                                                            despaginarI: f,
                                                            actualI: this.state.arrayI[f]
                                                        });
                                                    }} /></>);

                                                } else if (this.state.despaginarI == f || this.state.despaginarI == f - 1 || this.state.despaginarI == f + 1) {
                                                    return (<><input key={index} className="botonescamb2" type="button" value={f + 1} /></>);
                                                }
                                            } catch (err) { }
                                        })}
                                        {this.flech2I()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main5);
