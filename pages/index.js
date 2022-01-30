import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react'
import { useRouter } from 'next/router'
import appConfig from '../config.json'

function Title(props) {
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

//React component
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  //maneira tradicional para declarar variavel, mas não funciona com o React
  //const username = 'wtaiatella'
  //no React tem que usar o useState para que o React possa atualizar o valor da variavel
  //caso contrario o navegador não consegue fazer isso sozinho e fica gerando erro no console

  // Maneira correta utlizando useState
  const [username, setUsername] = React.useState('wtaiatella')

  // HOOK para usar atualização de tela do Next
  const route = useRouter()

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '40px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault()

              // maneira tradicional para carregamento de página
              // window.location.href = '/chat'

              /* maneira com que o React Next carrega a página e fica mais suave a transição
              HOOK do react
              precisa ter:
              import { useRouter } from 'next/router' no topo do arquivo e,

              const route = useRouter(); no inicio da função */
              route.push('/chat')
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <Title tag="h1">Boas vindas de volta!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            {/* <input
              type="text"
              value={username}
              //quando usuario digitar novo valor no campo input em tela, chama a função
              onChange={function (event) {
                // Onde está o novo valor?
                const valor = event.target.value
                // Atualizar o valor da variavel
                setUsername(valor)
              }}
            /> */}

            {
              <TextField
                fullWidth
                value={username}
                //quando usuario digitar novo valor no campo input em tela, chama a função
                onChange={function (event) {
                  // Onde está o novo valor?
                  const valor = event.target.value
                  // Atualizar o valor da variavel some3nte se for maior que 2 caracteres
                  console.log(valor)
                  if (valor.lenght > 2) {
                    console.log('e maior')
                  }
                  setUsername(valor)
                }}
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
            }

            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '250px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '2px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '20px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '50px',
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  )
}
