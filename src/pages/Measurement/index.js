import * as React from 'react';
import { Body, ContainerRules, InputText, Container2, ContainerEditAccordion, GreenBox, RedBox } from './styles';
import { backgroundMenu } from '../../Globals/globals'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Header from '../../components/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { atualizarWebhook, sendImage, sendMessageAll, sendMessageWitchButton, setNewClient } from '../../services';
import base64 from 'base-64';
import { getDatabase, ref, set, push, get, child, onValue, update } from "firebase/database";
import { database } from '../../App';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';
import AccountBoxOutlined from '@mui/icons-material/AccountBoxOutlined';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/database";
import { dataInstance } from '../../services';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from "@mui/material"; // Certifique-se de ter os componentes do Material-UI instalados
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';





const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const style = {
    height: 270,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleModalRegister = {
    maxHeight: '100vh',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 1,
    overflowY: 'auto'
};

const styleModalList = {
    height: '86%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 1
};


const actions = [
    { icon: <AccountBoxOutlined style={{ color: '#42adda', backgroundColor: '#42adda' }} />, name: 'Cadastrar Lanche' },

];


const employees = ["Carlos", "Maria", "João", "Ana", "Pedro"];
const workHours = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];




const Measurement = () => {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [openList, setOpenList] = React.useState(false);
    const [datarow, setDataRow] = React.useState(false);
    const [datarowSelection, setDataRowSelection] = React.useState('');
    const [messageAll, setMessageAll] = React.useState('');
    const [farmaceutico, setFarmaceutico] = React.useState('');
    const [dataClientes, setDataClientes] = React.useState([]);
    const [clientesRecompra, setClientesRecompra] = React.useState([]);
    const [agendamentoData, setAgendamento] = React.useState({
        time: '',
        employee: ''
    });
    const [time, setTime] = React.useState('');
    const [formattedTime, setFormattedTime] = React.useState('');
    const [date, setDate] = React.useState('');
    const [filteredData, setFilteredData] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState('');
    const [user, setUser] = React.useState(false);
    const [novaData, setNovaData] = React.useState(null);
    const [clientForTime, setClientforTime] = React.useState([{ clientes: [] }]);
    const [connectednumber, setConnectedNumber] = React.useState(false);
    const [userData, setUserData] = React.useState({ msgCadastro: '', msgHorario: '' });
    const listRef = React.useRef(null);
    const [paymentState, setPaymentState] = React.useState({ assinatura: false });
    const [dataRowRecompra, setDataRowRecompra] = React.useState('');
    const [valorRecompra, setValorRecompra] = React.useState('');
    const [relatorio, setRelatorio] = React.useState('');

    const [valorRecompraNegativo, setValorNegativoRecompra] = React.useState(false);
    const [messageDataUser, setMessageDataUser] = React.useState(false);
    const [paymentLinks, setPaymentLinks] = React.useState([]);

    const isMobile = useMediaQuery('(max-width:600px)');

    const [bookedAppointments, setBookedAppointments] = React.useState([]);
    const [availableTimes, setAvailableTimes] = React.useState([]);
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);
    const [userMessage, setUserMessage] = React.useState("");
    const [nextBooked, setNextBooked] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState(null);





    const ContainerT = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width:90%
  padding: 20px;
  align-items:center;
  justify-content:center;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;



    const Card = styled.div`
  background-color: #0073b1;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

    const CardR = styled.div`
background-color: #42adda;
color: white;
padding: 20px;
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
text-align: center;
transition: transform 0.3s;

&:hover {
  transform: translateY(-5px);
}
`;

    const TitleT = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

    const Value = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
`;

    const Percentage = styled.div`
  font-size: 1.2rem;
  color: #28a745;
  margin-top: 10px;
`;

    const CardT = styled.div`
  display: flex;
  align-items: center;
  background: #e3f2fd;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  font-family: Arial, sans-serif;
  transition: transform 0.3s ease-in-out;
  width:80%

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width:80%;
  }
`;

    const Icon = styled.div`
  background: #64b5f6;
  padding: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-size: 26px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

    const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

    const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #1565c0;
  font-weight: bold;
`;

    const Time = styled.p`
  margin: 5px 0 0;
  font-size: 16px;
  color: #424242;
  font-weight: 500;
`;

    const Details = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #616161;
  font-style: italic;
`;




    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenRegister = () => setOpenRegister(true);
    const handleCloseRegister = () => setOpenRegister(false);

    const handleOpenList = () => setOpenList(true);
    const handleCloseList = () => setOpenList(false);
    const columns = [
        { field: 'id', headerName: 'id', width: 150 },
        { field: 'nome', headerName: 'Nome', width: 130 },
        { field: 'employee', headerName: 'Quem Atende', width: 150 },
        { field: 'time', headerName: 'Horário', width: 130 },
        { field: 'phone', headerName: 'Contato', width: 150 }

    ];


    const services = [
        { nome: "Corte de Cabelo", preco: "R$30" },
        { nome: "Barba", preco: "R$20" },
        { nome: "Corte + Barba", preco: "R$45" }
      ];


    const data = [
        { title: "Agendamentos Hoje", value: relatorio ? relatorio.clientes : 0, percentage: "+0%" },
        { title: "Agendamentos atendidos", value: /*dataClientes ? dataClientes.length : 0*/ 0, percentage: "+0%" },
        { title: "Confirmaram Presença", value:/* `R$ ${relatorio ? relatorio.valorTotalM.toFixed(2).replace('.', ',') : 0}`*/'00', percentage: "+0%" },

        { title: "Receita", value: /*`R$ ${valorRecompra ? valorRecompra.valor.toFixed(2).replace('.', ',') : 0}`*/'R$380,00', percentage: "+0%" },
    ];

    const paginationModel = { page: 0, pageSize: 5 };



    async function dataInstanceValue() {
        const idi = '3DF85F68FCF5A06C6FC54E20A388CB1E';  
        
        const tokeni = '2A3697C85B20EEA9D47FCA97';

        try {
            const response = await dataInstance(idi, tokeni); // Aguarda a função retornar o resultado
            console.log('DATAAQUI:::::::', response)
            if (response.connected) {
                setConnectedNumber(true)
            } else {
                setConnectedNumber(false)
            }
        } catch (error) {
            console.error('TRYCAYCHERROR:::::QRCODE:::', error); // Lida com erros
        }
    }


    const handleRowSelection = (selectionModel) => {
        // Pegar os dados das linhas selecionadas
        const selectedRowsData = filteredData.filter((row) => selectionModel.includes(row.id));
        setDataRow(selectedRowsData);

        console.log('Linhas selecionadas:', selectedRowsData);
    };

    const handleRowRecompra = (selectionModel) => {
        // Pegar os dados das linhas selecionadas
        const selectedRowsData = clientesRecompra.filter((row) => selectionModel.includes(row.id));
        setDataRowRecompra(selectedRowsData);

        console.log('Linhas selecionadas:', selectedRowsData);
    };

    const rowSelectedRecompra = async () => {
        const db = getDatabase();

        if (user) {
            try {
                const totalValor = dataRowRecompra.reduce((soma, item) => {
                    return soma + Number(item.valorMedicamento);
                }, 0); // Inicia com 0 como valor base

                // Certifica-se de que totalValor esteja no formato 00.00
                const totalValorFormatado = parseFloat(totalValor.toFixed(2));

                // Caminho no banco de dados
                const userPath = `${base64.encode(user.email)}/relatorios/recompra`;
                const dbRef = ref(db, userPath);

                // Busca o valor atual do banco de dados
                const snapshot = await get(dbRef);

                let valorAtual = 0;
                if (snapshot.exists()) {
                    valorAtual = Number(snapshot.val().valor);
                }

                // Certifica-se de que valorAtual esteja no formato 00.00
                valorAtual = parseFloat(valorAtual.toFixed(2));

                const novoValor = valorAtual + totalValorFormatado;

                // Certifica-se de que novoValor esteja no formato 00.00
                const novoValorFormatado = parseFloat(novoValor.toFixed(2));

                // Prepara o objeto para atualização
                const post = {
                    valor: novoValorFormatado, // Novo valor somado e formatado
                };

                // Atualiza o banco de dados
                await update(ref(db), { [userPath]: post });
                console.log('VALOR ALTERADO:', novoValorFormatado);

                dataRowRecompra.map((item) => {
                    if (user) {

                        const post = {
                            nome: item.nome,
                            cpf: item.cpf,
                            contato: item.contato,
                            acabaEm: '05/02/2025',
                            doses: item.doses,
                            remedio: item.remedio,
                            horario: item.horario,
                            dataCadastro: item.dataCadastro,
                            receita: true,
                            usoContinuo: item.usoContinuo,
                            msgUsoContinuo: item.msgUsoContinuo || '',
                            msgReceita: item.msgReceita || '',
                            digit: item.digit,
                            fotoUrl: item.fotoUrl,
                            valorMedicamento: item.valorMedicamento
                        }

                        const updates = {};
                        updates[`${base64.encode(user.email)}/clientes/${base64.encode(item.cpf + item.digit + item.remedio)}`] = post;
                        update(ref(db), updates).then(log => console.log(log)).catch(log => window.alert('Verifique sua conexão com a internet'))
                    }
                })


            } catch (error) {
                console.error('Erro ao atualizar o valor:', error);
                window.alert(error);
            }
        } else {
            console.error("Usuário não autenticado.");
        }
    }

    React.useEffect(() => {
        const db = getDatabase()
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                const db = getDatabase();
                const appointmentsRef = ref(db, `${base64.encode(user.email)}/agendamentos`);

                const unsubscribe = onValue(appointmentsRef, (snapshot) => {
                    const data = snapshot.val();
                    const formatted = data
                        ? Object.values(data).map((appt) => ({
                            time: appt.time,
                            employee: appt.employee,
                            time: appt.time,
                            id: appt.id,
                            phone: appt.phone,
                            nome: appt.nome
                        }))
                        : [];
                    setBookedAppointments(formatted);
                    dataInstanceValue()
                });

                return () => unsubscribe();
            }
        }
        )

    }, [])

    React.useEffect(() => {
        const instancia = "3DF85F68FCF5A06C6FC54E20A388CB1E"; // Substitua pelo ID da instância
        const token = "2A3697C85B20EEA9D47FCA97"; // Substitua pelo token
        const novaUrlWebhook = "https://backendpedro.vercel.app/webhook";

        const atualizarWebhook = async () => {
            try {
                const resposta = await fetch(
                    `https://api.z-api.io/instances/${instancia}/token/${token}/update-webhook-received`,
                    {
                        method: "PUT",
                        headers: {
                            "Client-Token": "F13df36a5b98f4b6f88d0101ae3b7e34aS",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ value: novaUrlWebhook }),
                    }
                );

                const dados = await resposta.json();
                console.log("✅ Webhook atualizado com sucesso:", dados);
            } catch (erro) {
                console.error("❌ Erro ao atualizar o webhook:", erro);
            }
        };

        const interval = setInterval(atualizarWebhook, 5000);

        return () => clearInterval(interval);
    }, []);


    React.useEffect(() => {
        const atualizar = async () => {
            try {
                const response = await fetch('https://backendpedro.vercel.app/dadosChat', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status} - ${response.statusText}`);
                }

                const result = await response.json();

                setMessageDataUser(result)
                setUserMessage(result.text.message)
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };



        const interval = setInterval(() => {
            atualizar();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    console.log(messageDataUser)





    console.log('EMAILUSUARIO:::::::::', user.email)
    React.useEffect(() => {
        if (bookedAppointments) {
            const freeTimes = workHours.filter((time) => {
                const availableEmployees = employees.filter(
                    (emp) =>
                        !bookedAppointments.some(
                            (appt) => appt.time === time && appt.employee === emp
                        )
                );
                return availableEmployees.length > 0;
            });

            setAvailableTimes(freeTimes);
        } else return null;
    }, [bookedAppointments]);


   React.useEffect(() => {
    if (userMessage.toLowerCase() === "agendar") {
        const bodyT = {
            phone: messageDataUser.phone,
            message: "Olá tudo bom aqui é do(a) ${ESTABELECIMENTO}, vejo que quer *agendar um horário*, você deseja *Agendar Agora* ou prefere *Falar com um Atendente*?",
            buttonList: {
                buttons: [
                    { id: "1", label: "Agendar Agora" },
                    { id: "2", label: "Falar com Atendente" }
                ]
            }
        };

        sendMessageWitchButton(bodyT);
    }

    else if (userMessage.toLowerCase() === "agendar agora") {
        const body = {
            message: `Qual a data desejada? (Digite no formato dia/mês: *Ex: 22/04*)`,
            phone: `+${messageDataUser.phone}`,
            delayMessage: 2
        };
        sendMessageAll(body);
    }

    else if (!selectedDate && /^\d{2}\/\d{2}$/.test(userMessage)) {
        setSelectedDate(userMessage);
    
        const buttons = availableTimes.map((time, index) => ({
            id: `${index + 1}`,
            label: time
        }));
    
        const body = {
            phone: `+${messageDataUser.phone}`,
            message: "Escolha um horário disponível abaixo para agendar:",
            buttonList: {
                buttons: buttons
            },
            delayMessage: 2
        };
    
        sendMessageWitchButton(body);
    }

    else if (availableTimes.includes(userMessage) && selectedDate && !selectedTime) {
        setSelectedTime(userMessage);

        // Enviar os serviços após escolher o horário
        const services = [
            { nome: "Corte de Cabelo", preco: "R$30" },
            { nome: "Barba", preco: "R$20" },
            { nome: "Corte + Barba", preco: "R$45" }
        ];

        const serviceButtons = services.map((servico, index) => ({
            id: `${index + 1}`,
            label: `${servico.nome} - ${servico.preco}`
        }));

        const serviceBody = {
            phone: `+${messageDataUser.phone}`,
            message: "Escolha um dos serviços disponíveis abaixo:",
            buttonList: {
                buttons: serviceButtons
            },
            delayMessage: 2
        };

        sendMessageWitchButton(serviceBody);
    }

    else if (selectedTime && selectedDate && !selectedEmployee && employees.includes(userMessage)) {
        const isEmployeeAvailable = Array.isArray(bookedAppointments) && !bookedAppointments.some(
            (appt) => appt.time === selectedTime && appt.date === selectedDate && appt.employee === userMessage
        );
        setSelectedEmployee(userMessage);

        if (isEmployeeAvailable) {
            const body = {
                message: `Agendamento Confirmado com ${userMessage} às ${selectedTime} no dia ${selectedDate}`,
                phone: `+${messageDataUser.phone}`,
                delayMessage: 2
            };

            const bodyError = {
                message: `Instabilidade para agendamentos por WhatsApp no momento com ${userMessage} às ${selectedTime} no dia ${selectedDate}`,
                phone: `+${messageDataUser.phone}`,
                delayMessage: 2
            };

            const db = getDatabase();
            set(ref(db, `${base64.encode(user.email)}/agendamentos/${base64.encode(messageDataUser.phone)}`), {
                time: selectedTime,
                date: selectedDate,
                employee: userMessage,
                id: messageDataUser.phone,
                phone: messageDataUser.phone,
                nome: messageDataUser.senderName
            }).then(() => sendMessageAll(body)).catch(() => sendMessageAll(bodyError));

            const post = {
                clientes: relatorio.clientes + 1,
            };

            const updates = {};
            updates[`${base64.encode(user.email)}/relatorios`] = post;
            update(ref(db), updates).then(log => console.log(log)).catch(log => window.alert(log));
        }
    }

    // Exibir funcionários depois da escolha do serviço
    else if (selectedTime && selectedDate && !employees.includes(userMessage) && userMessage.includes(" - R$")) {
        const availableEmployees = employees.filter(
            (emp) =>
                Array.isArray(bookedAppointments) &&
                !bookedAppointments.some(
                    (appt) => appt.time === selectedTime && appt.date === selectedDate && appt.employee === emp
                )
        );

        if (availableEmployees.length > 0) {
            const employeesList = availableEmployees
                .map((emp, index) => `${index + 1}. ${emp}`)
                .join("\n");

            const body = {
                message: `Funcionários disponíveis para ${selectedTime} no dia ${selectedDate}:\n${employeesList}`,
                phone: `+${messageDataUser.phone}`,
                delayMessage: 2,
            };

            sendMessageAll(body);
        }
    }

}, [userMessage]);

    console.log('agendamentos::::::::', bookedAppointments)


    /*          const isEmployeeAvailable = Array.isArray(bookedAppointments) && !bookedAppointments.some(
            (appt) => appt.time === selectedTime && appt.employee === userMessage
          ); 
          
         

          ---
          ---
          ---

       
          */


    React.useEffect(() => {
        if (bookedAppointments) {
            const next = getNextBookedTime(bookedAppointments);
            setNextBooked(next);
        }
    }, [bookedAppointments]);

    const getNextBookedTime = (bookedAppointments = []) => {
        if (!Array.isArray(bookedAppointments) || bookedAppointments.length === 0) {
            return null;
        }

        const sortedAppointments = [...bookedAppointments].sort((a, b) => {
            return a.time.localeCompare(b.time);
        });

        return sortedAppointments[0]; // Retorna o objeto inteiro { time, employee }
    };


    React.useEffect(() => {
        const dataa = getDatabase()
        const db = ref(dataa, `${base64.encode(user.email)}/relatorios/recompra`); // Referência para a coleção 'clientes'
        const dbRef = ref(getDatabase());


        onValue(db, (snapshot) => {
            if (snapshot.exists()) {
                setValorRecompra(snapshot.val())
            } else {
                console.log("No data available");
            }

        });


        get(child(dbRef, `${base64.encode(user.email)}/relatorios`)).then((snapshot) => {
            if (snapshot.exists()) {
                setRelatorio(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, [user])


    const handleChangeMenu = (event) => {

        if (event == 'Cadastrar Lanche') {
            navigate('/registerClient')
        } else if (event == 'Ver Todos') {
            handleOpenList()
        }


    };


    async function sendAll() {
        try {

            filteredData.map(item => {
                const body = {
                    message: messageAll,
                    phone: `55${item.contato}`,
                    delayMessage: 2
                }

                sendMessageAll(body)

            })
        } catch (error) {
            window.alert('Erro interno ao enviar')
        }


    }

    const fetchBookedAppointments = async () => {
        const dbRef = ref(database, `${base64.encode(user.email)}/agendamentos`); // Referência para a coleção 'clientes'

        // Escuta mudanças em tempo real
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataList = Object.keys(data).map((key) => ({
                    id: key,

                    fotoUrl: data[key].fotoUrl
                }));

                setDataClientes(dataList);

            }
        })
    }


    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase(); // Converte o valor do filtro para minúsculas
        setFilterValue(value); // Atualiza o valor do filtro

        const filtered = bookedAppointments.filter((item) =>
            item.nome.toLowerCase().includes(value) ||
            item.employee.toLowerCase().includes(value) ||
            item.time.toLowerCase().includes(value) ||
            item.doses.toLowerCase().includes(value) ||
            item.remedio.toLowerCase().includes(value)
        );

        setFilteredData(filtered); // Atualiza os dados filtrados
    };

    const RenderConnected = () => {
        if (connectednumber) {
            return (
                <GreenBox>Conectado</GreenBox>
            )
        } else {
            return (
                <RedBox>Desconectado</RedBox>
            )
        }
    }

    const RenderPayment = () => {
        if (paymentState.assinatura) {
            return (
                <GreenBox>Assinatura Ativa</GreenBox>
            )
        } else {
            return (
                <RedBox>Assinatura Inativa</RedBox>
            )
        }
    }

    console.log('Agendamentos::::', nextBooked)


    if (!user) {
        navigate('/loading')
    }

    return (
        <>
            <Header />

            <Body>


                <Container2>
                    <div style={{ display: 'flex', gap: 20 }} >
                        <RenderConnected />

                    </div>


                    <ContainerRules>

                        <ContainerT>
                            {data.map((item, index) => (
                                <Card key={index}>
                                    <TitleT>{item.title}</TitleT>
                                    <Value>{item.value}</Value>
                                    <Percentage>{item.percentage}</Percentage>

                                </Card>


                            ))}

                            <CardT>
                                <Icon>
                                    <img style={{ width: 30, height: 30 }} alt='icon' src='time-left.png' />
                                </Icon>
                                <Info>
                                    <Title>Próximo Horário</Title>
                                    <Time>{nextBooked?.time}</Time>
                                    {<Details>{nextBooked?.nome} - {nextBooked?.phone}</Details>}
                                </Info>
                            </CardT>

                        </ContainerT>

                    </ContainerRules>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }} >

                        <Typography style={{ fontWeight: 'bold', color: 'black', fontSize: '22px', alignSelf: 'flex-start' }} >Agendamentos</Typography>
                        <InputText placeholder='Pesquisar...' value={filterValue} onChange={e => handleFilterChange(e)} />
                        <Paper sx={{ height: 400, width: '100%', alignSelf: 'flex-start' }}>
                            <DataGrid

                                rows={bookedAppointments}
                                columns={columns}
                                initialState={{ pagination: { paginationModel } }}
                                pageSizeOptions={[10]}
                                checkboxSelection
                                sx={{ border: 0 }}
                                onRowSelectionModelChange={handleRowSelection}
                                disableRowSelectionOnClick={false}
                                getRowId={bookedAppointments.id}
                                {...bookedAppointments}
                            />
                        </Paper>
                        {
                            datarow ? (<Button style={{ alignSelf: 'flex-end', marginTop: 10 }} variant='contained' onClick={() => setSelectionItem()}>Enviar Mensagem</Button>

                            ) : <Button style={{ alignSelf: 'flex-end', marginTop: 10 }} variant='outlined' onClick={() => null}>Enviar Mensagem</Button>
                        }

                        <Typography style={{ fontWeight: 'bold', color: 'white', fontSize: '22px' }} >Atendidos: </Typography>

                        <Paper sx={{ height: 300, width: '100%', alignSelf: 'center' }}>

                            <DataGrid

                                rows={clientesRecompra}
                                columns={columns}
                                initialState={{ pagination: { paginationModel } }}
                                pageSizeOptions={[10]}
                                checkboxSelection
                                sx={{ border: '6px dotted green' }}
                                onRowSelectionModelChange={handleRowRecompra}
                                {...clientesRecompra}
                            />
                        </Paper>

                        {
                            dataRowRecompra ? (<Button style={{ alignSelf: 'flex-end', marginTop: 10 }} variant='contained' onClick={() => rowSelectedRecompra()}>Recoomprado</Button>

                            ) : <Button style={{ alignSelf: 'flex-end', marginTop: 10 }} variant='outlined' onClick={() => rowSelectedRecompra()}>Recomprado</Button>
                        }

                    </div>

                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}

                    >
                        {actions.map((action) => (

                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => handleChangeMenu(action.name)}
                            />
                        ))}
                    </SpeedDial>
                </Container2>




            </Body>





            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 7 }} >
                        <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: 'bold', fontSize: 16 }} >
                            Enviar para:
                        </Typography>
                        {
                            filteredData.map((response) => (

                                <Typography id="modal-modal-title" style={{ fontWeight: '500', fontSize: 18, color: "" }} >
                                    {response.nome},
                                </Typography>

                            ))


                        }
                    </div>
                    <TextField id="outlined-basic-cpf" style={{ marginTop: 15 }} value={messageAll} label="Enviar para todos" onChange={text => setMessageAll(text.target.value)} placeholder='Mensagem' fullWidth variant="outlined" />

                    <Button style={{ marginTop: 10 }} variant='contained' fullWidth onClick={() => sendAll()}>Enviar</Button>


                </Box>
            </Modal>



        </>
    );
}

export default Measurement


/* 



   {
                            dataClientes.length > 0 ? (dataClientes.map((item) => {
                                if (item.nome) {
                                    return 
                                } else {
                                    return null
                                }
                            })) : (
                                <Typography style={{ fontWeight: '600', color: '#999592', fontSize: '14px', alignSelf: 'flex-start' }} > Nenhum usuário cadastrado </Typography>

                            )
                        }





                            <Container1>
                        <ContainerRules1>   <Typography style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: '#da4103', fontSize: '22px' }} >Estabelecimento: Drogasil</Typography>

                        </ContainerRules1>



                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%', gap: '40%' }} >
                            <Typography style={{ alignSelf: 'flex-start', fontWeight: 'bold', color: 'white', fontSize: '22px' }} >Cadastros:</Typography>
                            <Button style={{ alignSelf: 'flex-end' }} onClick={handleOpenRegister} variant="outlined">Cadastrar</Button>
                        </div>





                     

                    </Container1>







                    Automação horário remedeio


                    React.useEffect(() => {
        if (user) {
            const dbRef = ref(database, `${base64.encode(user.email)}/clientes`); // Referência para a coleção 'clientes'

            // Escuta mudanças em tempo real
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const dataList = Object.keys(data).map((key) => ({
                        id: key,
                        nome: data[key].nome,
                        acabaEm: data[key].acabaEm,
                        cpf: data[key].cpf,
                        contato: data[key].contato,
                        doses: data[key].doses,
                        remedio: data[key].remedio,
                        receita: data[key].receita,
                        usoContinuo: data[key].usoContinuo,
                        mensagens: data[key].mensagens,
                        horario: data[key].horario,
                        dataCadastro: data[key].dataCadastro,
                        emailDono: user.email,
                        valorMedicamento: data[key].valorMedicamento,
                        msgUsoContinuo: data[key].msgUsoContinuo,
                        msgReceita: data[key].msgReceita,
                        digit: data[key].digit,
                        fotoUrl: data[key].fotoUrl
                    }));

                    setDataClientes(dataList);




                    // Carregar mensagens
                    const dbRefMensagens = ref(getDatabase());
                    get(child(dbRefMensagens, `${base64.encode(user.email)}/mensagens`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                setUserData(snapshot.val());
                            } else {
                                console.log("No data available");
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    setFilteredData([]);
                    setDataClientes([]);
                    setClientesRecompra([]); // Define lista vazia se não houver dados
                }
            });
        } else {
            setFilteredData([]);
            setDataClientes([]);
            setClientesRecompra([]); // Define lista vazia se o usuário não estiver logado
        }
    }, [user]);



    React.useEffect(() => {
        if (dataClientes) {
            const hoje = new Date(); // Data atual

            const clientesRecompra = dataClientes.filter((item) => {
                // Divide o formato "DD/MM/YYYY" em partes
                const [dia, mes, ano] = item.acabaEm.split("/").map(Number);

                // Cria um objeto Date no formato correto (mês é 0-indexado)
                const dataAcabaEm = new Date(ano, mes - 1, dia);

                // Calcula três dias antes de dataAcabaEm
                const tresDiasAntes = new Date(dataAcabaEm);
                tresDiasAntes.setDate(tresDiasAntes.getDate() - 3);

                // Verifica se hoje está dentro do intervalo de 3 dias ou menos
                return hoje >= tresDiasAntes && hoje <= dataAcabaEm;
            });

            setClientesRecompra(clientesRecompra); // Atualiza o array com os clientes filtrados

            const soma = clientesRecompra.reduce(
                (acumulador, objeto) => Number(acumulador) + Number(objeto.valorMedicamento),
                0
            );

            // Chama o método setValorNegativoRecompra com o valor negativo
            setValorNegativoRecompra(soma);
        }
    }, [dataClientes]); // Inclua dataClientes


    React.useEffect(() => {
        if (dataClientes) {
            const hoje = new Date(); // Data atual

            const clientesRecompra = dataClientes.filter((item) => {
                // Divide o formato "DD/MM/YYYY" em partes
                const [dia, mes, ano] = item.acabaEm.split("/").map(Number);

                // Cria um objeto Date no formato correto (mês é 0-indexado)
                const dataAcabaEm = new Date(ano, mes - 1, dia);

                // Calcula três dias antes de dataAcabaEm
                const tresDiasAntes = new Date(dataAcabaEm);
                tresDiasAntes.setDate(tresDiasAntes.getDate() - 3);

                // Retorna os itens que NÃO têm diferença de 3 dias
                return hoje.toDateString() !== tresDiasAntes.toDateString();
            });

            setFilteredData(clientesRecompra); // Atualiza o array com os clientes filtrados
        }
    }, [dataClientes]); // Inclua dataClientes na lista de dependências


    React.useEffect(() => {
        const dbRef = ref(database, `/`); // Referência para a coleção 'clientes'



        const intervalo = setInterval(() => {
            const unsubscribe = onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                console.log('ITEM1::::::::', data)
                if (data) {
                    const dataList = Object.keys(data).map((key) => ({
                        id: key,
                        clientes: data[key].clientes,
                        mensagens: data[key].mensagens,
                        assinar: data[key].assinar,
                        isconnected: data[key].isconnected,
                        relatorios: data[key].relatorios
                    }));
                    setClientforTime(dataList);




                } else {
                    return null // Define uma lista vazia caso não haja dados
                }
                console.log(clientForTime)

            });
            return unsubscribe;
        }, 60000);
        return () => clearInterval(intervalo);




    }, [])

    React.useEffect(() => {
        const agora = new Date();
        if (clientForTime) {
            clientForTime.forEach((client) => {
                if (client.clientes) {
                    Object.values(client.clientes).forEach((cliente) => {
                        const acabaEmStr = cliente.acabaEm; // Ex: "16/10/2024"
                        const [dia, mes, ano] = acabaEmStr.split("/").map(Number); // Quebra o formato DD/MM/YYYY
                        const dataAcabaEm = new Date(ano, mes - 1, dia); // Cria objeto Date para `acabaEm`

                        // Calcula o momento exato para envio (36 horas antes)
                        const momentoEnvio = new Date(dataAcabaEm);
                        momentoEnvio.setHours(momentoEnvio.getHours() - 58);

                        // Verifica se o horário atual corresponde ao momento de envio
                        const horas = String(agora.getHours()).padStart(2, "0");
                        const minutos = String(agora.getMinutes()).padStart(2, "0");
                        const dataAtualStr = `${agora.getFullYear()}-${String(
                            agora.getMonth() + 1
                        ).padStart(2, "0")}-${String(agora.getDate()).padStart(2, "0")} ${horas}:${minutos}`;

                        const momentoEnvioStr = `${momentoEnvio.getFullYear()}-${String(
                            momentoEnvio.getMonth() + 1
                        ).padStart(2, "0")}-${String(momentoEnvio.getDate()).padStart(2, "0")} ${String(
                            momentoEnvio.getHours()
                        ).padStart(2, "0")}:${String(momentoEnvio.getMinutes()).padStart(2, "0")}`;

                        console.log('momentoenvio::::', momentoEnvioStr, 'dataatualizar:::', dataAtualStr)

                        if (dataAtualStr === momentoEnvioStr) {
                            const body = {
                                message: `,${cliente.msgUsoContinuo} - Medicação: ${cliente.remedio}`,
                                phone: `55${cliente.contato}`,
                                delayMessage: 10,
                            };

                            console.log("Enviando mensagem para:", cliente.contato);
                            sendMessageAll(body); // Função já implementada para envio de mensagem
                        }
                    });
                }
            });
        }
    }, [clientForTime])




    React.useEffect(() => {
        const processClients = async () => {
            if (clientForTime) {
                for (const client of clientForTime) {
                    if (client.clientes) {
                        for (const cliente of Object.values(client.clientes)) {
                            for (const clienteT of Object.values(cliente.horario)) {
                                const agora = new Date();
                                const horas = String(agora.getHours()).padStart(2, "0");
                                const minutos = String(agora.getMinutes()).padStart(2, "0");

                                // Converter cliente.acabaEm para objeto Date
                                const [dia, mes, ano] = cliente.acabaEm.split('/');
                                const dataFinal = new Date(`${ano}-${mes}-${dia}`);

                                if (clienteT.hora === `${horas}:${minutos}` && agora <= dataFinal) {
                                    if (user.email === 'pedroyago132@gmail.com') {

                                        if (client.mensagens.msgHorario != 'undefined' && client.mensagens.msgHorario) {
                                            const body = {
                                                message: `${client.mensagens.msgHorario} - ${cliente.remedio}, agora às ${horas}:${minutos}`,
                                                phone: `55${cliente.contato}`,
                                                delayMessage: 10,

                                            }
                                            await sendMessageAll(body);
                                        }




                                        if (cliente.fotoUrl) {
                                            const bodyImage = {
                                                phone: `55${cliente.contato}`,
                                                image: `${cliente.fotoUrl}`,
                                                caption: "Remédio",
                                            };
                                            await sendImage(bodyImage);
                                        }

                                        if (cliente) {
                                            az(cliente);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }


        };

        // Executa a função a cada 60 segundos
        const interval = setInterval(() => {
            processClients();
        }, 40000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [clientForTime]);


    async function az(cliente) {
        const db = getDatabase();
        const postNome = {
            nome: cliente.nome,
            cpf: cliente.cpf,
            contato: cliente.contato,
            acabaEm: cliente.acabaEm,
            doses: cliente.doses - 1,
            remedio: cliente.remedio,
            horario: cliente.horario,
            dataCadastro: cliente.dataCadastro,
            receita: true,
            usoContinuo: cliente.usoContinuo,
            msgUsoContinuo: cliente.msgUsoContinuo,
            msgReceita: cliente.msgReceita,
            digit: cliente.digit,
            fotoUrl: cliente.fotoUrl,
            emailDono: cliente.emailDono,
            valorMedicamento: cliente.valorMedicamento
        };

        const updates = {};
        updates[`${base64.encode(cliente.emailDono)}/clientes/${base64.encode(cliente.cpf + cliente.digit + cliente.remedio)}`] = postNome;

        try {
            await update(ref(db), updates);
            console.log('Dose alterada');
        } catch (log) {
            console.log('ERROREDITUSER:::::', log);
        }
    }

    async function dataInstanceValue() {
        const idi = '3D826867ABEC00CA23EBB2D4EBC7E202';
        const tokeni = '9A63F56F86E49E2446ED34DD';

        try {
            const response = await dataInstance(idi, tokeni); // Aguarda a função retornar o resultado
            console.log('DATAAQUI:::::::', response)
            if (response.connected) {
                setConnectedNumber(true)
            } else {
                setConnectedNumber(false)
            }
        } catch (error) {
            console.error('TRYCAYCHERROR:::::QRCODE:::', error); // Lida com erros
        }
    }

    React.useEffect(() => {
        dataInstanceValue();

    }, [])






   
    
*/




/*

 React.useEffect(() => {
const today = new Date();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const date = today.getDate();
const hours = today.getHours();
const minutes = today.getMinutes().toString().padStart(2, '0'); // Pads single digit minutes with a zero
setDate(`${date}/${month}/${year} ${hours}:${minutes}`);
}, []);


React.useEffect(() => {
const db = getDatabase()
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user)


        const dbRef = ref(db, `${base64.encode(user.email)}/assinar`);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setPaymentState(data)
                if (data.id) {
                    const fetchPaymentLinks = async () => {
                        try {
                            const response = await fetch(`https://backend-nine-gamma-70.vercel.app/payment-link-status/${data.id}`); // URL do backend

                            if (!response.ok) {
                                throw new Error('Erro ao buscar os links de pagamento');
                            }

                            const dataT = await response.json();
                            console.log(dataT)
                            setPaymentLinks(dataT)
                            if (dataT.orders_paid > 0) {
                                const databasePath = `${base64.encode(user.email)}/assinar`;
                                await set(ref(db, databasePath), {
                                    id: dataT.id,
                                    assinatura: true
                                }).then(log => {
                                    console.log('Assinatura paga')
                                }).catch(error => console.log(error))
                            }

                        } catch (err) {
                            console.log(err)
                            setPaymentLinks([]); // Limpa os dados anteriores em caso de erro
                        }
                    };
                    fetchPaymentLinks()
                }
            }

        })
        // ...
    } else {
        // User is signed out
        // ...
    }
});
}, []) */