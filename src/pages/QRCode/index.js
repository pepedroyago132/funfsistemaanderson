import * as React from 'react';
import { PageContainer, SubTitle, FormContainer, Title } from './styles';
import { useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";
import Button from '@mui/material/Button';
import "firebase/database";
import { dataInstance, lerQRCode, listingInstances } from '../../services';
import Header from '../../components/Header';

const QRCodePage = () => {
    const navigate = useNavigate()
    const [connected, setConnected] = React.useState('');
    const [qrCode, setQRCode] = React.useState(false);

    const RenderQR = () => {
        if (!qrCode) {
            return (
                <SubTitle>Necessário para envio automático de mensagens, Você terá 20 segundos para ler seu QRCode</SubTitle>
            )
        } else {
            return (
                <QRCode
                    size={256}
                    style={{ height: '85%', maxWidth: "100%", width: "80%", padding: 17 }}
                    value={qrCode.value}
                    viewBox={`0 0 256 256`}
                />
            )
        }
    }

    async function GerarQRCode() {
        if(connected){
            return window.alert('Conectado')
        }else{
            const idi = '3DFCF5280763B0FF47C28E66062CE0C1';
            const tokeni = 'FD15E27CF8D3D8AEFD9EE8E8';
    
            try {
                const response = await lerQRCode(idi, tokeni); // Aguarda a função retornar o resultado
                setQRCode(response); // Atualiza o estado ou faz o que for necessário com o QR Code
                console.log('RSPONEVALUE::::::', response); // Imprime o resultado
            } catch (error) {
                console.error('TRYCAYCHERROR:::::QRCODE:::', error); // Lida com erros
            }
        }
     
    }

    async function listingInstacesValue() {
        const idi = '3DFCF5280763B0FF47C28E66062CE0C1';
        const tokeni = 'FD15E27CF8D3D8AEFD9EE8E8';

        try {
            const response = await listingInstances(); // Aguarda a função retornar o resultado
            console.log('RSPONSEINSATNCEESS::::::', response); // Imprime o resultado
        } catch (error) {
            console.error('TRYCAYCHERROR:::::QRCODE:::', error); // Lida com erros
        }
    }

    async function dataInstanceValue() {
        const idi = '3DFCF5280763B0FF47C28E66062CE0C1';
        const tokeni = 'FD15E27CF8D3D8AEFD9EE8E8';

        try {
            const response = await dataInstance(idi,tokeni); // Aguarda a função retornar o resultado
            if(response.connected){
                window.alert('Celular Conectado!')
                setConnected(true)
                navigate('/measure')
            }else{
                return null
            }
        } catch (error) {
            console.error('TRYCAYCHERROR:::::QRCODE:::', error); // Lida com erros
        }
    }

    React.useEffect(() => {
        dataInstanceValue();
        const interval = setInterval(() => {
            console.log("Função executada!");
            dataInstanceValue();
          }, 3000); // Executa a cada 3 segundos
      
          // Limpa o intervalo quando o componente for desmontado
          return () => clearInterval(interval);
       
    },[])

    return (
        <>
        <Header />
        <PageContainer>
            <FormContainer>

                <Title>Gere seu QRCode WhatsApp</Title>
                <Title>Para se conectar a automação</Title>
                <Title>Você terá 20 segundos para ler seu QRCode</Title>
                
                <RenderQR />
                <Button id='Button-id' fullWidth variant='outlined' onClick={() => GerarQRCode()}>Gerar QRCode ( gerar de novo )</Button>

            </FormContainer>
        </PageContainer>
        </>
    );
}

export default QRCodePage;

