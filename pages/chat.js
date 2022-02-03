import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React from 'react'
import appConfig from '../config.json'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_AON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU4NDUwNiwiZXhwIjoxOTU5MTYwNTA2fQ.6RgksygO5d46WZnSKuhsuq4_88QzwbxVzKtwz-Bu0F4'
const SUPABASE_URL = 'https://kafvawuprsnkxuibikxm.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_AON_KEY)

export default function ChatPage() {
  // HOOK para usar atualização de tela do Next
  const route = useRouter()
  const usuarioLogado = route.query.username
  console.log(usuarioLogado)
  const [mensagem, setMensagem] = React.useState('')
  const [listaDeMensagens, setListaDeMensagens] = React.useState([
    /*     {
      id: 1,
      de: 'omariosouto',
      texto:
        ':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_2.png',
    }, */
  ])
  //ação do usuario
  /* 
   //Usuario
   - usuario digital a mensagem
   - aperta enter pra enviar
   - a mensagem tem que aparecer na listagem

   //dev
   [x] campo de escrever mensagem criado
   [x] usar onChange e useState monitorar a ultima tecla pressionada, se for ENTER
   [x] apagar mensagem se ultima tecla for ENTER
   [x] adicionar a menssagem digitada na lista de mensagens
   [x] conectar com banco de dados Supabase
   [ ] salvar mensagens no banco de dados
   [ ] lêr mensagens do banco de dados


   */

  // Sua lógica vai aqui

  React.useEffect(() => {
    const dadosDoSupabase = supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        console.log('Dados da Consulta:', data)
        setListaDeMensagens(data)
      })
    console.log(dadosDoSupabase)
  }, [])

  function handleNovaMensagem(novaMensagem) {
    const mensagens = {
      //id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem,
    }
    supabaseClient
      .from('mensagens')
      .insert([mensagens])
      .then(({ data }) => {
        //console.log('Criando Mensagem: ', data)
        setListaDeMensagens([data[0], ...listaDeMensagens])
      })

    setMensagem('')
  }
  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList mensagens={listaDeMensagens} />

          {/* Lista de Mensagens:
          {listaDeMensagens.map((mensagemAtual) => {
            return (
              <li key={mensagemAtual.id}>
                {mensagemAtual.de}: {mensagemAtual.texto}
              </li>
            )
          })} */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                //  console.log(event)
                const valor = event.target.value
                setMensagem(valor)
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleNovaMensagem(mensagem)
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />

            {/* Inicialmente o código não tinha função callback.
            Foi criado uma para retornar o nome do sticker quando clicado em algum. */}
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                console.log('[USANDO O COMPONENTE] Salva este sticker', sticker)
                handleNovaMensagem(':sticker: ' + sticker)
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  console.log('MessageList', props)
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
        width: '100%',
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                flex: 1,
              }}
            >
              <Image
                styleSheet={{
                  flex: 1,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text
                styleSheet={{
                  flex: 1,
                }}
                tag="strong"
              >
                {mensagem.de}
              </Text>

              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {/* testa pra saber se a mensagem começa com :sticker: */}
            {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
            {/* Modo Condicional declarativo */}
            {mensagem.texto.startsWith(':sticker:') ? (
              <Image src={mensagem.texto.replace(':sticker:', '')} />
            ) : (
              mensagem.texto
            )}
          </Text>
        )
      })}
    </Box>
  )
}
